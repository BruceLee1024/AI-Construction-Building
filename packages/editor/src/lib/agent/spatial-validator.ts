import { useScene } from '@pascal-app/core'
import type { AnyNode, AnyNodeId, WallNode, SlabNode, DoorNode, WindowNode, ItemNode } from '@pascal-app/core'
import { pointInPolygon } from '@pascal-app/core'

// ============================================================================
// TYPES
// ============================================================================

interface ValidationIssue {
  type: 'snap' | 'bounds' | 'overlap' | 'gap' | 'info'
  severity: 'fixed' | 'warning' | 'info'
  nodeId: string
  message: string
}

interface ValidationResult {
  issues: ValidationIssue[]
  fixedCount: number
  warningCount: number
}

// ============================================================================
// CONSTANTS
// ============================================================================

const SNAP_THRESHOLD = 0.05 // 5cm — snap wall endpoints closer than this
const FURNITURE_MARGIN = 0.1 // 10cm — minimum distance from wall for furniture
const DOOR_MARGIN = 0.05 // 5cm — minimum margin from wall edge for doors/windows

// ============================================================================
// HELPERS
// ============================================================================

function dist2D(a: [number, number], b: [number, number]): number {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)
}

function wallLength(w: WallNode): number {
  return dist2D(w.start, w.end)
}

function polygonCentroid(poly: [number, number][]): [number, number] {
  let cx = 0
  let cz = 0
  for (const [x, z] of poly) {
    cx += x
    cz += z
  }
  return [cx / poly.length, cz / poly.length]
}

function closestPointOnPolygonEdge(
  px: number,
  pz: number,
  polygon: [number, number][],
): [number, number] {
  let bestDist = Infinity
  let bestPoint: [number, number] = [px, pz]

  const n = polygon.length
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n
    const [ax, az] = polygon[i]!
    const [bx, bz] = polygon[j]!

    const dx = bx - ax
    const dz = bz - az
    const lenSq = dx * dx + dz * dz
    if (lenSq < 1e-10) continue

    let t = ((px - ax) * dx + (pz - az) * dz) / lenSq
    t = Math.max(0, Math.min(1, t))

    const cx = ax + t * dx
    const cz = az + t * dz
    const d = Math.sqrt((px - cx) ** 2 + (pz - cz) ** 2)

    if (d < bestDist) {
      bestDist = d
      bestPoint = [cx, cz]
    }
  }

  return bestPoint
}

// ============================================================================
// VALIDATORS
// ============================================================================

function snapWallEndpoints(
  walls: WallNode[],
  issues: ValidationIssue[],
): void {
  const { updateNode } = useScene.getState()

  // Collect all endpoints
  type EP = { wallId: string; which: 'start' | 'end'; point: [number, number] }
  const endpoints: EP[] = []
  for (const w of walls) {
    endpoints.push({ wallId: w.id, which: 'start', point: [...w.start] })
    endpoints.push({ wallId: w.id, which: 'end', point: [...w.end] })
  }

  // Find pairs that are close but not identical
  const snapped = new Set<string>()
  for (let i = 0; i < endpoints.length; i++) {
    for (let j = i + 1; j < endpoints.length; j++) {
      const a = endpoints[i]!
      const b = endpoints[j]!
      if (a.wallId === b.wallId) continue

      const d = dist2D(a.point, b.point)
      if (d > 0.001 && d < SNAP_THRESHOLD) {
        // Snap b to a (a keeps position)
        const key = `${b.wallId}-${b.which}`
        if (snapped.has(key)) continue
        snapped.add(key)

        updateNode(b.wallId as AnyNodeId, {
          [b.which]: [...a.point],
        } as Partial<AnyNode>)

        issues.push({
          type: 'snap',
          severity: 'fixed',
          nodeId: b.wallId,
          message: `Wall ${b.which} snapped to nearby endpoint (gap: ${(d * 100).toFixed(1)}cm)`,
        })
      }
    }
  }
}

function validateFurnitureBounds(
  items: ItemNode[],
  slabs: SlabNode[],
  issues: ValidationIssue[],
): void {
  if (slabs.length === 0) return
  const { updateNode } = useScene.getState()

  // Use the largest slab as the room boundary
  const mainSlab = slabs.reduce((best, s) =>
    s.polygon.length > best.polygon.length ? s : best,
  )
  const polygon = mainSlab.polygon

  for (const item of items) {
    // Only check floor items (not wall/ceiling attached)
    if (item.asset.attachTo === 'wall' || item.asset.attachTo === 'wall-side' || item.asset.attachTo === 'ceiling') {
      continue
    }

    const [x, _y, z] = item.position
    if (!pointInPolygon(x, z, polygon)) {
      // Nudge toward polygon centroid
      const centroid = polygonCentroid(polygon)
      const edgePoint = closestPointOnPolygonEdge(x, z, polygon)

      // Move to edge point + margin toward centroid
      const toCenter = [centroid[0] - edgePoint[0], centroid[1] - edgePoint[1]] as const
      const toCenterLen = Math.sqrt(toCenter[0] ** 2 + toCenter[1] ** 2)
      const nudge = toCenterLen > 0.01
        ? [edgePoint[0] + (toCenter[0] / toCenterLen) * FURNITURE_MARGIN,
           edgePoint[1] + (toCenter[1] / toCenterLen) * FURNITURE_MARGIN]
        : [edgePoint[0], edgePoint[1]]

      updateNode(item.id as AnyNodeId, {
        position: [nudge[0], item.position[1], nudge[1]],
      } as Partial<AnyNode>)

      issues.push({
        type: 'bounds',
        severity: 'fixed',
        nodeId: item.id,
        message: `Item "${item.asset.name}" was outside room, nudged inside`,
      })
    }
  }
}

function validateDoorWindowFit(
  walls: WallNode[],
  nodes: Record<AnyNodeId, AnyNode>,
  issues: ValidationIssue[],
): void {
  const { updateNode } = useScene.getState()

  for (const wall of walls) {
    const wLen = wallLength(wall)
    if (wLen < 0.1) continue

    for (const childId of wall.children) {
      const child = nodes[childId as AnyNodeId]
      if (!child) continue

      if (child.type === 'door') {
        const door = child as DoorNode
        const doorWidth = door.width ?? 0.9
        const halfDoor = doorWidth / 2

        // Check position[0] (wall-local X) is within bounds
        const localX = door.position[0]
        const minX = halfDoor + DOOR_MARGIN
        const maxX = wLen - halfDoor - DOOR_MARGIN

        if (minX > maxX) {
          issues.push({
            type: 'bounds',
            severity: 'warning',
            nodeId: door.id,
            message: `Door too wide for wall (door: ${doorWidth.toFixed(2)}m, wall: ${wLen.toFixed(2)}m)`,
          })
          continue
        }

        if (localX < minX || localX > maxX) {
          const clampedX = Math.max(minX, Math.min(maxX, localX))
          updateNode(door.id as AnyNodeId, {
            position: [clampedX, door.position[1], door.position[2]],
          } as Partial<AnyNode>)
          issues.push({
            type: 'bounds',
            severity: 'fixed',
            nodeId: door.id,
            message: `Door position clamped to fit within wall (${localX.toFixed(2)} → ${clampedX.toFixed(2)})`,
          })
        }
      } else if (child.type === 'window') {
        const win = child as WindowNode
        const winWidth = win.width ?? 1.5
        const halfWin = winWidth / 2

        const localX = win.position[0]
        const minX = halfWin + DOOR_MARGIN
        const maxX = wLen - halfWin - DOOR_MARGIN

        if (minX > maxX) {
          issues.push({
            type: 'bounds',
            severity: 'warning',
            nodeId: win.id,
            message: `Window too wide for wall (window: ${winWidth.toFixed(2)}m, wall: ${wLen.toFixed(2)}m)`,
          })
          continue
        }

        if (localX < minX || localX > maxX) {
          const clampedX = Math.max(minX, Math.min(maxX, localX))
          updateNode(win.id as AnyNodeId, {
            position: [clampedX, win.position[1], win.position[2]],
          } as Partial<AnyNode>)
          issues.push({
            type: 'bounds',
            severity: 'fixed',
            nodeId: win.id,
            message: `Window position clamped to fit within wall (${localX.toFixed(2)} → ${clampedX.toFixed(2)})`,
          })
        }
      }
    }
  }
}

function detectWallGaps(
  walls: WallNode[],
  issues: ValidationIssue[],
): void {
  // Detect walls that have endpoints close to another wall's body but not connected
  for (const w of walls) {
    for (const other of walls) {
      if (w.id === other.id) continue

      // Check if w.start or w.end is close to the line segment of 'other'
      for (const which of ['start', 'end'] as const) {
        const pt = w[which]
        // Project pt onto other wall's segment
        const dx = other.end[0] - other.start[0]
        const dz = other.end[1] - other.start[1]
        const lenSq = dx * dx + dz * dz
        if (lenSq < 1e-10) continue

        const t = ((pt[0] - other.start[0]) * dx + (pt[1] - other.start[1]) * dz) / lenSq
        if (t < 0.05 || t > 0.95) continue // Only check mid-section (endpoints handled by snap)

        const projX = other.start[0] + t * dx
        const projZ = other.start[1] + t * dz
        const d = Math.sqrt((pt[0] - projX) ** 2 + (pt[1] - projZ) ** 2)

        if (d > 0.001 && d < SNAP_THRESHOLD * 2) {
          issues.push({
            type: 'gap',
            severity: 'warning',
            nodeId: w.id,
            message: `Wall ${which} is ${(d * 100).toFixed(1)}cm from wall body (possible T-junction gap)`,
          })
        }
      }
    }
  }
}

// ============================================================================
// MAIN VALIDATOR
// ============================================================================

export function validateAndCorrectScene(levelId: string): ValidationResult {
  const { nodes } = useScene.getState()
  const issues: ValidationIssue[] = []

  // Collect elements on this level
  const walls: WallNode[] = []
  const slabs: SlabNode[] = []
  const items: ItemNode[] = []

  function isOnLevel(node: AnyNode): boolean {
    if (node.parentId === levelId) return true
    if (!node.parentId) return false
    const parent = nodes[node.parentId as AnyNodeId]
    return parent ? parent.parentId === levelId : false
  }

  for (const node of Object.values(nodes)) {
    if (!isOnLevel(node)) continue

    if (node.type === 'wall') walls.push(node as WallNode)
    else if (node.type === 'slab') slabs.push(node as SlabNode)
    else if (node.type === 'item') items.push(node as ItemNode)
  }

  // Run validations
  snapWallEndpoints(walls, issues)
  validateDoorWindowFit(walls, nodes, issues)
  validateFurnitureBounds(items, slabs, issues)
  detectWallGaps(walls, issues)

  const fixedCount = issues.filter((i) => i.severity === 'fixed').length
  const warningCount = issues.filter((i) => i.severity === 'warning').length

  return { issues, fixedCount, warningCount }
}

export function formatValidationReport(result: ValidationResult): string {
  if (result.issues.length === 0) {
    return JSON.stringify({ valid: true, message: 'No spatial issues found' })
  }

  return JSON.stringify({
    valid: result.warningCount === 0,
    fixedCount: result.fixedCount,
    warningCount: result.warningCount,
    issues: result.issues.map((i) => ({
      type: i.type,
      severity: i.severity,
      nodeId: i.nodeId,
      message: i.message,
    })),
  })
}

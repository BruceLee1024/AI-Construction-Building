import { useScene } from '@pascal-app/core'
import type { AnyNode, AnyNodeId, WallNode, SlabNode, DoorNode, WindowNode, ItemNode, ZoneNode } from '@pascal-app/core'
import { pointInPolygon, getScaledDimensions } from '@pascal-app/core'

// ============================================================================
// TYPES
// ============================================================================

interface ValidationIssue {
  type: 'snap' | 'bounds' | 'overlap' | 'gap' | 'info' | 'code'
  severity: 'fixed' | 'warning' | 'info'
  ruleId: string
  nodeId: string
  message: string
}

interface ValidationResult {
  issues: ValidationIssue[]
  fixedCount: number
  warningCount: number
  blockingCount: number
  codeProfile: CodeProfileName
}

export type CodeProfileName = 'residential_default' | 'china_residential'
type RoomUse = 'bedroom' | 'living' | 'kitchen' | 'bathroom' | 'dining' | 'balcony' | 'corridor' | 'entry' | 'other'

interface CodeProfile {
  name: CodeProfileName
  snapThreshold: number
  furnitureMargin: number
  openingMargin: number
  minDoorClearWidth: number
  minCorridorWidth: number
  minRoomWidth: number
  maxRoomAspectRatio: number
  minDaylightRatio: number
  minWindowSillHeight: number
  minDoorClearance: number
  minUsableArea: number
  minBedroomArea: number
  minBedroomWidth: number
  minLivingArea: number
  minLivingWidth: number
  minKitchenArea: number
  minKitchenWidth: number
  minBathroomArea: number
  minEntryClearWidth: number
  minFurnitureClearPath: number
  minOpeningEdgeClearance: number
  minOpeningSpacing: number
  minFallProtectionSillHeight: number
  minWetroomAdjacencyDistance: number
}

// ============================================================================
// CONSTANTS
// ============================================================================

const CODE_PROFILES: Record<CodeProfileName, CodeProfile> = {
  residential_default: {
    name: 'residential_default',
    snapThreshold: 0.05,
    furnitureMargin: 0.1,
    openingMargin: 0.05,
    minDoorClearWidth: 0.8,
    minCorridorWidth: 1.1,
    minRoomWidth: 1.8,
    maxRoomAspectRatio: 3,
    minDaylightRatio: 0.08,
    minWindowSillHeight: 0.15,
    minDoorClearance: 0.5,
    minUsableArea: 2,
    minBedroomArea: 6,
    minBedroomWidth: 2.1,
    minLivingArea: 10,
    minLivingWidth: 2.7,
    minKitchenArea: 3.5,
    minKitchenWidth: 1.5,
    minBathroomArea: 2,
    minEntryClearWidth: 1,
    minFurnitureClearPath: 0.6,
    minOpeningEdgeClearance: 0.2,
    minOpeningSpacing: 0.2,
    minFallProtectionSillHeight: 0.75,
    minWetroomAdjacencyDistance: 1.2,
  },
  china_residential: {
    name: 'china_residential',
    snapThreshold: 0.05,
    furnitureMargin: 0.1,
    openingMargin: 0.05,
    minDoorClearWidth: 0.8,
    minCorridorWidth: 1.1,
    minRoomWidth: 1.8,
    maxRoomAspectRatio: 3,
    minDaylightRatio: 0.1,
    minWindowSillHeight: 0.15,
    minDoorClearance: 0.5,
    minUsableArea: 2,
    minBedroomArea: 7,
    minBedroomWidth: 2.4,
    minLivingArea: 12,
    minLivingWidth: 3,
    minKitchenArea: 4,
    minKitchenWidth: 1.5,
    minBathroomArea: 2.5,
    minEntryClearWidth: 1.1,
    minFurnitureClearPath: 0.65,
    minOpeningEdgeClearance: 0.25,
    minOpeningSpacing: 0.25,
    minFallProtectionSillHeight: 0.9,
    minWetroomAdjacencyDistance: 1.2,
  },
}

export function resolveCodeProfile(codeProfile?: string): CodeProfile {
  if (codeProfile && codeProfile in CODE_PROFILES) {
    return CODE_PROFILES[codeProfile as CodeProfileName]
  }
  return CODE_PROFILES.residential_default
}

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
  profile: CodeProfile,
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
      if (d > 0.001 && d < profile.snapThreshold) {
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
          ruleId: 'geometry.wall_endpoint_snap',
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
  profile: CodeProfile,
): void {
  if (slabs.length === 0) return
  const { updateNode } = useScene.getState()

  for (const item of items) {
    // Only check floor items (not wall/ceiling attached)
    if (item.asset.attachTo === 'wall' || item.asset.attachTo === 'wall-side' || item.asset.attachTo === 'ceiling') {
      continue
    }

    const [x, _y, z] = item.position

    // Find the slab this item belongs to (check all slabs, not just the largest)
    let insideAnySlab = false
    for (const slab of slabs) {
      if (pointInPolygon(x, z, slab.polygon)) {
        insideAnySlab = true
        break
      }
    }

    if (!insideAnySlab) {
      // Find the nearest slab to nudge the item into
      let nearestSlab = slabs[0]!
      let nearestDist = Infinity
      for (const slab of slabs) {
        const c = polygonCentroid(slab.polygon)
        const d = dist2D([x, z], c)
        if (d < nearestDist) {
          nearestDist = d
          nearestSlab = slab
        }
      }

      const polygon = nearestSlab.polygon
      const centroid = polygonCentroid(polygon)
      const edgePoint = closestPointOnPolygonEdge(x, z, polygon)

      // Move to edge point + margin toward centroid
      const toCenter = [centroid[0] - edgePoint[0], centroid[1] - edgePoint[1]] as const
      const toCenterLen = Math.sqrt(toCenter[0] ** 2 + toCenter[1] ** 2)
      const nudge = toCenterLen > 0.01
        ? [edgePoint[0] + (toCenter[0] / toCenterLen) * profile.furnitureMargin,
           edgePoint[1] + (toCenter[1] / toCenterLen) * profile.furnitureMargin]
        : [edgePoint[0], edgePoint[1]]

      updateNode(item.id as AnyNodeId, {
        position: [nudge[0], item.position[1], nudge[1]],
      } as Partial<AnyNode>)

      issues.push({
        type: 'bounds',
        severity: 'fixed',
        ruleId: 'furniture.inside_slab',
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
  profile: CodeProfile,
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
        const minX = halfDoor + profile.openingMargin
        const maxX = wLen - halfDoor - profile.openingMargin

        if (minX > maxX) {
          issues.push({
            type: 'bounds',
            severity: 'warning',
            ruleId: 'opening.fits_wall',
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
            ruleId: 'opening.fits_wall',
            nodeId: door.id,
            message: `Door position clamped to fit within wall (${localX.toFixed(2)} → ${clampedX.toFixed(2)})`,
          })
        }
      } else if (child.type === 'window') {
        const win = child as WindowNode
        const winWidth = win.width ?? 1.5
        const halfWin = winWidth / 2

        const localX = win.position[0]
        const minX = halfWin + profile.openingMargin
        const maxX = wLen - halfWin - profile.openingMargin

        if (minX > maxX) {
          issues.push({
            type: 'bounds',
            severity: 'warning',
            ruleId: 'opening.fits_wall',
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
            ruleId: 'opening.fits_wall',
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
  profile: CodeProfile,
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

        if (d > 0.001 && d < profile.snapThreshold * 2) {
          issues.push({
            type: 'gap',
            severity: 'warning',
            ruleId: 'geometry.wall_gap',
            nodeId: w.id,
            message: `Wall ${which} is ${(d * 100).toFixed(1)}cm from wall body (possible T-junction gap)`,
          })
        }
      }
    }
  }
}

function polygonArea(poly: [number, number][]): number {
  let area = 0
  const n = poly.length
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n
    area += poly[i]![0] * poly[j]![1] - poly[j]![0] * poly[i]![1]
  }
  return Math.abs(area / 2)
}

function polygonBounds(poly: [number, number][]): {
  minX: number
  minZ: number
  maxX: number
  maxZ: number
  width: number
  depth: number
} {
  const xs = poly.map((p) => p[0])
  const zs = poly.map((p) => p[1])
  const minX = Math.min(...xs)
  const minZ = Math.min(...zs)
  const maxX = Math.max(...xs)
  const maxZ = Math.max(...zs)
  return {
    minX,
    minZ,
    maxX,
    maxZ,
    width: maxX - minX,
    depth: maxZ - minZ,
  }
}

function polygonsIntersect(a: [number, number][], b: [number, number][]): boolean {
  if (a.length < 3 || b.length < 3) return false

  for (const pt of a) {
    if (pointInPolygon(pt[0], pt[1], b)) return true
  }
  for (const pt of b) {
    if (pointInPolygon(pt[0], pt[1], a)) return true
  }
  return false
}

function pointToSegmentDistance(
  point: [number, number],
  start: [number, number],
  end: [number, number],
): number {
  const dx = end[0] - start[0]
  const dz = end[1] - start[1]
  const lenSq = dx * dx + dz * dz
  if (lenSq < 1e-10) return dist2D(point, start)

  const t = Math.max(
    0,
    Math.min(1, ((point[0] - start[0]) * dx + (point[1] - start[1]) * dz) / lenSq),
  )
  return dist2D(point, [start[0] + t * dx, start[1] + t * dz])
}

function inferRoomUse(name: string | undefined, metadata: unknown): RoomUse {
  if (metadata && typeof metadata === 'object' && !Array.isArray(metadata)) {
    const roomType = (metadata as Record<string, unknown>).roomType
    if (typeof roomType === 'string') {
      const normalized = normalizeRoomUse(roomType)
      if (normalized) return normalized
    }
  }

  const normalized = normalizeRoomUse(name ?? '')
  return normalized ?? 'other'
}

function normalizeRoomUse(value: string): RoomUse | null {
  const lower = value.toLowerCase()
  if (/卧|bed|master|kids|guest/.test(lower)) return 'bedroom'
  if (/客|起居|living|lounge/.test(lower)) return 'living'
  if (/厨|kitchen/.test(lower)) return 'kitchen'
  if (/卫|浴|厕|bath|toilet|washroom/.test(lower)) return 'bathroom'
  if (/餐|dining/.test(lower)) return 'dining'
  if (/阳台|balcony/.test(lower)) return 'balcony'
  if (/走廊|过道|hall|corridor/.test(lower)) return 'corridor'
  if (/玄关|entry|foyer/.test(lower)) return 'entry'
  return null
}

function collectZonesBySlab(slabs: SlabNode[], zones: ZoneNode[]): Map<string, ZoneNode[]> {
  const result = new Map<string, ZoneNode[]>()
  for (const slab of slabs) result.set(slab.id, [])

  for (const slab of slabs) {
    if (slab.polygon.length < 3) continue
    const slabCentroid = polygonCentroid(slab.polygon)

    for (const zone of zones) {
      if (zone.polygon.length < 3) continue
      const zoneCentroid = polygonCentroid(zone.polygon)
      if (
        pointInPolygon(zoneCentroid[0], zoneCentroid[1], slab.polygon) ||
        pointInPolygon(slabCentroid[0], slabCentroid[1], zone.polygon) ||
        polygonsIntersect(slab.polygon, zone.polygon)
      ) {
        result.get(slab.id)?.push(zone)
      }
    }
  }

  return result
}

function roomUsesForSlab(slab: SlabNode, zonesBySlab: Map<string, ZoneNode[]>): Set<RoomUse> {
  const uses = new Set<RoomUse>()
  for (const zone of zonesBySlab.get(slab.id) ?? []) {
    uses.add(inferRoomUse(zone.name, zone.metadata))
  }
  return uses
}

function hasVentilationStrategy(use: RoomUse, windows: WindowNode[], items: ItemNode[]): boolean {
  if (windows.length > 0) return true
  if (use === 'kitchen') {
    return items.some((item) => item.asset.category === 'kitchen' && /hood|exhaust|vent/i.test(`${item.asset.id} ${item.asset.name}`))
  }
  if (use === 'bathroom') {
    return items.some((item) => /fan|exhaust|vent|dryer/i.test(`${item.asset.id} ${item.asset.name}`))
  }
  return false
}

function minDistanceBetweenPolygons(a: [number, number][], b: [number, number][]): number {
  if (polygonsIntersect(a, b)) return 0

  let best = Infinity
  for (let i = 0; i < a.length; i++) {
    const a0 = a[i]!
    const a1 = a[(i + 1) % a.length]!
    for (const pt of b) best = Math.min(best, pointToSegmentDistance(pt, a0, a1))
  }
  for (let i = 0; i < b.length; i++) {
    const b0 = b[i]!
    const b1 = b[(i + 1) % b.length]!
    for (const pt of a) best = Math.min(best, pointToSegmentDistance(pt, b0, b1))
  }
  return best
}

function slabTouchesExterior(slab: SlabNode, walls: WallNode[]): boolean {
  if (slab.polygon.length < 3) return false

  for (const point of slab.polygon) {
    for (const wall of walls) {
      if (pointToSegmentDistance(point, wall.start, wall.end) <= 0.2) {
        return true
      }
    }
  }

  return false
}

function wallOpeningWorldPoint(
  wall: WallNode,
  localX: number,
): [number, number] | null {
  const dx = wall.end[0] - wall.start[0]
  const dz = wall.end[1] - wall.start[1]
  const len = Math.sqrt(dx * dx + dz * dz)
  if (len < 0.001) return null

  return [
    wall.start[0] + (dx / len) * localX,
    wall.start[1] + (dz / len) * localX,
  ]
}

function openingServesSlab(
  point: [number, number],
  wall: WallNode,
  slab: SlabNode,
): boolean {
  const dx = wall.end[0] - wall.start[0]
  const dz = wall.end[1] - wall.start[1]
  const len = Math.sqrt(dx * dx + dz * dz)
  if (len < 0.001) return false

  const normX = -dz / len
  const normZ = dx / len
  const probeDistance = (wall.thickness ?? 0.15) / 2 + 0.2
  const p1: [number, number] = [
    point[0] + normX * probeDistance,
    point[1] + normZ * probeDistance,
  ]
  const p2: [number, number] = [
    point[0] - normX * probeDistance,
    point[1] - normZ * probeDistance,
  ]

  return pointInPolygon(p1[0], p1[1], slab.polygon) || pointInPolygon(p2[0], p2[1], slab.polygon)
}

function collectWindowsBySlab(
  slabs: SlabNode[],
  walls: WallNode[],
  nodes: Record<AnyNodeId, AnyNode>,
): Map<string, WindowNode[]> {
  const result = new Map<string, WindowNode[]>()
  for (const slab of slabs) result.set(slab.id, [])

  for (const wall of walls) {
    for (const childId of wall.children) {
      const child = nodes[childId as AnyNodeId]
      if (child?.type !== 'window') continue

      const win = child as WindowNode
      const point = wallOpeningWorldPoint(wall, win.position[0])
      if (!point) continue

      for (const slab of slabs) {
        if (openingServesSlab(point, wall, slab)) {
          result.get(slab.id)?.push(win)
        }
      }
    }
  }

  return result
}

function collectDoorsBySlab(
  slabs: SlabNode[],
  walls: WallNode[],
  nodes: Record<AnyNodeId, AnyNode>,
): Map<string, DoorNode[]> {
  const result = new Map<string, DoorNode[]>()
  for (const slab of slabs) result.set(slab.id, [])

  for (const wall of walls) {
    for (const childId of wall.children) {
      const child = nodes[childId as AnyNodeId]
      if (child?.type !== 'door') continue

      const door = child as DoorNode
      const point = wallOpeningWorldPoint(wall, door.position[0])
      if (!point) continue

      for (const slab of slabs) {
        if (openingServesSlab(point, wall, slab)) {
          result.get(slab.id)?.push(door)
        }
      }
    }
  }

  return result
}

function detectDoorWindowOverlap(
  walls: WallNode[],
  nodes: Record<AnyNodeId, AnyNode>,
  issues: ValidationIssue[],
): void {
  for (const wall of walls) {
    const openings: { id: string; minX: number; maxX: number }[] = []
    
    for (const childId of wall.children) {
      const child = nodes[childId as AnyNodeId]
      if (!child) continue
      
      let width = 0
      let localX = 0
      if (child.type === 'door') {
        width = (child as DoorNode).width ?? 0.9
        localX = (child as DoorNode).position[0]
      } else if (child.type === 'window') {
        width = (child as WindowNode).width ?? 1.5
        localX = (child as WindowNode).position[0]
      } else {
        continue
      }
      
      openings.push({
        id: child.id,
        minX: localX - width / 2,
        maxX: localX + width / 2
      })
    }
    
    for (let i = 0; i < openings.length; i++) {
      for (let j = i + 1; j < openings.length; j++) {
        const a = openings[i]!
        const b = openings[j]!
        if (a.maxX > b.minX && a.minX < b.maxX) {
          issues.push({
            type: 'overlap',
            severity: 'warning',
            ruleId: 'opening.overlap',
            nodeId: a.id,
            message: `Opening overlaps with another opening on the same wall`,
          })
        }
      }
    }
  }
}

function validateFurnitureCollision(
  items: ItemNode[],
  issues: ValidationIssue[],
): void {
  const floorItems = items.filter(i => i.asset.attachTo !== 'wall' && i.asset.attachTo !== 'wall-side' && i.asset.attachTo !== 'ceiling')
  
  for (let i = 0; i < floorItems.length; i++) {
    for (let j = i + 1; j < floorItems.length; j++) {
      const a = floorItems[i]!
      const b = floorItems[j]!
      
      const dist = dist2D([a.position[0], a.position[2]], [b.position[0], b.position[2]])
      
      const dimA = getScaledDimensions(a)
      const dimB = getScaledDimensions(b)
      const radiusA = Math.max(dimA[0], dimA[2]) / 2
      const radiusB = Math.max(dimB[0], dimB[2]) / 2
      
      // Allow 20% overlap margin to prevent false positives for items placed close to each other
      if (dist < (radiusA + radiusB) * 0.8) {
        issues.push({
          type: 'overlap',
          severity: 'warning',
          ruleId: 'furniture.collision',
          nodeId: a.id,
          message: `Furniture "${a.asset.name}" might be colliding with "${b.asset.name}"`,
        })
      }
    }
  }
}

function validatePhysicsAndStructure(
  items: ItemNode[],
  slabs: SlabNode[],
  walls: WallNode[],
  nodes: Record<AnyNodeId, AnyNode>,
  issues: ValidationIssue[],
): void {
  const { updateNode } = useScene.getState()
  
  // 1. Furniture floating check
  for (const item of items) {
    if (item.asset.attachTo === 'wall' || item.asset.attachTo === 'wall-side' || item.asset.attachTo === 'ceiling') continue
    
    // Find highest slab it rests on
    let highestElevation = 0
    for (const slab of slabs) {
      if (slab.polygon.length >= 3 && pointInPolygon(item.position[0], item.position[2], slab.polygon)) {
        highestElevation = Math.max(highestElevation, slab.elevation ?? 0.05)
      }
    }
    
    if (Math.abs(item.position[1] - highestElevation) > 0.02) {
      updateNode(item.id as AnyNodeId, {
        position: [item.position[0], highestElevation, item.position[2]],
      } as Partial<AnyNode>)
      
      issues.push({
        type: 'bounds',
        severity: 'fixed',
        ruleId: 'furniture.floor_level',
        nodeId: item.id,
        message: `Furniture "${item.asset.name}" was floating, snapped to floor level (${highestElevation.toFixed(2)}m)`,
      })
    }
  }
  
  // 2. Door/Window height check
  for (const wall of walls) {
    const wallHeight = wall.height ?? 2.8
    for (const childId of wall.children) {
      const child = nodes[childId as AnyNodeId]
      if (!child) continue
      
      if (child.type === 'door') {
        const door = child as DoorNode
        if ((door.height ?? 2.1) > wallHeight) {
          updateNode(door.id as AnyNodeId, { height: wallHeight - 0.1 } as Partial<AnyNode>)
          issues.push({
            type: 'bounds',
            severity: 'fixed',
            ruleId: 'opening.height_fits_wall',
            nodeId: door.id,
            message: `Door height exceeded wall height, scaled down`,
          })
        }
      } else if (child.type === 'window') {
        const win = child as WindowNode
        const topEdge = (win.position[1] ?? 0.9) + (win.height ?? 1.5) / 2
        if (topEdge > wallHeight) {
          issues.push({
            type: 'bounds',
            severity: 'warning',
            ruleId: 'opening.height_fits_wall',
            nodeId: win.id,
            message: `Window top edge (${topEdge.toFixed(2)}m) exceeds wall height (${wallHeight.toFixed(2)}m)`,
          })
        }
      }
    }
  }
  
  // 3. Large span check
  for (const slab of slabs) {
    if (slab.polygon.length < 3) continue
    const area = polygonArea(slab.polygon)
    // If a single room area is > 64 sqm (e.g. 8x8), warn about structure
    if (area > 64) {
      issues.push({
        type: 'info',
        severity: 'info',
        ruleId: 'structure.large_span',
        nodeId: slab.id,
        message: `Large slab detected (${area.toFixed(1)} sqm). Ensure adequate structural support.`,
      })
    }
  }
}

function validateArchitectureDesign(
  items: ItemNode[],
  slabs: SlabNode[],
  walls: WallNode[],
  zones: ZoneNode[],
  nodes: Record<AnyNodeId, AnyNode>,
  issues: ValidationIssue[],
  profile: CodeProfile,
): void {
  const windowsBySlab = collectWindowsBySlab(slabs, walls, nodes)
  const zonesBySlab = collectZonesBySlab(slabs, zones)

  for (const slab of slabs) {
    if (slab.polygon.length < 3) continue

    const bounds = polygonBounds(slab.polygon)
    const area = polygonArea(slab.polygon)
    const windows = windowsBySlab.get(slab.id) ?? []
    const windowArea = windows.reduce((sum, win) => sum + (win.width ?? 1.5) * (win.height ?? 1.5), 0)
    const daylightRatio = area > 0 ? windowArea / area : 0
    const shortSide = Math.min(bounds.width, bounds.depth)
    const longSide = Math.max(bounds.width, bounds.depth)
    const aspectRatio = shortSide > 0 ? longSide / shortSide : Infinity
    const isLikelyCorridor = longSide >= 3 && shortSide <= 1.6
    const roomUses = roomUsesForSlab(slab, zonesBySlab)
    const isMainSpace = roomUses.has('bedroom') || roomUses.has('living') || roomUses.has('dining')

    if (area >= 8 && windows.length === 0) {
      issues.push({
        type: 'code',
        severity: 'warning',
        ruleId: 'room.daylight_ratio',
        nodeId: slab.id,
        message: `Room/slab ${slab.id} has no associated exterior window. Add daylight/ventilation before furnishing.`,
      })
    } else if (area >= 8 && daylightRatio < profile.minDaylightRatio) {
      issues.push({
        type: 'code',
        severity: 'warning',
        ruleId: 'room.daylight_ratio',
        nodeId: slab.id,
        message: `Room/slab ${slab.id} daylight ratio is low (${(daylightRatio * 100).toFixed(1)}%). Add or enlarge windows.`,
      })
    }

    if (isMainSpace && area >= 6 && daylightRatio < profile.minDaylightRatio) {
      issues.push({
        type: 'code',
        severity: 'warning',
        ruleId: 'room.main_space_daylight',
        nodeId: slab.id,
        message: `Main residential space daylight ratio is ${(daylightRatio * 100).toFixed(1)}%; target at least ${(profile.minDaylightRatio * 100).toFixed(0)}%.`,
      })
    }

    if (roomUses.has('kitchen') && !hasVentilationStrategy('kitchen', windows, items)) {
      issues.push({
        type: 'code',
        severity: 'warning',
        ruleId: 'room.kitchen_ventilation',
        nodeId: slab.id,
        message: `Kitchen zone has no exterior window or modeled mechanical ventilation strategy.`,
      })
    }

    if (roomUses.has('bathroom') && !hasVentilationStrategy('bathroom', windows, items)) {
      issues.push({
        type: 'code',
        severity: 'warning',
        ruleId: 'room.bathroom_ventilation',
        nodeId: slab.id,
        message: `Bathroom zone has no exterior window or modeled mechanical ventilation strategy.`,
      })
    }

    if (!isLikelyCorridor && area >= 4 && shortSide < profile.minRoomWidth) {
      issues.push({
        type: 'code',
        severity: 'warning',
        ruleId: 'room.min_width',
        nodeId: slab.id,
        message: `Usable room is too narrow (${shortSide.toFixed(2)}m). Keep normal rooms at least ${profile.minRoomWidth.toFixed(1)}m wide; use hallway semantics for narrower spaces.`,
      })
    }

    if (area >= 6 && aspectRatio > profile.maxRoomAspectRatio && shortSide < profile.minCorridorWidth) {
      issues.push({
        type: 'code',
        severity: 'warning',
        ruleId: 'room.aspect_ratio',
        nodeId: slab.id,
        message: `Room proportion is extreme (${aspectRatio.toFixed(1)}:1). Rebalance dimensions or model it as a corridor.`,
      })
    }
    if (area >= 8 && !slabTouchesExterior(slab, walls)) {
      issues.push({
        type: 'code',
        severity: 'warning',
        ruleId: 'room.exterior_edge',
        nodeId: slab.id,
        message: `Enclosed room appears to have no exterior edge for natural light/ventilation.`,
      })
    }
  }
}

function checkCirculationAndSafety(
  levelId: string,
  walls: WallNode[],
  slabs: SlabNode[],
  items: ItemNode[],
  zones: ZoneNode[],
  nodes: Record<AnyNodeId, AnyNode>,
  issues: ValidationIssue[],
  profile: CodeProfile,
): void {
  const levelNode = nodes[levelId as AnyNodeId]
  const isGroundLevel = levelNode && levelNode.type === 'level' && (levelNode as any).level === 0

  // Find all doors and their world coordinates
  const doorInfos: Array<{id: string, worldX: number, worldZ: number, normX: number, normZ: number, width: number}> = []

  for (const wall of walls) {
    const dx = wall.end[0] - wall.start[0]
    const dz = wall.end[1] - wall.start[1]
    const len = Math.sqrt(dx * dx + dz * dz)
    if (len < 0.001) continue
    
    const dirX = dx / len
    const dirZ = dz / len
    const normX = -dirZ
    const normZ = dirX

    for (const childId of wall.children) {
      const child = nodes[childId as AnyNodeId]
      if (child && child.type === 'door') {
        const door = child as DoorNode
        const localX = door.position[0]
        const worldX = wall.start[0] + dirX * localX
        const worldZ = wall.start[1] + dirZ * localX
        
        doorInfos.push({
          id: door.id,
          worldX,
          worldZ,
          normX,
          normZ,
          width: door.width ?? 0.9
        })
      }
    }
  }

  // 1. Door Clearance (Circulation)
  const floorItems = items.filter(i => i.asset.attachTo !== 'wall' && i.asset.attachTo !== 'wall-side' && i.asset.attachTo !== 'ceiling')
  
  for (const door of doorInfos) {
    for (const item of floorItems) {
      const dist = dist2D([door.worldX, door.worldZ], [item.position[0], item.position[2]])
      const dim = getScaledDimensions(item)
      const itemRadius = Math.max(dim[0], dim[2]) / 2
      const clearance = dist - door.width / 2 - itemRadius
      
      // Minimum required clearance: door half width + 0.5m clearance + item radius
      const requiredClearance = (door.width / 2) + profile.minDoorClearance + itemRadius
      
      if (dist < requiredClearance) {
        issues.push({
          type: 'overlap',
          severity: 'warning',
          ruleId: 'furniture.door_clearance',
          nodeId: item.id,
          message: `Furniture "${item.asset.name}" is blocking the door (clearance < ${profile.minDoorClearance.toFixed(1)}m).`,
        })
      }

      if (clearance < profile.minFurnitureClearPath) {
        issues.push({
          type: 'overlap',
          severity: 'warning',
          ruleId: 'circulation.furniture_clear_path',
          nodeId: item.id,
          message: `Furniture "${item.asset.name}" leaves only ${clearance.toFixed(2)}m clear circulation near a doorway.`,
        })
      }
    }
  }

  const zonesBySlab = collectZonesBySlab(slabs, zones)
  for (const slab of slabs) {
    if (slab.polygon.length < 3) continue
    const uses = roomUsesForSlab(slab, zonesBySlab)
    const bounds = polygonBounds(slab.polygon)
    const shortSide = Math.min(bounds.width, bounds.depth)
    if ((uses.has('entry') || uses.has('corridor')) && shortSide < profile.minEntryClearWidth) {
      issues.push({
        type: 'code',
        severity: 'warning',
        ruleId: 'circulation.entry_clear_width',
        nodeId: slab.id,
        message: `Entry/circulation clear width is ${shortSide.toFixed(2)}m; target at least ${profile.minEntryClearWidth.toFixed(2)}m.`,
      })
    }
  }

  // 2. Exterior Door Floating Risk
  if (!isGroundLevel) {
    for (const door of doorInfos) {
      // Check 0.5m away from door center in both normal directions
      const pt1 = [door.worldX + door.normX * 0.5, door.worldZ + door.normZ * 0.5]
      const pt2 = [door.worldX - door.normX * 0.5, door.worldZ - door.normZ * 0.5]
      
      let pt1InSlab = false
      let pt2InSlab = false
      
      for (const slab of slabs) {
        if (slab.polygon.length >= 3) {
          if (pointInPolygon(pt1[0]!, pt1[1]!, slab.polygon)) pt1InSlab = true
          if (pointInPolygon(pt2[0]!, pt2[1]!, slab.polygon)) pt2InSlab = true
        }
      }
      
      // If one side is in a slab, but the other is completely outside any slab, it's an exterior door.
      if ((pt1InSlab && !pt2InSlab) || (!pt1InSlab && pt2InSlab)) {
        issues.push({
          type: 'code',
          severity: 'warning',
          ruleId: 'door.upper_floor_fall_hazard',
          nodeId: door.id,
          message: `Exterior door detected on an upper floor without a balcony/slab outside. Fall hazard!`,
        })
      }
    }
  }
}

function validateBuildingCodeBasics(
  walls: WallNode[],
  slabs: SlabNode[],
  zones: ZoneNode[],
  nodes: Record<AnyNodeId, AnyNode>,
  issues: ValidationIssue[],
  profile: CodeProfile,
): void {
  const doorsBySlab = collectDoorsBySlab(slabs, walls, nodes)
  const zonesBySlab = collectZonesBySlab(slabs, zones)

  for (const wall of walls) {
    const wallLen = wallLength(wall)
    const openings: Array<{ id: string; minX: number; maxX: number }> = []

    for (const childId of wall.children) {
      const child = nodes[childId as AnyNodeId]
      if (!child) continue

      if (child.type === 'door') {
        const door = child as DoorNode
        const doorWidth = door.width ?? 0.9
        const minX = door.position[0] - doorWidth / 2
        const maxX = door.position[0] + doorWidth / 2
        openings.push({ id: door.id, minX, maxX })

        if (doorWidth < profile.minDoorClearWidth) {
          issues.push({
            type: 'code',
            severity: 'warning',
            ruleId: 'door.clear_width',
            nodeId: door.id,
            message: `Door width ${doorWidth.toFixed(2)}m is below the ${profile.minDoorClearWidth.toFixed(2)}m minimum clear-width target.`,
          })
        }

        if (wallLen > 0 && doorWidth > wallLen * 0.75) {
          issues.push({
            type: 'code',
            severity: 'warning',
            ruleId: 'door.wall_ratio',
            nodeId: door.id,
            message: `Door consumes too much of a short wall (${doorWidth.toFixed(2)}m door on ${wallLen.toFixed(2)}m wall).`,
          })
        }

        if (minX < profile.minOpeningEdgeClearance || wallLen - maxX < profile.minOpeningEdgeClearance) {
          issues.push({
            type: 'code',
            severity: 'warning',
            ruleId: 'opening.edge_clearance',
            nodeId: door.id,
            message: `Door is too close to a wall end; keep at least ${profile.minOpeningEdgeClearance.toFixed(2)}m edge clearance.`,
          })
        }
      }

      if (child.type === 'window') {
        const win = child as WindowNode
        const winWidth = win.width ?? 1.5
        const minX = win.position[0] - winWidth / 2
        const maxX = win.position[0] + winWidth / 2
        openings.push({ id: win.id, minX, maxX })
        const sillCenter = win.position[1]
        const winHeight = win.height ?? 1.5
        const sillBottom = sillCenter - winHeight / 2

        if (minX < profile.minOpeningEdgeClearance || wallLen - maxX < profile.minOpeningEdgeClearance) {
          issues.push({
            type: 'code',
            severity: 'warning',
            ruleId: 'opening.edge_clearance',
            nodeId: win.id,
            message: `Window is too close to a wall end; keep at least ${profile.minOpeningEdgeClearance.toFixed(2)}m edge clearance.`,
          })
        }

        if (sillBottom < profile.minWindowSillHeight) {
          issues.push({
            type: 'code',
            severity: 'warning',
            ruleId: 'window.sill_height',
            nodeId: win.id,
            message: `Window sill is low (${sillBottom.toFixed(2)}m). Check fall protection or raise sill height.`,
          })
        }

        if (sillBottom + 1e-6 < profile.minFallProtectionSillHeight) {
          issues.push({
            type: 'code',
            severity: 'warning',
            ruleId: 'window.fall_protection',
            nodeId: win.id,
            message: `Window sill bottom is ${sillBottom.toFixed(2)}m; add fall protection or raise to ${profile.minFallProtectionSillHeight.toFixed(2)}m.`,
          })
        }
      }
    }

    openings.sort((a, b) => a.minX - b.minX)
    for (let i = 1; i < openings.length; i++) {
      const prev = openings[i - 1]!
      const current = openings[i]!
      const spacing = current.minX - prev.maxX
      if (spacing >= 0 && spacing < profile.minOpeningSpacing) {
        issues.push({
          type: 'code',
          severity: 'warning',
          ruleId: 'opening.min_spacing',
          nodeId: current.id,
          message: `Adjacent openings are only ${spacing.toFixed(2)}m apart; keep at least ${profile.minOpeningSpacing.toFixed(2)}m between openings.`,
        })
      }
    }
  }

  for (const slab of slabs) {
    if (slab.polygon.length < 3) continue
    const bounds = polygonBounds(slab.polygon)
    const shortSide = Math.min(bounds.width, bounds.depth)
    const longSide = Math.max(bounds.width, bounds.depth)
    const area = polygonArea(slab.polygon)
    const isLikelyCorridor = longSide >= 3 && shortSide <= 1.6
    const roomUses = roomUsesForSlab(slab, zonesBySlab)

    if (isLikelyCorridor && shortSide < profile.minCorridorWidth) {
      issues.push({
        type: 'code',
        severity: 'warning',
        ruleId: 'corridor.min_width',
        nodeId: slab.id,
        message: `Corridor clear width is about ${shortSide.toFixed(2)}m; keep circulation at least ${profile.minCorridorWidth.toFixed(2)}m wide.`,
      })
    }

    if (area > 0 && area < profile.minUsableArea) {
      issues.push({
        type: 'code',
        severity: 'warning',
        ruleId: 'room.min_area',
        nodeId: slab.id,
        message: `Room/slab area is only ${area.toFixed(1)} sqm, which is too small for a usable enclosed space.`,
      })
    }

    if (roomUses.has('bedroom')) {
      if (area < profile.minBedroomArea) {
        issues.push({
          type: 'code',
          severity: 'warning',
          ruleId: 'room.bedroom_min_area',
          nodeId: slab.id,
          message: `Bedroom area is ${area.toFixed(1)} sqm; target at least ${profile.minBedroomArea.toFixed(1)} sqm.`,
        })
      }
      if (shortSide < profile.minBedroomWidth) {
        issues.push({
          type: 'code',
          severity: 'warning',
          ruleId: 'room.bedroom_min_width',
          nodeId: slab.id,
          message: `Bedroom short side is ${shortSide.toFixed(2)}m; target at least ${profile.minBedroomWidth.toFixed(2)}m.`,
        })
      }
    }

    if (roomUses.has('living') && area < profile.minLivingArea) {
      issues.push({
        type: 'code',
        severity: 'warning',
        ruleId: 'room.living_min_area',
        nodeId: slab.id,
        message: `Living room area is ${area.toFixed(1)} sqm; target at least ${profile.minLivingArea.toFixed(1)} sqm.`,
      })
    }

    if (roomUses.has('living') && shortSide < profile.minLivingWidth) {
      issues.push({
        type: 'code',
        severity: 'warning',
        ruleId: 'room.living_min_width',
        nodeId: slab.id,
        message: `Living room short side is ${shortSide.toFixed(2)}m; target at least ${profile.minLivingWidth.toFixed(2)}m.`,
      })
    }

    if (roomUses.has('kitchen')) {
      if (area < profile.minKitchenArea) {
        issues.push({
          type: 'code',
          severity: 'warning',
          ruleId: 'room.kitchen_min_area',
          nodeId: slab.id,
          message: `Kitchen area is ${area.toFixed(1)} sqm; target at least ${profile.minKitchenArea.toFixed(1)} sqm.`,
        })
      }
      if (shortSide < profile.minKitchenWidth) {
        issues.push({
          type: 'code',
          severity: 'warning',
          ruleId: 'room.kitchen_min_width',
          nodeId: slab.id,
          message: `Kitchen short side is ${shortSide.toFixed(2)}m; target at least ${profile.minKitchenWidth.toFixed(2)}m.`,
        })
      }
    }

    if (roomUses.has('bathroom') && area < profile.minBathroomArea) {
      issues.push({
        type: 'code',
        severity: 'warning',
        ruleId: 'room.bathroom_min_area',
        nodeId: slab.id,
        message: `Bathroom area is ${area.toFixed(1)} sqm; target at least ${profile.minBathroomArea.toFixed(1)} sqm.`,
      })
    }

    if (!isLikelyCorridor && area >= 4 && (doorsBySlab.get(slab.id)?.length ?? 0) === 0) {
      issues.push({
        type: 'code',
        severity: 'warning',
        ruleId: 'room.has_door',
        nodeId: slab.id,
        message: `Room/slab ${slab.id} has no associated door/opening. Add a doorway for circulation.`,
      })
    }
  }

  validateWetroomAdjacency(slabs, zonesBySlab, issues, profile)
}

function validateWetroomAdjacency(
  slabs: SlabNode[],
  zonesBySlab: Map<string, ZoneNode[]>,
  issues: ValidationIssue[],
  profile: CodeProfile,
): void {
  const wetSlabs = slabs.filter((slab) => {
    const uses = roomUsesForSlab(slab, zonesBySlab)
    return uses.has('kitchen') || uses.has('bathroom')
  })

  for (const slab of wetSlabs) {
    const uses = roomUsesForSlab(slab, zonesBySlab)
    if (uses.has('kitchen') && wetSlabs.some((other) => other.id !== slab.id && roomUsesForSlab(other, zonesBySlab).has('bathroom'))) {
      continue
    }
    if (uses.has('bathroom') && wetSlabs.some((other) => other.id !== slab.id && roomUsesForSlab(other, zonesBySlab).has('kitchen'))) {
      continue
    }
    const nearest = wetSlabs
      .filter((other) => other.id !== slab.id)
      .reduce((best, other) => Math.min(best, minDistanceBetweenPolygons(slab.polygon, other.polygon)), Infinity)

    if (nearest > profile.minWetroomAdjacencyDistance) {
      issues.push({
        type: 'info',
        severity: 'info',
        ruleId: 'wetroom.adjacency_hint',
        nodeId: slab.id,
        message: `Wet room is isolated from other wet rooms; group kitchen/bathroom plumbing when possible.`,
      })
    }
  }
}

function detectSlabOverlaps(
  slabs: SlabNode[],
  issues: ValidationIssue[],
): void {
  for (let i = 0; i < slabs.length; i++) {
    for (let j = i + 1; j < slabs.length; j++) {
      const a = slabs[i]!
      const b = slabs[j]!
      
      if (a.polygon.length < 3 || b.polygon.length < 3) continue
      
      // Fast check: is any vertex of A inside B?
      let overlap = false
      for (const pt of a.polygon) {
        if (pointInPolygon(pt[0], pt[1], b.polygon)) {
          overlap = true
          break
        }
      }
      // Or any vertex of B inside A?
      if (!overlap) {
        for (const pt of b.polygon) {
          if (pointInPolygon(pt[0], pt[1], a.polygon)) {
            overlap = true
            break
          }
        }
      }
      
      if (overlap) {
        issues.push({
          type: 'overlap',
          severity: 'warning',
          ruleId: 'geometry.slab_overlap',
          nodeId: a.id,
          message: `Room/Slab footprint overlaps with another room. Ensure they are adjacent, not intersecting.`,
        })
      }
    }
  }
}

// ============================================================================
// MAIN VALIDATOR
// ============================================================================

export function validateAndCorrectScene(levelId: string, codeProfile?: string): ValidationResult {
  const { nodes } = useScene.getState()
  const issues: ValidationIssue[] = []
  const profile = resolveCodeProfile(codeProfile)

  // Collect elements on this level
  const walls: WallNode[] = []
  const slabs: SlabNode[] = []
  const items: ItemNode[] = []
  const zones: ZoneNode[] = []

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
    else if (node.type === 'zone') zones.push(node as ZoneNode)
  }

  // Run validations
  snapWallEndpoints(walls, issues, profile)
  validateDoorWindowFit(walls, nodes, issues, profile)
  validateFurnitureBounds(items, slabs, issues, profile)
  detectWallGaps(walls, issues, profile)
  detectDoorWindowOverlap(walls, nodes, issues)
  validateFurnitureCollision(items, issues)
  validatePhysicsAndStructure(items, slabs, walls, nodes, issues)
  validateArchitectureDesign(items, slabs, walls, zones, nodes, issues, profile)
  checkCirculationAndSafety(levelId, walls, slabs, items, zones, nodes, issues, profile)
  detectSlabOverlaps(slabs, issues)
  validateBuildingCodeBasics(walls, slabs, zones, nodes, issues, profile)

  const fixedCount = issues.filter((i) => i.severity === 'fixed').length
  const warningCount = issues.filter((i) => i.severity === 'warning').length
  const blockingCount = issues.filter((i) => i.severity === 'warning' && (i.type === 'code' || i.type === 'bounds' || i.type === 'gap' || i.type === 'overlap')).length

  return { issues, fixedCount, warningCount, blockingCount, codeProfile: profile.name }
}

export function formatValidationReport(result: ValidationResult): string {
  const blocking = result.blockingCount > 0
  const issueSummary = result.issues.reduce<Record<string, number>>((acc, issue) => {
    acc[issue.type] = (acc[issue.type] ?? 0) + 1
    return acc
  }, {})
  const ruleSummary = result.issues.reduce<Record<string, number>>((acc, issue) => {
    acc[issue.ruleId] = (acc[issue.ruleId] ?? 0) + 1
    return acc
  }, {})
  const blockingRuleIds = Array.from(new Set(result.issues
    .filter((i) => i.severity === 'warning' && (i.type === 'code' || i.type === 'bounds' || i.type === 'gap' || i.type === 'overlap'))
    .map((i) => i.ruleId)))

  if (result.issues.length === 0) {
    return JSON.stringify({
      valid: true,
      blocking: false,
      fixedCount: 0,
      warningCount: 0,
      blockingCount: 0,
      codeProfile: result.codeProfile,
      issueSummary: {},
      ruleSummary: {},
      blockingRuleIds: [],
      issues: [],
      message: 'No spatial or building-code issues found',
      nextAction: 'Continue to the next staged generation phase.',
    })
  }

  return JSON.stringify({
    valid: !blocking,
    blocking,
    fixedCount: result.fixedCount,
    warningCount: result.warningCount,
    blockingCount: result.blockingCount,
    codeProfile: result.codeProfile,
    issueSummary,
    ruleSummary,
    blockingRuleIds,
    issues: result.issues.map((i) => ({
      type: i.type,
      severity: i.severity,
      ruleId: i.ruleId,
      nodeId: i.nodeId,
      message: i.message,
    })),
    nextAction: blocking
      ? 'Fix blocking warnings before continuing to furniture, roof, decoration, or finalization.'
      : 'Only informational issues remain; continue to the next staged generation phase.',
  })
}

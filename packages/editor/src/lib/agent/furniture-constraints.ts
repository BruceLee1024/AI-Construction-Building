export type Bounds2D = { minX: number; minZ: number; maxX: number; maxZ: number }
export type BBox2D = Bounds2D

export type ConstraintZone = BBox2D & {
  reason: string
  nodeId?: string
}

export type PathZone = BBox2D & {
  from: [number, number]
  to: [number, number]
  reason: string
  nodeId?: string
}

export type FurnitureConstraintSummary = {
  usableArea: number
  blockedArea: number
  blockedZones: ConstraintZone[]
  clearPathCandidates: PathZone[]
  constraintFailures: string[]
}

export type FurnitureConstraintModel = {
  roomBounds: Bounds2D
  usableBounds: Bounds2D
  roomArea: number
  usableArea: number
  blockedZones: ConstraintZone[]
  clearPathCandidates: PathZone[]
  constraintSummary: FurnitureConstraintSummary
}

type ConstraintWall = {
  id?: string
  start?: [number, number]
  end?: [number, number]
  children?: string[]
}

type ConstraintOpening = {
  id?: string
  type?: string
  position?: [number, number, number] | [number, number]
  width?: number
}

type ConstraintItem = {
  id?: string
  position?: [number, number, number]
  dimensions?: [number, number, number]
  rotationDeg?: number
  reason?: string
}

function round3(v: number): number {
  return Math.round(v * 1000) / 1000
}

export function polygonBounds2D(polygon: [number, number][]): Bounds2D {
  const xs = polygon.map((p) => p[0])
  const zs = polygon.map((p) => p[1])
  return {
    minX: round3(Math.min(...xs)),
    minZ: round3(Math.min(...zs)),
    maxX: round3(Math.max(...xs)),
    maxZ: round3(Math.max(...zs)),
  }
}

export function polygonArea2D(polygon: [number, number][]): number {
  let area = 0
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    area += (polygon[j]![0] + polygon[i]![0]) * (polygon[j]![1] - polygon[i]![1])
  }
  return round3(Math.abs(area) / 2)
}

export function pointInPolygon2D(x: number, z: number, polygon: [number, number][]): boolean {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, zi] = polygon[i]!
    const [xj, zj] = polygon[j]!
    if ((zi > z) !== (zj > z) && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) {
      inside = !inside
    }
  }
  return inside
}

export function bboxForFurniture(
  position: [number, number, number],
  dimensions: [number, number, number],
  rotationDeg: number,
): BBox2D {
  const rot = ((Math.round(rotationDeg) % 360) + 360) % 360
  const isRotated = rot === 90 || rot === 270
  const worldW = isRotated ? dimensions[2] : dimensions[0]
  const worldD = isRotated ? dimensions[0] : dimensions[2]
  return {
    minX: round3(position[0] - worldW / 2),
    minZ: round3(position[2] - worldD / 2),
    maxX: round3(position[0] + worldW / 2),
    maxZ: round3(position[2] + worldD / 2),
  }
}

export function expandBBox2D(bbox: BBox2D, amount: number): BBox2D {
  return {
    minX: round3(bbox.minX - amount),
    minZ: round3(bbox.minZ - amount),
    maxX: round3(bbox.maxX + amount),
    maxZ: round3(bbox.maxZ + amount),
  }
}

export function bboxOverlaps2D(a: BBox2D, b: BBox2D): boolean {
  return a.maxX > b.minX && a.minX < b.maxX && a.maxZ > b.minZ && a.minZ < b.maxZ
}

export function bboxArea2D(bbox: BBox2D): number {
  return round3(Math.max(0, bbox.maxX - bbox.minX) * Math.max(0, bbox.maxZ - bbox.minZ))
}

export function bboxInsideBounds2D(bbox: BBox2D, bounds: Bounds2D, margin = 0): boolean {
  return bbox.minX >= bounds.minX + margin &&
    bbox.maxX <= bounds.maxX - margin &&
    bbox.minZ >= bounds.minZ + margin &&
    bbox.maxZ <= bounds.maxZ - margin
}

export function bboxCornersInsidePolygon2D(bbox: BBox2D, polygon: [number, number][], margin = 0): boolean {
  return [
    [bbox.minX + margin, bbox.minZ + margin],
    [bbox.maxX - margin, bbox.minZ + margin],
    [bbox.maxX - margin, bbox.maxZ - margin],
    [bbox.minX + margin, bbox.maxZ - margin],
  ].every(([x, z]) => pointInPolygon2D(x!, z!, polygon))
}

export function segmentBBox2D(from: [number, number], to: [number, number], width: number): BBox2D {
  const minX = Math.min(from[0], to[0]) - width / 2
  const maxX = Math.max(from[0], to[0]) + width / 2
  const minZ = Math.min(from[1], to[1]) - width / 2
  const maxZ = Math.max(from[1], to[1]) + width / 2
  return { minX: round3(minX), minZ: round3(minZ), maxX: round3(maxX), maxZ: round3(maxZ) }
}

export function buildFurnitureConstraintModel(args: {
  polygon: [number, number][]
  bounds?: Bounds2D
  walls?: ConstraintWall[]
  nodes?: Record<string, unknown>
  existingItems?: ConstraintItem[]
  plannedItems?: ConstraintItem[]
  interiorInset?: number
  doorClearanceDepth?: number
  windowAccessDepth?: number
  pathWidth?: number
}): FurnitureConstraintModel {
  const roomBounds = args.bounds ?? polygonBounds2D(args.polygon)
  const inset = args.interiorInset ?? 0.08
  const usableBounds = {
    minX: round3(roomBounds.minX + inset),
    minZ: round3(roomBounds.minZ + inset),
    maxX: round3(roomBounds.maxX - inset),
    maxZ: round3(roomBounds.maxZ - inset),
  }
  const roomCenter: [number, number] = [
    (roomBounds.minX + roomBounds.maxX) / 2,
    (roomBounds.minZ + roomBounds.maxZ) / 2,
  ]
  const blockedZones: ConstraintZone[] = []
  const clearPathCandidates: PathZone[] = []
  const nodes = args.nodes ?? {}
  const doorCenters: Array<{ point: [number, number]; id?: string }> = []

  for (const wall of args.walls ?? []) {
    if (!wall.start || !wall.end) continue
    const dx = wall.end[0] - wall.start[0]
    const dz = wall.end[1] - wall.start[1]
    const len = Math.sqrt(dx * dx + dz * dz)
    if (len < 0.01) continue
    const dirX = dx / len
    const dirZ = dz / len
    const normX = -dirZ
    const normZ = dirX
    const mid: [number, number] = [(wall.start[0] + wall.end[0]) / 2, (wall.start[1] + wall.end[1]) / 2]
    const insideSign = ((roomCenter[0] - mid[0]) * normX + (roomCenter[1] - mid[1]) * normZ) >= 0 ? 1 : -1

    for (const childId of wall.children ?? []) {
      const child = nodes[childId] as ConstraintOpening | undefined
      if (!child || (child.type !== 'door' && child.type !== 'window')) continue
      const localX = Array.isArray(child.position) ? child.position[0] : len / 2
      const width = child.width ?? (child.type === 'door' ? 0.9 : 1.5)
      const centerX = wall.start[0] + dirX * localX
      const centerZ = wall.start[1] + dirZ * localX
      const along = width / 2 + 0.25
      const depth = child.type === 'door' ? (args.doorClearanceDepth ?? 0.9) : (args.windowAccessDepth ?? 0.45)
      const p1: [number, number] = [centerX - dirX * along, centerZ - dirZ * along]
      const p2: [number, number] = [centerX + dirX * along, centerZ + dirZ * along]
      const p3: [number, number] = [p2[0] + normX * insideSign * depth, p2[1] + normZ * insideSign * depth]
      const p4: [number, number] = [p1[0] + normX * insideSign * depth, p1[1] + normZ * insideSign * depth]
      const xs = [p1[0], p2[0], p3[0], p4[0]]
      const zs = [p1[1], p2[1], p3[1], p4[1]]
      blockedZones.push({
        minX: round3(Math.min(...xs)),
        minZ: round3(Math.min(...zs)),
        maxX: round3(Math.max(...xs)),
        maxZ: round3(Math.max(...zs)),
        reason: child.type === 'door' ? 'door_clearance' : 'window_access',
        nodeId: child.id,
      })
      if (child.type === 'door') doorCenters.push({ point: [centerX, centerZ], id: child.id })
    }
  }

  for (const item of [...(args.existingItems ?? []), ...(args.plannedItems ?? [])]) {
    if (!item.position || !item.dimensions) continue
    blockedZones.push({
      ...expandBBox2D(bboxForFurniture(item.position, item.dimensions, item.rotationDeg ?? 0), 0.05),
      reason: item.reason ?? 'existing_furniture',
      nodeId: item.id,
    })
  }

  const pathWidth = args.pathWidth ?? 0.65
  for (const door of doorCenters) {
    clearPathCandidates.push({
      ...segmentBBox2D(door.point, roomCenter, pathWidth),
      from: [round3(door.point[0]), round3(door.point[1])],
      to: [round3(roomCenter[0]), round3(roomCenter[1])],
      reason: 'door_to_room_center',
      nodeId: door.id,
    })
  }
  for (let i = 0; i < doorCenters.length; i++) {
    for (let j = i + 1; j < doorCenters.length; j++) {
      const a = doorCenters[i]!
      const b = doorCenters[j]!
      clearPathCandidates.push({
        ...segmentBBox2D(a.point, b.point, pathWidth),
        from: [round3(a.point[0]), round3(a.point[1])],
        to: [round3(b.point[0]), round3(b.point[1])],
        reason: 'door_to_door',
        nodeId: a.id,
      })
    }
  }

  const blockedArea = round3(blockedZones.reduce((sum, zone) => sum + bboxArea2D(zone), 0))
  const usableArea = round3(Math.max(0, polygonArea2D(args.polygon) - blockedArea))
  const constraintFailures = usableArea <= 0 ? ['no_usable_area'] : []

  return {
    roomBounds,
    usableBounds,
    roomArea: polygonArea2D(args.polygon),
    usableArea,
    blockedZones,
    clearPathCandidates,
    constraintSummary: {
      usableArea,
      blockedArea,
      blockedZones,
      clearPathCandidates,
      constraintFailures,
    },
  }
}

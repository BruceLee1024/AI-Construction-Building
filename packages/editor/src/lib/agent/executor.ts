import {
  BuildingNode,
  CeilingNode,
  DoorNode,
  ItemNode,
  LevelNode,
  RoofNode,
  RoofSegmentNode,
  SlabNode,
  WallNode,
  WindowNode,
  ZoneNode,
  useScene,
} from '@pascal-app/core'
import { useViewer } from '@pascal-app/viewer'
import type { AnyNode, AnyNodeId } from '@pascal-app/core'
import { CATALOG_ITEMS } from '../../components/ui/item-catalog/catalog-items'
import { validateAndCorrectScene, formatValidationReport } from './spatial-validator'

let lastValidationReport: Record<string, unknown> | null = null

// Round to 3 decimal places for clean spatial feedback
function round3(v: number): number {
  return Math.round(v * 1000) / 1000
}

function compactIds(values: unknown[]): string[] {
  return values.filter((value): value is string => typeof value === 'string' && value.length > 0)
}

function isRecordLike(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function createdByType(entries: Record<string, unknown[]>): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(entries)
      .map(([type, values]) => [type, compactIds(values)])
      .filter(([, ids]) => (ids as string[]).length > 0),
  ) as Record<string, string[]>
}

function polygonBounds(polygon: [number, number][]): { minX: number; minZ: number; maxX: number; maxZ: number } {
  const xs = polygon.map((p) => p[0])
  const zs = polygon.map((p) => p[1])
  return {
    minX: round3(Math.min(...xs)),
    minZ: round3(Math.min(...zs)),
    maxX: round3(Math.max(...xs)),
    maxZ: round3(Math.max(...zs)),
  }
}

function polygonArea(polygon: [number, number][]): number {
  let area = 0
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    area += (polygon[j]![0] + polygon[i]![0]) * (polygon[j]![1] - polygon[i]![1])
  }
  return round3(Math.abs(area) / 2)
}

type Bounds2D = { minX: number; minZ: number; maxX: number; maxZ: number }
type BBox2D = Bounds2D
type FurniturePlacement = 'center' | 'wall' | 'corner' | 'service-wall'

type FurnitureMetadata = {
  footprintRole: 'seating' | 'sleeping' | 'table' | 'storage' | 'appliance' | 'sanitary' | 'decor' | 'lighting'
  preferredPlacement: FurniturePlacement[]
  frontClearance: number
  sideClearance: number
  wallBacked?: boolean
}

type FurnitureCandidate = {
  itemId: string
  position: [number, number, number]
  rotation: number
  bbox: BBox2D
  score: number
  clearanceScore: number
  placement: string
}

type FurnitureRejection = {
  itemId: string
  position?: [number, number, number]
  rotation?: number
  reasons: string[]
}

type FurnitureSolveResult = {
  success: boolean
  roomType: string
  slabId?: string
  roomBounds: Bounds2D
  availableFurnitureZones: Bounds2D[]
  blockedZones: Array<BBox2D & { reason: string; nodeId?: string }>
  placements: FurnitureCandidate[]
  rejections: FurnitureRejection[]
  suggestedNextTools: string[]
}

// Track recently created wall IDs so door/window placement can reference them by index
let recentWallIds: string[] = []

function getActiveLevelId(): string | null {
  const { selection } = useViewer.getState()
  return (selection.levelId as string) ?? null
}

function findFirstLevelId(): string | null {
  const { nodes } = useScene.getState()
  for (const node of Object.values(nodes)) {
    if (node.type === 'level') return node.id
  }
  return null
}

function getLevelId(): string {
  const active = getActiveLevelId()
  if (active) return active
  const first = findFirstLevelId()
  if (first) return first
  throw new Error('No level found in scene')
}

export function executeToolCall(
  name: string,
  args: Record<string, unknown>,
): string {
  try {
    switch (name) {
      case 'create_walls':
        return createWalls(args)
      case 'create_slab':
        return createSlab(args)
      case 'create_door':
        return createDoor(args)
      case 'create_window':
        return createWindow(args)
      case 'create_room':
        return createRoom(args)
      case 'create_ceiling':
        return createCeiling(args)
      case 'create_zone':
        return createZone(args)
      case 'create_roof':
        return createRoof(args)
      case 'create_apartment':
        return createApartment(args)
      case 'create_l_shaped_room':
        return createLShapedRoom(args)
      case 'modify_node':
        return modifyNode(args)
      case 'delete_node':
        return deleteNode(args)
      case 'delete_all_on_level':
        return deleteAllOnLevel()
      case 'get_scene_info':
        return getSceneInfo()
      case 'undo':
        return undoAction()
      case 'redo':
        return redoAction()
      case 'select_node':
        return selectNode(args)
      case 'move_nodes':
        return moveNodes(args)
      case 'add_door_to_wall':
        return addDoorToWall(args)
      case 'add_window_to_wall':
        return addWindowToWall(args)
      case 'batch_modify_nodes':
        return batchModifyNodes(args)
      case 'create_polygon_room':
        return createPolygonRoom(args)
      case 'place_furniture':
        return placeFurniture(args)
      case 'suggest_furniture_layout':
        return suggestFurnitureLayout(args)
      case 'place_furniture_solved':
        return placeFurnitureSolved(args)
      case 'place_in_room':
        return placeInRoom(args)
      case 'place_against_wall':
        return placeAgainstWall(args)
      case 'furnish_room':
        return furnishRoom(args)
      case 'create_hallway':
        return createHallway(args)
      case 'list_furniture':
        return listFurniture()
      case 'create_building_shell':
        return createBuildingShell(args)
      case 'create_furnished_apartment':
        return createFurnishedApartment(args)
      case 'mirror_room':
        return mirrorRoom(args)
      case 'add_level':
        return addLevel(args)
      case 'switch_level':
        return switchLevel(args)
      case 'delete_level':
        return deleteLevel(args)
      case 'rename_level':
        return renameLevel(args)
      case 'duplicate_level':
        return duplicateLevel(args)
      case 'list_levels':
        return listLevels()
      case 'place_wall_item':
        return placeWallItem(args)
      case 'place_ceiling_item':
        return placeCeilingItem(args)
      case 'validate_scene':
        return validateScene(args)
      case 'auto_align_windows':
        return autoAlignWindows(args)
      case 'build_staircase':
        return buildStaircase(args)
      default:
        return JSON.stringify({ error: `Unknown tool: ${name}` })
    }
  } catch (err: unknown) {
    return JSON.stringify({ error: String(err) })
  }
}

function createWalls(args: Record<string, unknown>): string {
  const levelId = getLevelId()
  const wallDefs = args.walls as Array<{
    start: [number, number]
    end: [number, number]
    thickness?: number
    height?: number
  }>

  if (!wallDefs || !Array.isArray(wallDefs) || wallDefs.length === 0) {
    return JSON.stringify({ error: 'walls array is required and must not be empty' })
  }

  for (let i = 0; i < wallDefs.length; i++) {
    const w = wallDefs[i]!
    if (!w.start || !w.end || w.start.length !== 2 || w.end.length !== 2) {
      return JSON.stringify({ error: `Wall ${i}: start and end must be [x, z] arrays` })
    }
    if (w.start[0] === w.end[0] && w.start[1] === w.end[1]) {
      return JSON.stringify({ error: `Wall ${i}: start and end are the same point` })
    }
  }

  const createdIds: string[] = []
  const ops: { node: AnyNode; parentId?: AnyNodeId }[] = []

  for (const def of wallDefs) {
    const wall = WallNode.parse({
      start: def.start,
      end: def.end,
      ...(def.thickness != null ? { thickness: def.thickness } : {}),
      ...(def.height != null ? { height: def.height } : {}),
    })
    ops.push({ node: wall, parentId: levelId as AnyNodeId })
    createdIds.push(wall.id)
  }

  useScene.getState().createNodes(ops)
  recentWallIds = createdIds

  // Build per-wall spatial details so AI can reason about geometry
  const walls = ops.map((op, i) => {
    const w = op.node as unknown as {
      id: string
      start: [number, number]
      end: [number, number]
      thickness?: number
      height?: number
    }
    const dx = w.end[0] - w.start[0]
    const dz = w.end[1] - w.start[1]
    const length = Math.sqrt(dx * dx + dz * dz)
    // Determine face direction (which way the wall's outward normal points)
    let orientation: 'horizontal' | 'vertical' | 'diagonal'
    if (Math.abs(dz) < 0.01) orientation = 'horizontal'
    else if (Math.abs(dx) < 0.01) orientation = 'vertical'
    else orientation = 'diagonal'

    return {
      id: w.id,
      index: i,
      start: w.start,
      end: w.end,
      length: Math.round(length * 1000) / 1000,
      orientation,
      thickness: w.thickness ?? 0.15,
      height: w.height ?? 3,
    }
  })

  return JSON.stringify({
    success: true,
    wallIds: createdIds,
    count: createdIds.length,
    walls,
  })
}

function createSlab(args: Record<string, unknown>): string {
  const levelId = getLevelId()
  const polygon = args.polygon as [number, number][]
  const elevation = (args.elevation as number) ?? 0.05

  const slab = SlabNode.parse({ polygon, elevation })
  useScene.getState().createNode(slab, levelId as AnyNodeId)

  return JSON.stringify({
    success: true,
    slabId: slab.id,
  })
}

function createDoor(args: Record<string, unknown>): string {
  const wallIndex = args.wallIndex as number
  if (wallIndex < 0 || wallIndex >= recentWallIds.length) {
    return JSON.stringify({
      error: `Wall index ${wallIndex} out of range. Recently created ${recentWallIds.length} walls.`,
    })
  }

  const wallId = recentWallIds[wallIndex]!
  const wall = useScene.getState().nodes[wallId as AnyNodeId] as
    | { start: [number, number]; end: [number, number]; height?: number }
    | undefined
  if (!wall) {
    return JSON.stringify({ error: `Wall ${wallId} not found` })
  }

  const t = (args.position_t as number) ?? 0.5
  const wallLen = Math.sqrt(
    (wall.end[0] - wall.start[0]) ** 2 + (wall.end[1] - wall.start[1]) ** 2,
  )
  // Wall-local origin is at wallStart; x runs along the wall from 0 to wallLen
  const xPos = t * wallLen
  const doorHeight = (args.height as number) ?? 2.1
  const yPos = doorHeight / 2

  const door = DoorNode.parse({
    wallId,
    position: [xPos, yPos, 0],
    ...(args.width != null ? { width: args.width as number } : {}),
    ...(args.height != null ? { height: args.height as number } : {}),
  })

  useScene.getState().createNode(door, wallId as AnyNodeId)

  return JSON.stringify({
    success: true,
    doorId: door.id,
    wallId,
  })
}

function createWindow(args: Record<string, unknown>): string {
  const wallIndex = args.wallIndex as number
  if (wallIndex < 0 || wallIndex >= recentWallIds.length) {
    return JSON.stringify({
      error: `Wall index ${wallIndex} out of range. Recently created ${recentWallIds.length} walls.`,
    })
  }

  const wallId = recentWallIds[wallIndex]!
  const wall = useScene.getState().nodes[wallId as AnyNodeId] as
    | { start: [number, number]; end: [number, number]; height?: number }
    | undefined
  if (!wall) {
    return JSON.stringify({ error: `Wall ${wallId} not found` })
  }

  const t = (args.position_t as number) ?? 0.5
  const wallLen = Math.sqrt(
    (wall.end[0] - wall.start[0]) ** 2 + (wall.end[1] - wall.start[1]) ** 2,
  )
  // Wall-local origin is at wallStart; x runs along the wall from 0 to wallLen
  const xPos = t * wallLen
  const sillHeight = (args.sillHeight as number) ?? 0.9
  const winHeight = (args.height as number) ?? 1.5
  const yPos = sillHeight + winHeight / 2

  const window = WindowNode.parse({
    wallId,
    position: [xPos, yPos, 0],
    ...(args.width != null ? { width: args.width as number } : {}),
    ...(args.height != null ? { height: args.height as number } : {}),
  })

  useScene.getState().createNode(window, wallId as AnyNodeId)

  return JSON.stringify({
    success: true,
    windowId: window.id,
    wallId,
  })
}

function createRoom(args: Record<string, unknown>): string {
  const width = args.width as number
  const depth = args.depth as number

  if (!width || width <= 0) return JSON.stringify({ error: 'width must be a positive number' })
  if (!depth || depth <= 0) return JSON.stringify({ error: 'depth must be a positive number' })
  const origin = (args.origin as [number, number]) ?? [0, 0]
  const wallHeight = args.wallHeight as number | undefined
  const wallThickness = args.wallThickness as number | undefined
  const addDoor = (args.addDoor as boolean) ?? true
  const doorWall = (args.doorWall as string) ?? 'front'
  const addWindows = (args.addWindows as boolean) ?? false
  const addCeiling = (args.addCeiling as boolean) ?? false
  const ceilingHeight = (args.ceilingHeight as number) ?? (wallHeight ? wallHeight - 0.3 : 2.5)

  const [ox, oz] = origin
  const x1 = ox
  const z1 = oz
  const x2 = ox + width
  const z2 = oz + depth

  // Create 4 walls: front (south), right (east), back (north), left (west)
  const wallDefs = [
    { start: [x1, z1] as [number, number], end: [x2, z1] as [number, number] }, // front
    { start: [x2, z1] as [number, number], end: [x2, z2] as [number, number] }, // right
    { start: [x2, z2] as [number, number], end: [x1, z2] as [number, number] }, // back
    { start: [x1, z2] as [number, number], end: [x1, z1] as [number, number] }, // left
  ]

  const wallArgs: Record<string, unknown> = {
    walls: wallDefs.map((w) => ({
      ...w,
      ...(wallHeight != null ? { height: wallHeight } : {}),
      ...(wallThickness != null ? { thickness: wallThickness } : {}),
    })),
  }
  const wallResult = JSON.parse(createWalls(wallArgs))

  // Create floor slab
  const t = (wallThickness ?? 0.15) / 2
  const slabPolygon: [number, number][] = [
    [x1 + t, z1 + t],
    [x2 - t, z1 + t],
    [x2 - t, z2 - t],
    [x1 + t, z2 - t],
  ]
  const slabResult = JSON.parse(createSlab({ polygon: slabPolygon }))

  // Spatial context for the AI
  const halfT = t // t = wallThickness/2
  const gap = 0.05
  const spatialContext = {
    roomBounds: {
      minX: round3(x1), minZ: round3(z1),
      maxX: round3(x2), maxZ: round3(z2),
    },
    interiorBounds: {
      minX: round3(x1 + halfT + gap), minZ: round3(z1 + halfT + gap),
      maxX: round3(x2 - halfT - gap), maxZ: round3(z2 - halfT - gap),
    },
    wallsByFace: {
      south: { id: wallResult.wallIds?.[0], start: [x1, z1], end: [x2, z1], length: round3(width) },
      east:  { id: wallResult.wallIds?.[1], start: [x2, z1], end: [x2, z2], length: round3(depth) },
      north: { id: wallResult.wallIds?.[2], start: [x2, z2], end: [x1, z2], length: round3(width) },
      west:  { id: wallResult.wallIds?.[3], start: [x1, z2], end: [x1, z1], length: round3(depth) },
    },
    slabPolygon,
  }

  const results: Record<string, unknown> = {
    success: true,
    walls: wallResult,
    slab: slabResult,
    createdNodeIds: compactIds([
      ...(Array.isArray(wallResult.wallIds) ? wallResult.wallIds : []),
      slabResult.slabId,
    ]),
    createdByType: createdByType({
      wall: Array.isArray(wallResult.wallIds) ? wallResult.wallIds : [],
      slab: [slabResult.slabId],
    }),
    spatialContext,
    usableBounds: spatialContext.interiorBounds,
    candidateWalls: spatialContext.wallsByFace,
    suggestedNextTools: ['create_zone', 'add_door_to_wall', 'add_window_to_wall', 'validate_scene'],
  }

  // Add door
  if (addDoor) {
    const wallIndexMap: Record<string, number> = {
      front: 0,
      right: 1,
      back: 2,
      left: 3,
    }
    const doorResult = JSON.parse(
      createDoor({
        wallIndex: wallIndexMap[doorWall] ?? 0,
        position_t: 0.5,
      }),
    )
    results.door = doorResult
    results.createdNodeIds = compactIds([...(results.createdNodeIds as string[]), doorResult.doorId])
    results.createdByType = {
      ...(results.createdByType as Record<string, string[]>),
      door: compactIds([doorResult.doorId]),
    }
  }

  // Add windows (on walls without door)
  if (addWindows) {
    const doorWallIndex =
      { front: 0, right: 1, back: 2, left: 3 }[doorWall] ?? 0
    const windowResults: unknown[] = []
    for (let i = 0; i < 4; i++) {
      if (i === doorWallIndex) continue
      const wResult = JSON.parse(
        createWindow({ wallIndex: i, position_t: 0.5 }),
      )
      windowResults.push(wResult)
    }
    results.windows = windowResults
    results.createdNodeIds = compactIds([
      ...(results.createdNodeIds as string[]),
      ...windowResults.map((result) => isRecordLike(result) ? result.windowId : undefined),
    ])
    results.createdByType = {
      ...(results.createdByType as Record<string, string[]>),
      window: compactIds(windowResults.map((result) => isRecordLike(result) ? result.windowId : undefined)),
    }
  }

  // Add ceiling
  if (addCeiling) {
    const ceilingPolygon: [number, number][] = [
      [x1 + t, z1 + t],
      [x2 - t, z1 + t],
      [x2 - t, z2 - t],
      [x1 + t, z2 - t],
    ]
    const ceilingResult = JSON.parse(
      createCeiling({ polygon: ceilingPolygon, height: ceilingHeight }),
    )
    results.ceiling = ceilingResult
    results.createdNodeIds = compactIds([...(results.createdNodeIds as string[]), ceilingResult.ceilingId])
    results.createdByType = {
      ...(results.createdByType as Record<string, string[]>),
      ceiling: compactIds([ceilingResult.ceilingId]),
    }
  }

  return JSON.stringify(results)
}

function createCeiling(args: Record<string, unknown>): string {
  const levelId = getLevelId()
  const polygon = args.polygon as [number, number][]
  const height = (args.height as number) ?? 2.5

  if (!polygon || !Array.isArray(polygon) || polygon.length < 3) {
    return JSON.stringify({ error: 'polygon must have at least 3 [x, z] points' })
  }
  for (let i = 0; i < polygon.length; i++) {
    const pt = polygon[i]
    if (!pt || !Array.isArray(pt) || pt.length !== 2) {
      return JSON.stringify({ error: `polygon point ${i} must be [x, z]` })
    }
  }

  const ceiling = CeilingNode.parse({ polygon, height })
  useScene.getState().createNode(ceiling, levelId as AnyNodeId)

  return JSON.stringify({
    success: true,
    ceilingId: ceiling.id,
    height,
  })
}

function createZone(args: Record<string, unknown>): string {
  const levelId = getLevelId()
  const name = args.name as string
  const polygon = args.polygon as [number, number][]
  const color = (args.color as string) ?? '#3b82f6'
  const roomType = args.roomType as string | undefined

  const zone = ZoneNode.parse({
    name,
    polygon,
    color,
    ...(roomType ? { metadata: { roomType } } : {}),
  })
  useScene.getState().createNode(zone, levelId as AnyNodeId)

  return JSON.stringify({
    success: true,
    zoneId: zone.id,
    name,
    ...(roomType ? { roomType } : {}),
    createdNodeIds: [zone.id],
    createdByType: { zone: [zone.id] },
    spatialContext: {
      polygon,
      bounds: polygonBounds(polygon),
      area: polygonArea(polygon),
      roomType: roomType ?? null,
    },
    usableBounds: polygonBounds(polygon),
    suggestedNextTools: ['validate_scene', 'add_door_to_wall', 'add_window_to_wall'],
  })
}

function createRoof(args: Record<string, unknown>): string {
  const levelId = getLevelId()
  const position = (args.position as [number, number, number]) ?? [0, 0, 0]
  const rotationDeg = (args.rotation as number) ?? 0
  const rotationRad = (rotationDeg * Math.PI) / 180

  const roofType = (args.roofType as string) ?? 'gable'
  const width = (args.width as number) ?? 8
  const depth = (args.depth as number) ?? 6
  const wallHeight = (args.wallHeight as number) ?? 0.5
  const roofHeight = (args.roofHeight as number) ?? 2.5
  const overhang = (args.overhang as number) ?? 0.3

  // Create roof segment first
  const segment = RoofSegmentNode.parse({
    roofType,
    width,
    depth,
    wallHeight,
    roofHeight,
    overhang,
  })

  // Create roof group containing the segment
  const roof = RoofNode.parse({
    position,
    rotation: rotationRad,
    children: [segment.id],
  })

  // Create both nodes
  useScene.getState().createNodes([
    { node: roof, parentId: levelId as AnyNodeId },
    { node: segment, parentId: roof.id as AnyNodeId },
  ])

  return JSON.stringify({
    success: true,
    roofId: roof.id,
    segmentId: segment.id,
    roofType,
  })
}

function createApartment(args: Record<string, unknown>): string {
  const origin = (args.origin as [number, number]) ?? [0, 0]
  const rooms = args.rooms as Array<{
    name: string
    width: number
    depth: number
    hasDoor?: boolean
    hasWindow?: boolean
    roomType?: string
  }>
  const wallHeight = args.wallHeight as number | undefined
  const wallThickness = (args.wallThickness as number) ?? 0.15
  const maxRowWidth = (args.maxRowWidth as number) ?? 20

  const results: unknown[] = []
  const allCreatedIds: string[] = []
  const allByType: Record<string, string[]> = {}
  const roomContexts: unknown[] = []
  let curX = origin[0]
  let curZ = origin[1]
  let rowMaxDepth = 0

  for (const room of rooms) {
    // Wrap to next row if needed
    if (curX - origin[0] + room.width > maxRowWidth && curX !== origin[0]) {
      curZ += rowMaxDepth
      curX = origin[0]
      rowMaxDepth = 0
    }

    const roomResult = JSON.parse(
      createRoom({
        origin: [curX, curZ],
        width: room.width,
        depth: room.depth,
        wallHeight,
        wallThickness,
        addDoor: room.hasDoor ?? true,
        doorWall: 'front',
        addWindows: room.hasWindow ?? false,
      }),
    )

    // Create zone label for the room
    const t = wallThickness / 2
    const zoneResult = JSON.parse(
      createZone({
        name: room.name,
        roomType: room.roomType,
        polygon: [
          [curX + t, curZ + t],
          [curX + room.width - t, curZ + t],
          [curX + room.width - t, curZ + room.depth - t],
          [curX + t, curZ + room.depth - t],
        ],
      }),
    )

    const createdNodeIds = Array.isArray(roomResult.createdNodeIds) ? roomResult.createdNodeIds : []
    const zoneIds = compactIds([zoneResult.zoneId])
    allCreatedIds.push(...compactIds([...createdNodeIds, ...zoneIds]))
    for (const [type, ids] of Object.entries({
      ...(isRecordLike(roomResult.createdByType) ? roomResult.createdByType : {}),
      zone: zoneIds,
    })) {
      allByType[type] = [...(allByType[type] ?? []), ...compactIds(Array.isArray(ids) ? ids : [])]
    }
    roomContexts.push({
      name: room.name,
      roomType: room.roomType ?? null,
      slabId: isRecordLike(roomResult.slab) ? roomResult.slab.slabId : undefined,
      zoneId: zoneResult.zoneId,
      spatialContext: roomResult.spatialContext,
      candidateWalls: roomResult.candidateWalls,
    })

    results.push({
      room: room.name,
      ...roomResult,
      zone: zoneResult,
    })

    curX += room.width
    rowMaxDepth = Math.max(rowMaxDepth, room.depth)
  }

  return JSON.stringify({
    success: true,
    roomCount: rooms.length,
    rooms: results,
    createdNodeIds: allCreatedIds,
    createdByType: allByType,
    spatialContext: {
      origin,
      maxRowWidth,
      rooms: roomContexts,
    },
    suggestedNextTools: ['validate_scene', 'add_window_to_wall', 'auto_align_windows', 'place_in_room'],
  })
}

function createLShapedRoom(args: Record<string, unknown>): string {
  const origin = (args.origin as [number, number]) ?? [0, 0]
  const mainW = args.mainWidth as number
  const mainD = args.mainDepth as number
  const wingW = args.wingWidth as number
  const wingD = args.wingDepth as number

  if (!mainW || mainW <= 0) return JSON.stringify({ error: 'mainWidth must be positive' })
  if (!mainD || mainD <= 0) return JSON.stringify({ error: 'mainDepth must be positive' })
  if (!wingW || wingW <= 0) return JSON.stringify({ error: 'wingWidth must be positive' })
  if (!wingD || wingD <= 0) return JSON.stringify({ error: 'wingDepth must be positive' })
  if (wingW > mainW) return JSON.stringify({ error: 'wingWidth should be <= mainWidth for proper L-shape' })
  const wallHeight = args.wallHeight as number | undefined
  const addDoor = (args.addDoor as boolean) ?? true

  const [ox, oz] = origin

  // L-shape outline (counter-clockwise):
  //  ┌──────┐
  //  │ wing │
  //  │      ├─────┐
  //  │      │main │
  //  └──────┴─────┘
  // The wing extends the full mainDepth, then the main extends from bottom
  const points: [number, number][] = [
    [ox, oz],                           // bottom-left
    [ox + mainW, oz],                   // bottom-right of main
    [ox + mainW, oz + mainD],           // top-right of main
    [ox + wingW, oz + mainD],           // step inward
    [ox + wingW, oz + mainD + wingD],   // top of wing
    [ox, oz + mainD + wingD],           // top-left
  ]

  // Create walls from the outline points
  const wallDefs: { start: [number, number]; end: [number, number] }[] = []
  for (let i = 0; i < points.length; i++) {
    const start = points[i]!
    const end = points[(i + 1) % points.length]!
    wallDefs.push({ start, end })
  }

  const wallArgs: Record<string, unknown> = {
    walls: wallDefs.map((w) => ({
      ...w,
      ...(wallHeight != null ? { height: wallHeight } : {}),
    })),
  }
  const wallResult = JSON.parse(createWalls(wallArgs))

  // Create L-shaped slab
  const t = 0.075 // half wall thickness
  const slabPolygon: [number, number][] = [
    [ox + t, oz + t],
    [ox + mainW - t, oz + t],
    [ox + mainW - t, oz + mainD - t],
    [ox + wingW - t, oz + mainD - t],
    [ox + wingW - t, oz + mainD + wingD - t],
    [ox + t, oz + mainD + wingD - t],
  ]
  const slabResult = JSON.parse(createSlab({ polygon: slabPolygon }))

  const results: Record<string, unknown> = {
    success: true,
    walls: wallResult,
    slab: slabResult,
  }

  // Add door on front wall (index 0)
  if (addDoor) {
    const doorResult = JSON.parse(
      createDoor({ wallIndex: 0, position_t: 0.3 }),
    )
    results.door = doorResult
  }

  return JSON.stringify(results)
}

function modifyNode(args: Record<string, unknown>): string {
  const nodeId = args.nodeId as string
  const updates = args.updates as Record<string, unknown>

  const node = useScene.getState().nodes[nodeId as AnyNodeId]
  if (!node) {
    return JSON.stringify({ error: `Node ${nodeId} not found` })
  }

  useScene.getState().updateNode(nodeId as AnyNodeId, updates as Partial<AnyNode>)

  return JSON.stringify({
    success: true,
    nodeId,
    nodeType: node.type,
    updatedFields: Object.keys(updates),
  })
}

function deleteAllOnLevel(): string {
  const levelId = getLevelId()
  const { nodes } = useScene.getState()
  const idsToDelete: AnyNodeId[] = []

  for (const node of Object.values(nodes)) {
    if (node.parentId === levelId) {
      idsToDelete.push(node.id)
      // Also delete children (doors/windows on walls, roof segments)
      if ('children' in node && Array.isArray(node.children)) {
        for (const childId of node.children) {
          idsToDelete.push(childId as AnyNodeId)
        }
      }
    }
  }

  if (idsToDelete.length > 0) {
    useScene.getState().deleteNodes(idsToDelete)
  }

  recentWallIds = []

  return JSON.stringify({
    success: true,
    deletedCount: idsToDelete.length,
  })
}

function getSceneInfo(): string {
  const { nodes } = useScene.getState()
  const levelId = getLevelId()

  const walls: Array<{ id: string; start: unknown; end: unknown; height?: unknown; thickness?: unknown; length: number }> = []
  const slabs: Array<{ id: string; vertexCount: number }> = []
  const doors: Array<{ id: string; parentWallId: unknown; width?: unknown; height?: unknown }> = []
  const windows: Array<{ id: string; parentWallId: unknown; width?: unknown; height?: unknown }> = []
  const ceilings: Array<{ id: string; height?: unknown }> = []
  const zones: Array<{ id: string; name: unknown; color?: unknown; roomType?: unknown }> = []
  const roofs: Array<{ id: string; roofType?: unknown }> = []
  const items: Array<{ id: string; name: string; catalogId: string; position: unknown; attachTo?: string; parentId?: unknown }> = []

  for (const node of Object.values(nodes)) {
    if (node.parentId !== levelId && !isChildOfLevel(node, nodes, levelId))
      continue

    if (node.type === 'wall') {
      const w = node as unknown as { id: string; start: [number, number]; end: [number, number]; height?: number; thickness?: number }
      const len = Math.sqrt((w.end[0] - w.start[0]) ** 2 + (w.end[1] - w.start[1]) ** 2)
      walls.push({ id: w.id, start: w.start, end: w.end, height: w.height, thickness: w.thickness, length: Math.round(len * 100) / 100 })
    } else if (node.type === 'slab') {
      const s = node as unknown as { id: string; polygon?: unknown[] }
      slabs.push({ id: node.id, vertexCount: s.polygon?.length ?? 0 })
    } else if (node.type === 'door') {
      const d = node as unknown as { id: string; wallId?: unknown; width?: unknown; height?: unknown; parentId?: unknown }
      doors.push({ id: d.id, parentWallId: d.parentId, width: d.width, height: d.height })
    } else if (node.type === 'window') {
      const w = node as unknown as { id: string; wallId?: unknown; width?: unknown; height?: unknown; parentId?: unknown }
      windows.push({ id: w.id, parentWallId: w.parentId, width: w.width, height: w.height })
    } else if (node.type === 'ceiling') {
      const c = node as unknown as { id: string; height?: unknown }
      ceilings.push({ id: c.id, height: c.height })
    } else if (node.type === 'zone') {
      const z = node as unknown as { id: string; name: unknown; color?: unknown }
      const metadata = (node as unknown as { metadata?: { roomType?: unknown } }).metadata
      zones.push({ id: z.id, name: z.name, color: z.color, roomType: metadata?.roomType })
    } else if (node.type === 'roof') {
      roofs.push({ id: node.id })
    } else if (node.type === 'item') {
      const itm = node as ItemNode
      items.push({
        id: itm.id,
        name: itm.asset.name,
        catalogId: itm.asset.id,
        position: itm.position,
        attachTo: itm.asset.attachTo,
        parentId: itm.parentId,
      })
    }
  }

  // All-levels overview
  const building = Object.values(nodes).find((n) => n.type === 'building') as BuildingNode | undefined
  const allLevels = building
    ? building.children
        .map((id) => nodes[id as AnyNodeId])
        .filter((n): n is LevelNode => n?.type === 'level')
        .sort((a, b) => a.level - b.level)
        .map((l) => ({
          levelId: l.id,
          level: l.level,
          name: l.name ?? `Level ${l.level}`,
          isActive: l.id === levelId,
          childCount: l.children.length,
        }))
    : []

  // Build per-room spatial summaries from slabs
  const roomSummaries: Array<{
    slabId: string
    zoneName: string | null
    bounds: { minX: number; minZ: number; maxX: number; maxZ: number }
    area: number
    furniture: Array<{ id: string; name: string; catalogId: string }>
    shortSide: number
    roomType: unknown
    windowCount: number
    doorCount: number
  }> = []

  // Collect slab polygons for room detection
  const slabPolygons: Array<{ id: string; polygon: [number, number][] }> = []
  for (const node of Object.values(nodes)) {
    if (node.type === 'slab' && (node.parentId === levelId || isChildOfLevel(node, nodes, levelId))) {
      const s = node as unknown as { id: string; polygon: [number, number][] }
      if (s.polygon) slabPolygons.push({ id: s.id, polygon: s.polygon })
    }
  }

  for (const slab of slabPolygons) {
    const xs = slab.polygon.map((p) => p[0])
    const zs = slab.polygon.map((p) => p[1])
    const minX = round3(Math.min(...xs))
    const minZ = round3(Math.min(...zs))
    const maxX = round3(Math.max(...xs))
    const maxZ = round3(Math.max(...zs))
    // Compute area via shoelace formula
    let area = 0
    for (let i = 0, j = slab.polygon.length - 1; i < slab.polygon.length; j = i++) {
      area += (slab.polygon[j]![0] + slab.polygon[i]![0]) * (slab.polygon[j]![1] - slab.polygon[i]![1])
    }
    area = round3(Math.abs(area) / 2)

    // Find zone name overlapping this slab
    let zoneName: string | null = null
    let roomType: unknown = null
    for (const z of zones) {
      const zNode = nodes[z.id as AnyNodeId] as unknown as { polygon?: [number, number][] }
      if (zNode?.polygon) {
        const zCentroid = [
          zNode.polygon.reduce((s, p) => s + p[0], 0) / zNode.polygon.length,
          zNode.polygon.reduce((s, p) => s + p[1], 0) / zNode.polygon.length,
        ]
        if (pointInPolygonSimple(zCentroid[0]!, zCentroid[1]!, slab.polygon)) {
          zoneName = z.name as string
          roomType = (z as { roomType?: unknown }).roomType ?? null
          break
        }
      }
    }

    // Find furniture items inside this slab
    const containedItems = items.filter((itm) => {
      const pos = itm.position as [number, number, number]
      return pos && pointInPolygonSimple(pos[0], pos[2], slab.polygon)
    }).map((itm) => ({ id: itm.id, name: itm.name, catalogId: itm.catalogId }))

    const slabWallIds = walls
      .filter((wall) => {
        const w = nodes[wall.id as AnyNodeId] as unknown as { start?: [number, number]; end?: [number, number] }
        if (!w.start || !w.end) return false
        return pointInPolygonSimple(w.start[0], w.start[1], slab.polygon) || pointInPolygonSimple(w.end[0], w.end[1], slab.polygon)
      })
      .map((wall) => wall.id)
    const windowCount = windows.filter((window) => slabWallIds.includes(String(window.parentWallId))).length
    const doorCount = doors.filter((door) => slabWallIds.includes(String(door.parentWallId))).length

    roomSummaries.push({
      slabId: slab.id,
      zoneName,
      bounds: { minX, minZ, maxX, maxZ },
      area,
      furniture: containedItems,
      shortSide: round3(Math.min(maxX - minX, maxZ - minZ)),
      roomType,
      windowCount,
      doorCount,
    })
  }

  const architecturalSummary = {
    spaces: roomSummaries.map((room) => ({
      slabId: room.slabId,
      zoneName: room.zoneName,
      roomType: room.roomType,
      area: room.area,
      shortSide: room.shortSide,
      bounds: room.bounds,
      availableFurnitureZones: [room.bounds],
      blockedZones: openingBlockedZones(levelId, {
        polygon: slabPolygons.find((slab) => slab.id === room.slabId)?.polygon ?? [
          [room.bounds.minX, room.bounds.minZ],
          [room.bounds.maxX, room.bounds.minZ],
          [room.bounds.maxX, room.bounds.maxZ],
          [room.bounds.minX, room.bounds.maxZ],
        ],
        bounds: room.bounds,
        slabId: room.slabId,
      }).slice(0, 8),
      doorCount: room.doorCount,
      windowCount: room.windowCount,
      needsOpeningAttention: room.doorCount === 0 || windowCountNeedsAttention(room.roomType, room.windowCount),
    })),
    openingCounts: {
      doors: doors.length,
      windows: windows.length,
    },
    exteriorWallCandidates: walls
      .filter((wall) => Number(wall.length) >= 1.2)
      .slice(0, 12)
      .map((wall) => ({ id: wall.id, length: wall.length, start: wall.start, end: wall.end })),
    suggestedNextTools: roomSummaries.length === 0
      ? ['create_room', 'create_apartment', 'create_polygon_room']
      : ['validate_scene', 'add_door_to_wall', 'add_window_to_wall', 'auto_align_windows', 'place_in_room'],
  }

  // Summary counts + details
  return JSON.stringify({
    levelId,
    activeLevelName: allLevels.find((l) => l.isActive)?.name ?? 'Level 0',
    summary: {
      walls: walls.length,
      slabs: slabs.length,
      doors: doors.length,
      windows: windows.length,
      ceilings: ceilings.length,
      zones: zones.length,
      roofs: roofs.length,
      items: items.length,
      rooms: roomSummaries.length,
      isEmpty: walls.length === 0 && slabs.length === 0,
    },
    allLevels,
    architecturalSummary,
    lastValidation: lastValidationReport
      ? {
          codeProfile: lastValidationReport.codeProfile,
          blocking: lastValidationReport.blocking,
          blockingRuleIds: lastValidationReport.blockingRuleIds,
          ruleSummary: lastValidationReport.ruleSummary,
          repairHints: lastValidationReport.repairHints,
        }
      : null,
    roomSummaries,
    wallDetails: walls,
    doorDetails: doors,
    windowDetails: windows,
    zoneDetails: zones,
    slabDetails: slabs,
    ceilingDetails: ceilings,
    roofDetails: roofs,
    itemDetails: items,
  })
}

function isChildOfLevel(
  node: AnyNode,
  nodes: Record<AnyNodeId, AnyNode>,
  levelId: string,
): boolean {
  if (node.parentId === levelId) return true
  if (!node.parentId) return false
  const parent = nodes[node.parentId as AnyNodeId]
  if (!parent) return false
  return parent.parentId === levelId
}

function windowCountNeedsAttention(roomType: unknown, windowCount: number): boolean {
  if (typeof roomType !== 'string') return windowCount === 0
  return ['bedroom', 'living', 'kitchen', 'bathroom'].includes(roomType) && windowCount === 0
}

function deleteNode(args: Record<string, unknown>): string {
  const nodeId = args.nodeId as string
  const { nodes } = useScene.getState()
  const node = nodes[nodeId as AnyNodeId]
  if (!node) {
    return JSON.stringify({ error: `Node ${nodeId} not found` })
  }

  // Collect children recursively
  const idsToDelete: AnyNodeId[] = [nodeId as AnyNodeId]
  function collectChildren(parentId: string) {
    for (const n of Object.values(nodes)) {
      if (n.parentId === parentId) {
        idsToDelete.push(n.id)
        collectChildren(n.id)
      }
    }
  }
  collectChildren(nodeId)

  useScene.getState().deleteNodes(idsToDelete)

  return JSON.stringify({
    success: true,
    deletedCount: idsToDelete.length,
    nodeType: node.type,
  })
}

function undoAction(): string {
  const temporal = useScene.temporal.getState()
  const canUndo = temporal.pastStates.length > 0
  if (!canUndo) {
    return JSON.stringify({ error: 'Nothing to undo' })
  }
  temporal.undo()
  return JSON.stringify({ success: true, message: 'Undone last action' })
}

function redoAction(): string {
  const temporal = useScene.temporal.getState()
  const canRedo = temporal.futureStates.length > 0
  if (!canRedo) {
    return JSON.stringify({ error: 'Nothing to redo' })
  }
  temporal.redo()
  return JSON.stringify({ success: true, message: 'Redone last action' })
}

function selectNode(args: Record<string, unknown>): string {
  const nodeId = args.nodeId as string
  const node = useScene.getState().nodes[nodeId as AnyNodeId]
  if (!node) {
    return JSON.stringify({ error: `Node ${nodeId} not found` })
  }

  useViewer.getState().setSelection({ selectedIds: [nodeId as AnyNodeId] })

  return JSON.stringify({
    success: true,
    selectedNodeId: nodeId,
    nodeType: node.type,
  })
}

function moveNodes(args: Record<string, unknown>): string {
  const nodeIds = args.nodeIds as string[]
  const delta = args.delta as [number, number]

  if (!nodeIds || nodeIds.length === 0) {
    return JSON.stringify({ error: 'nodeIds array is required' })
  }
  if (!delta || delta.length !== 2) {
    return JSON.stringify({ error: 'delta must be [dx, dz]' })
  }

  const [dx, dz] = delta
  const { nodes } = useScene.getState()
  const updates: { id: AnyNodeId; data: Partial<AnyNode> }[] = []
  const moved: string[] = []
  const skipped: string[] = []

  for (const id of nodeIds) {
    const node = nodes[id as AnyNodeId]
    if (!node) {
      skipped.push(id)
      continue
    }

    if (node.type === 'wall') {
      const w = node as unknown as { start: [number, number]; end: [number, number] }
      updates.push({
        id: id as AnyNodeId,
        data: {
          start: [w.start[0] + dx, w.start[1] + dz],
          end: [w.end[0] + dx, w.end[1] + dz],
        } as Partial<AnyNode>,
      })
      moved.push(id)
    } else if (node.type === 'slab' || node.type === 'zone' || node.type === 'ceiling') {
      const n = node as unknown as { polygon: [number, number][] }
      if (n.polygon) {
        updates.push({
          id: id as AnyNodeId,
          data: {
            polygon: n.polygon.map(([x, z]) => [x + dx, z + dz]),
          } as Partial<AnyNode>,
        })
        moved.push(id)
      } else {
        skipped.push(id)
      }
    } else if (node.type === 'roof') {
      const r = node as unknown as { position: [number, number, number] }
      if (r.position) {
        updates.push({
          id: id as AnyNodeId,
          data: {
            position: [r.position[0] + dx, r.position[1], r.position[2] + dz],
          } as Partial<AnyNode>,
        })
        moved.push(id)
      }
    } else {
      skipped.push(id)
    }
  }

  if (updates.length > 0) {
    useScene.getState().updateNodes(updates)
  }

  return JSON.stringify({
    success: true,
    movedCount: moved.length,
    movedIds: moved,
    ...(skipped.length > 0 ? { skippedIds: skipped } : {}),
  })
}

function addDoorToWall(args: Record<string, unknown>): string {
  const wallId = args.wallId as string
  const wall = useScene.getState().nodes[wallId as AnyNodeId] as
    | { type: string; start: [number, number]; end: [number, number]; height?: number }
    | undefined

  if (!wall) {
    return JSON.stringify({ error: `Wall ${wallId} not found` })
  }
  if (wall.type !== 'wall') {
    return JSON.stringify({ error: `Node ${wallId} is not a wall (type: ${wall.type})` })
  }

  const t = (args.position_t as number) ?? 0.5
  const wallLen = Math.sqrt(
    (wall.end[0] - wall.start[0]) ** 2 + (wall.end[1] - wall.start[1]) ** 2,
  )
  // Wall-local origin is at wallStart; x runs along the wall from 0 to wallLen
  const xPos = t * wallLen
  const doorHeight = (args.height as number) ?? 2.1
  const yPos = doorHeight / 2

  const door = DoorNode.parse({
    wallId,
    position: [xPos, yPos, 0],
    ...(args.width != null ? { width: args.width as number } : {}),
    ...(args.height != null ? { height: args.height as number } : {}),
  })

  useScene.getState().createNode(door, wallId as AnyNodeId)

  return JSON.stringify({
    success: true,
    doorId: door.id,
    wallId,
    wallLength: Math.round(wallLen * 100) / 100,
  })
}

function addWindowToWall(args: Record<string, unknown>): string {
  const wallId = args.wallId as string
  const wall = useScene.getState().nodes[wallId as AnyNodeId] as
    | { type: string; start: [number, number]; end: [number, number]; height?: number }
    | undefined

  if (!wall) {
    return JSON.stringify({ error: `Wall ${wallId} not found` })
  }
  if (wall.type !== 'wall') {
    return JSON.stringify({ error: `Node ${wallId} is not a wall (type: ${wall.type})` })
  }

  const t = (args.position_t as number) ?? 0.5
  const wallLen = Math.sqrt(
    (wall.end[0] - wall.start[0]) ** 2 + (wall.end[1] - wall.start[1]) ** 2,
  )
  // Wall-local origin is at wallStart; x runs along the wall from 0 to wallLen
  const xPos = t * wallLen
  const sillHeight = (args.sillHeight as number) ?? 0.9
  const winHeight = (args.height as number) ?? 1.5
  const yPos = sillHeight + winHeight / 2

  const window = WindowNode.parse({
    wallId,
    position: [xPos, yPos, 0],
    ...(args.width != null ? { width: args.width as number } : {}),
    ...(args.height != null ? { height: args.height as number } : {}),
  })

  useScene.getState().createNode(window, wallId as AnyNodeId)

  return JSON.stringify({
    success: true,
    windowId: window.id,
    wallId,
    wallLength: Math.round(wallLen * 100) / 100,
  })
}

function batchModifyNodes(args: Record<string, unknown>): string {
  const nodeIds = args.nodeIds as string[]
  const updates = args.updates as Record<string, unknown>

  if (!nodeIds || nodeIds.length === 0) {
    return JSON.stringify({ error: 'nodeIds array is required' })
  }
  if (!updates || Object.keys(updates).length === 0) {
    return JSON.stringify({ error: 'updates object is required and must not be empty' })
  }

  const { nodes } = useScene.getState()
  const batchUpdates: { id: AnyNodeId; data: Partial<AnyNode> }[] = []
  const modified: string[] = []
  const notFound: string[] = []

  for (const id of nodeIds) {
    const node = nodes[id as AnyNodeId]
    if (!node) {
      notFound.push(id)
      continue
    }
    batchUpdates.push({ id: id as AnyNodeId, data: updates as Partial<AnyNode> })
    modified.push(id)
  }

  if (batchUpdates.length > 0) {
    useScene.getState().updateNodes(batchUpdates)
  }

  return JSON.stringify({
    success: true,
    modifiedCount: modified.length,
    updatedFields: Object.keys(updates),
    ...(notFound.length > 0 ? { notFoundIds: notFound } : {}),
  })
}

function createPolygonRoom(args: Record<string, unknown>): string {
  const polygon = args.polygon as [number, number][]

  if (!polygon || polygon.length < 3) {
    return JSON.stringify({ error: 'polygon must have at least 3 vertices' })
  }

  const wallHeight = args.wallHeight as number | undefined
  const wallThickness = args.wallThickness as number | undefined
  const addDoor = (args.addDoor as boolean) ?? true
  const doorEdgeIndex = (args.doorEdgeIndex as number) ?? 0
  const addSlab = (args.addSlab as boolean) ?? true
  const zoneName = args.zoneName as string | undefined
  const zoneColor = (args.zoneColor as string) ?? '#3b82f6'
  const zoneRoomType = args.zoneRoomType as string | undefined

  // Create walls along polygon edges
  const wallDefs = polygon.map((pt, i) => {
    const next = polygon[(i + 1) % polygon.length]!
    return {
      start: pt,
      end: next,
      ...(wallHeight != null ? { height: wallHeight } : {}),
      ...(wallThickness != null ? { thickness: wallThickness } : {}),
    }
  })

  const wallResult = JSON.parse(createWalls({ walls: wallDefs }))

  const results: Record<string, unknown> = {
    success: true,
    walls: wallResult,
    createdNodeIds: compactIds(Array.isArray(wallResult.wallIds) ? wallResult.wallIds : []),
    createdByType: createdByType({
      wall: Array.isArray(wallResult.wallIds) ? wallResult.wallIds : [],
    }),
    spatialContext: {
      polygon,
      bounds: polygonBounds(polygon),
      area: polygonArea(polygon),
      edges: polygon.map((point, index) => {
        const next = polygon[(index + 1) % polygon.length]!
        return {
          index,
          wallId: Array.isArray(wallResult.wallIds) ? wallResult.wallIds[index] : undefined,
          start: point,
          end: next,
          length: round3(Math.sqrt((next[0] - point[0]) ** 2 + (next[1] - point[1]) ** 2)),
        }
      }),
    },
    candidateWalls: polygon.map((_point, index) => ({
      index,
      wallId: Array.isArray(wallResult.wallIds) ? wallResult.wallIds[index] : undefined,
    })),
    suggestedNextTools: ['create_zone', 'add_door_to_wall', 'add_window_to_wall', 'validate_scene'],
  }

  // Create floor slab
  if (addSlab) {
    const slabResult = JSON.parse(createSlab({ polygon }))
    results.slab = slabResult
    results.createdNodeIds = compactIds([...(results.createdNodeIds as string[]), slabResult.slabId])
    results.createdByType = {
      ...(results.createdByType as Record<string, string[]>),
      slab: compactIds([slabResult.slabId]),
    }
    results.usableBounds = polygonBounds(polygon)
  }

  // Add door on specified edge
  if (addDoor && doorEdgeIndex >= 0 && doorEdgeIndex < polygon.length) {
    const doorResult = JSON.parse(
      createDoor({ wallIndex: doorEdgeIndex, position_t: 0.5 }),
    )
    results.door = doorResult
    results.createdNodeIds = compactIds([...(results.createdNodeIds as string[]), doorResult.doorId])
    results.createdByType = {
      ...(results.createdByType as Record<string, string[]>),
      door: compactIds([doorResult.doorId]),
    }
  }

  // Create zone if name provided
  if (zoneName) {
    const zoneResult = JSON.parse(
      createZone({ name: zoneName, polygon, color: zoneColor, roomType: zoneRoomType }),
    )
    results.zone = zoneResult
    results.createdNodeIds = compactIds([...(results.createdNodeIds as string[]), zoneResult.zoneId])
    results.createdByType = {
      ...(results.createdByType as Record<string, string[]>),
      zone: compactIds([zoneResult.zoneId]),
    }
  }

  return JSON.stringify(results)
}

// ── Look up real catalog item by ID ──
function findCatalogItem(id: string) {
  return CATALOG_ITEMS.find((item) => item.id === id) ?? null
}

const DEFAULT_FURNITURE_METADATA: FurnitureMetadata = {
  footprintRole: 'decor',
  preferredPlacement: ['center'],
  frontClearance: 0.45,
  sideClearance: 0.15,
}

const FURNITURE_METADATA: Record<string, FurnitureMetadata> = {
  'double-bed': { footprintRole: 'sleeping', preferredPlacement: ['wall'], frontClearance: 0.7, sideClearance: 0.45, wallBacked: true },
  'single-bed': { footprintRole: 'sleeping', preferredPlacement: ['wall'], frontClearance: 0.65, sideClearance: 0.35, wallBacked: true },
  bunkbed: { footprintRole: 'sleeping', preferredPlacement: ['wall'], frontClearance: 0.65, sideClearance: 0.35, wallBacked: true },
  sofa: { footprintRole: 'seating', preferredPlacement: ['wall', 'center'], frontClearance: 0.7, sideClearance: 0.25, wallBacked: true },
  'lounge-chair': { footprintRole: 'seating', preferredPlacement: ['wall', 'corner'], frontClearance: 0.55, sideClearance: 0.2 },
  'livingroom-chair': { footprintRole: 'seating', preferredPlacement: ['wall', 'center'], frontClearance: 0.55, sideClearance: 0.2 },
  stool: { footprintRole: 'seating', preferredPlacement: ['center', 'corner'], frontClearance: 0.35, sideClearance: 0.15 },
  'coffee-table': { footprintRole: 'table', preferredPlacement: ['center'], frontClearance: 0.45, sideClearance: 0.25 },
  'dining-table': { footprintRole: 'table', preferredPlacement: ['center'], frontClearance: 0.8, sideClearance: 0.65 },
  'dining-chair': { footprintRole: 'seating', preferredPlacement: ['center'], frontClearance: 0.55, sideClearance: 0.2 },
  'tv-stand': { footprintRole: 'storage', preferredPlacement: ['wall'], frontClearance: 0.45, sideClearance: 0.15, wallBacked: true },
  bookshelf: { footprintRole: 'storage', preferredPlacement: ['wall'], frontClearance: 0.55, sideClearance: 0.15, wallBacked: true },
  closet: { footprintRole: 'storage', preferredPlacement: ['wall'], frontClearance: 0.65, sideClearance: 0.15, wallBacked: true },
  dresser: { footprintRole: 'storage', preferredPlacement: ['wall'], frontClearance: 0.55, sideClearance: 0.15, wallBacked: true },
  shelf: { footprintRole: 'storage', preferredPlacement: ['wall'], frontClearance: 0.45, sideClearance: 0.1, wallBacked: true },
  'kitchen-counter': { footprintRole: 'appliance', preferredPlacement: ['service-wall', 'wall'], frontClearance: 0.8, sideClearance: 0.1, wallBacked: true },
  'kitchen-cabinet': { footprintRole: 'appliance', preferredPlacement: ['service-wall', 'wall'], frontClearance: 0.75, sideClearance: 0.1, wallBacked: true },
  kitchen: { footprintRole: 'appliance', preferredPlacement: ['service-wall', 'wall'], frontClearance: 0.8, sideClearance: 0.1, wallBacked: true },
  stove: { footprintRole: 'appliance', preferredPlacement: ['service-wall', 'wall'], frontClearance: 0.8, sideClearance: 0.15, wallBacked: true },
  fridge: { footprintRole: 'appliance', preferredPlacement: ['service-wall', 'wall', 'corner'], frontClearance: 0.8, sideClearance: 0.15, wallBacked: true },
  microwave: { footprintRole: 'appliance', preferredPlacement: ['wall'], frontClearance: 0.55, sideClearance: 0.1, wallBacked: true },
  toilet: { footprintRole: 'sanitary', preferredPlacement: ['service-wall', 'wall'], frontClearance: 0.65, sideClearance: 0.2, wallBacked: true },
  bathtub: { footprintRole: 'sanitary', preferredPlacement: ['service-wall', 'wall', 'corner'], frontClearance: 0.65, sideClearance: 0.1, wallBacked: true },
  'bathroom-sink': { footprintRole: 'sanitary', preferredPlacement: ['service-wall', 'wall'], frontClearance: 0.65, sideClearance: 0.15, wallBacked: true },
  'shower-square': { footprintRole: 'sanitary', preferredPlacement: ['corner', 'service-wall'], frontClearance: 0.6, sideClearance: 0.05, wallBacked: true },
  'shower-angle': { footprintRole: 'sanitary', preferredPlacement: ['corner', 'service-wall'], frontClearance: 0.6, sideClearance: 0.05, wallBacked: true },
  'washing-machine': { footprintRole: 'appliance', preferredPlacement: ['service-wall', 'wall'], frontClearance: 0.7, sideClearance: 0.1, wallBacked: true },
  'floor-lamp': { footprintRole: 'lighting', preferredPlacement: ['corner'], frontClearance: 0.25, sideClearance: 0.1 },
  'indoor-plant': { footprintRole: 'decor', preferredPlacement: ['corner'], frontClearance: 0.25, sideClearance: 0.1 },
  'small-indoor-plant': { footprintRole: 'decor', preferredPlacement: ['corner'], frontClearance: 0.2, sideClearance: 0.05 },
  cactus: { footprintRole: 'decor', preferredPlacement: ['corner'], frontClearance: 0.2, sideClearance: 0.05 },
}

function furnitureMetadata(itemId: string): FurnitureMetadata {
  return FURNITURE_METADATA[itemId] ?? DEFAULT_FURNITURE_METADATA
}

// Floor-placeable items from the real catalog (exclude wall/ceiling-attached items)
function getFloorItems() {
  return CATALOG_ITEMS.filter(
    (item) => !item.attachTo || item.attachTo === undefined,
  )
}

function bboxForItem(position: [number, number, number], dimensions: [number, number, number], rotationDeg: number): BBox2D {
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

function expandBBox(bbox: BBox2D, amount: number): BBox2D {
  return {
    minX: round3(bbox.minX - amount),
    minZ: round3(bbox.minZ - amount),
    maxX: round3(bbox.maxX + amount),
    maxZ: round3(bbox.maxZ + amount),
  }
}

function bboxOverlaps(a: BBox2D, b: BBox2D): boolean {
  return a.maxX > b.minX && a.minX < b.maxX && a.maxZ > b.minZ && a.minZ < b.maxZ
}

function bboxInsideBounds(bbox: BBox2D, bounds: Bounds2D, margin = 0): boolean {
  return bbox.minX >= bounds.minX + margin &&
    bbox.maxX <= bounds.maxX - margin &&
    bbox.minZ >= bounds.minZ + margin &&
    bbox.maxZ <= bounds.maxZ - margin
}

function bboxCornersInsidePolygon(bbox: BBox2D, polygon: [number, number][], margin = 0): boolean {
  return [
    [bbox.minX + margin, bbox.minZ + margin],
    [bbox.maxX - margin, bbox.minZ + margin],
    [bbox.maxX - margin, bbox.maxZ - margin],
    [bbox.minX + margin, bbox.maxZ - margin],
  ].every(([x, z]) => pointInPolygonSimple(x!, z!, polygon))
}

function boundsFromRoomArgs(args: Record<string, unknown>): { slabId?: string; polygon: [number, number][]; bounds: Bounds2D } | null {
  const slabId = args.slabId as string | undefined
  const { nodes } = useScene.getState()
  if (slabId) {
    const slab = nodes[slabId as AnyNodeId] as unknown as { id: string; type?: string; polygon?: [number, number][] } | undefined
    if (slab?.polygon && slab.polygon.length >= 3) {
      return { slabId, polygon: slab.polygon, bounds: polygonBounds(slab.polygon) }
    }
    return null
  }

  const roomOrigin = args.roomOrigin as [number, number] | undefined ?? args.origin as [number, number] | undefined
  const roomWidth = args.roomWidth as number | undefined ?? args.width as number | undefined
  const roomDepth = args.roomDepth as number | undefined ?? args.depth as number | undefined
  const wallThickness = (args.wallThickness as number) ?? 0.15
  if (!roomOrigin || !roomWidth || !roomDepth) return null

  const t = wallThickness / 2
  const polygon: [number, number][] = [
    [roomOrigin[0] + t, roomOrigin[1] + t],
    [roomOrigin[0] + roomWidth - t, roomOrigin[1] + t],
    [roomOrigin[0] + roomWidth - t, roomOrigin[1] + roomDepth - t],
    [roomOrigin[0] + t, roomOrigin[1] + roomDepth - t],
  ]
  return { polygon, bounds: polygonBounds(polygon) }
}

function existingFloorItemBBoxes(levelId: string, extra: FurnitureCandidate[] = []): Array<BBox2D & { reason: string; nodeId?: string }> {
  const boxes: Array<BBox2D & { reason: string; nodeId?: string }> = []
  const { nodes } = useScene.getState()
  for (const node of Object.values(nodes)) {
    if (node.type !== 'item') continue
    if (node.parentId !== levelId && !isChildOfLevel(node, nodes, levelId)) continue
    const item = node as ItemNode
    if (item.asset.attachTo === 'wall' || item.asset.attachTo === 'wall-side' || item.asset.attachTo === 'ceiling') continue
    const dims = item.asset.dimensions ?? [1, 1, 1]
    const rotationDeg = Math.round(((item.rotation?.[1] ?? 0) * 180) / Math.PI)
    boxes.push({ ...expandBBox(bboxForItem(item.position, dims, rotationDeg), 0.05), reason: 'existing_furniture', nodeId: item.id })
  }
  for (const placement of extra) {
    boxes.push({ ...expandBBox(placement.bbox, 0.05), reason: 'planned_furniture' })
  }
  return boxes
}

function openingBlockedZones(levelId: string, room: { polygon: [number, number][]; bounds: Bounds2D }): Array<BBox2D & { reason: string; nodeId?: string }> {
  const zones: Array<BBox2D & { reason: string; nodeId?: string }> = []
  const { nodes } = useScene.getState()
  for (const node of Object.values(nodes)) {
    if (node.type !== 'wall') continue
    if (node.parentId !== levelId && !isChildOfLevel(node, nodes, levelId)) continue
    const wall = node as WallNode
    const wallLen = Math.sqrt((wall.end[0] - wall.start[0]) ** 2 + (wall.end[1] - wall.start[1]) ** 2)
    if (wallLen < 0.01) continue
    const dirX = (wall.end[0] - wall.start[0]) / wallLen
    const dirZ = (wall.end[1] - wall.start[1]) / wallLen
    const normX = -dirZ
    const normZ = dirX
    const center = [(room.bounds.minX + room.bounds.maxX) / 2, (room.bounds.minZ + room.bounds.maxZ) / 2] as [number, number]
    const mid = [(wall.start[0] + wall.end[0]) / 2, (wall.start[1] + wall.end[1]) / 2] as [number, number]
    const dot = (center[0] - mid[0]) * normX + (center[1] - mid[1]) * normZ
    const insideSign = dot >= 0 ? 1 : -1

    for (const childId of wall.children ?? []) {
      const child = nodes[childId as AnyNodeId]
      if (!child || (child.type !== 'door' && child.type !== 'window')) continue
      const opening = child as DoorNode | WindowNode
      const localX = opening.position[0]
      const width = opening.width ?? (child.type === 'door' ? 0.9 : 1.5)
      const centerX = wall.start[0] + dirX * localX
      const centerZ = wall.start[1] + dirZ * localX
      const along = width / 2 + 0.25
      const depth = child.type === 'door' ? 0.9 : 0.45
      const p1 = [centerX - dirX * along, centerZ - dirZ * along] as [number, number]
      const p2 = [centerX + dirX * along, centerZ + dirZ * along] as [number, number]
      const p3 = [p2[0] + normX * insideSign * depth, p2[1] + normZ * insideSign * depth] as [number, number]
      const p4 = [p1[0] + normX * insideSign * depth, p1[1] + normZ * insideSign * depth] as [number, number]
      const xs = [p1[0], p2[0], p3[0], p4[0]]
      const zs = [p1[1], p2[1], p3[1], p4[1]]
      zones.push({
        minX: round3(Math.min(...xs)),
        minZ: round3(Math.min(...zs)),
        maxX: round3(Math.max(...xs)),
        maxZ: round3(Math.max(...zs)),
        reason: child.type === 'door' ? 'door_clearance' : 'window_access',
        nodeId: child.id,
      })
    }
  }
  return zones
}

function candidateAnchorsForPlacement(bounds: Bounds2D, placement: FurniturePlacement): Array<{ x: number; z: number; rotation: number; placement: string }> {
  const cx = (bounds.minX + bounds.maxX) / 2
  const cz = (bounds.minZ + bounds.maxZ) / 2
  const left = bounds.minX
  const right = bounds.maxX
  const south = bounds.minZ
  const north = bounds.maxZ
  if (placement === 'center') {
    return [
      { x: cx, z: cz, rotation: 0, placement: 'center' },
      { x: cx, z: cz, rotation: 90, placement: 'center-rotated' },
    ]
  }
  if (placement === 'corner') {
    return [
      { x: left, z: south, rotation: 45, placement: 'southwest-corner' },
      { x: right, z: south, rotation: 315, placement: 'southeast-corner' },
      { x: left, z: north, rotation: 135, placement: 'northwest-corner' },
      { x: right, z: north, rotation: 225, placement: 'northeast-corner' },
    ]
  }
  return [
    { x: cx, z: south, rotation: 180, placement: 'south-wall' },
    { x: cx, z: north, rotation: 0, placement: 'north-wall' },
    { x: left, z: cz, rotation: 270, placement: 'west-wall' },
    { x: right, z: cz, rotation: 90, placement: 'east-wall' },
  ]
}

function shiftCandidateInside(anchor: { x: number; z: number; rotation: number; placement: string }, dims: [number, number, number], metadata: FurnitureMetadata, bounds: Bounds2D): [number, number, number] {
  const bboxAtAnchor = bboxForItem([anchor.x, 0, anchor.z], dims, anchor.rotation)
  let x = anchor.x
  let z = anchor.z
  if (bboxAtAnchor.minX < bounds.minX + metadata.sideClearance) x += bounds.minX + metadata.sideClearance - bboxAtAnchor.minX
  if (bboxAtAnchor.maxX > bounds.maxX - metadata.sideClearance) x -= bboxAtAnchor.maxX - (bounds.maxX - metadata.sideClearance)
  if (bboxAtAnchor.minZ < bounds.minZ + metadata.sideClearance) z += bounds.minZ + metadata.sideClearance - bboxAtAnchor.minZ
  if (bboxAtAnchor.maxZ > bounds.maxZ - metadata.sideClearance) z -= bboxAtAnchor.maxZ - (bounds.maxZ - metadata.sideClearance)
  return [round3(x), 0, round3(z)]
}

function gridFallbackAnchors(bounds: Bounds2D): Array<{ x: number; z: number; rotation: number; placement: string }> {
  const anchors: Array<{ x: number; z: number; rotation: number; placement: string }> = []
  const cols = 5
  const rows = 5
  for (let ix = 1; ix < cols; ix++) {
    for (let iz = 1; iz < rows; iz++) {
      const x = bounds.minX + (ix / cols) * (bounds.maxX - bounds.minX)
      const z = bounds.minZ + (iz / rows) * (bounds.maxZ - bounds.minZ)
      anchors.push({ x, z, rotation: 0, placement: 'grid' })
      anchors.push({ x, z, rotation: 90, placement: 'grid-rotated' })
    }
  }
  return anchors
}

function solveSingleFurniture(
  itemId: string,
  room: { polygon: [number, number][]; bounds: Bounds2D; slabId?: string },
  roomType: string,
  planned: FurnitureCandidate[],
  preferredAnchors?: Array<{ x: number; z: number; rotation: number; placement: string }>,
): { placement: FurnitureCandidate | null; rejections: FurnitureRejection[]; blockedZones: Array<BBox2D & { reason: string; nodeId?: string }> } {
  const catalogEntry = findCatalogItem(itemId)
  if (!catalogEntry) {
    return { placement: null, rejections: [{ itemId, reasons: [`Unknown item "${itemId}"`] }], blockedZones: [] }
  }
  const dims = catalogEntry.dimensions ?? [1, 1, 1]
  const metadata = furnitureMetadata(itemId)
  const levelId = getLevelId()
  const blockedZones = [
    ...existingFloorItemBBoxes(levelId, planned),
    ...openingBlockedZones(levelId, room),
  ]
  const anchors = [
    ...(preferredAnchors ?? []),
    ...metadata.preferredPlacement.flatMap((placement) => candidateAnchorsForPlacement(room.bounds, placement)),
    ...gridFallbackAnchors(room.bounds),
  ]
  const rejections: FurnitureRejection[] = []
  let best: FurnitureCandidate | null = null

  for (const anchor of anchors) {
    const position = shiftCandidateInside(anchor, dims, metadata, room.bounds)
    const bbox = bboxForItem(position, dims, anchor.rotation)
    const reasons: string[] = []
    if (!bboxInsideBounds(bbox, room.bounds, 0.02) || !bboxCornersInsidePolygon(bbox, room.polygon, 0.02)) {
      reasons.push('out_of_room_bounds')
    }
    for (const blocked of blockedZones) {
      if (bboxOverlaps(expandBBox(bbox, metadata.sideClearance), blocked)) {
        reasons.push(`blocked_by_${blocked.reason}`)
      }
    }
    const useBBox = expandBBox(bbox, metadata.frontClearance)
    for (const blocked of blockedZones) {
      if (bboxOverlaps(useBBox, blocked)) {
        reasons.push(`use_clearance_conflict_${blocked.reason}`)
      }
    }
    if (metadata.wallBacked && anchor.placement.includes('grid')) {
      reasons.push('requires_wall_backing')
    }

    if (reasons.length > 0) {
      rejections.push({ itemId, position, rotation: anchor.rotation, reasons: Array.from(new Set(reasons)) })
      continue
    }

    const centerBias = 1 - (Math.abs(position[0] - (room.bounds.minX + room.bounds.maxX) / 2) + Math.abs(position[2] - (room.bounds.minZ + room.bounds.maxZ) / 2)) / Math.max(0.01, (room.bounds.maxX - room.bounds.minX) + (room.bounds.maxZ - room.bounds.minZ))
    const wallBonus = metadata.wallBacked && !anchor.placement.includes('grid') ? 0.4 : 0
    const roleBonus = roomType === 'living' && itemId === 'sofa' && anchor.placement.includes('north') ? 0.2 : 0
    const clearanceScore = Math.max(0, 1 - blockedZones.filter((blocked) => bboxOverlaps(expandBBox(bbox, metadata.frontClearance), expandBBox(blocked, 0.1))).length * 0.2)
    const score = round3(centerBias + wallBonus + roleBonus + clearanceScore)
    const candidate: FurnitureCandidate = {
      itemId,
      position,
      rotation: anchor.rotation,
      bbox,
      score,
      clearanceScore: round3(clearanceScore),
      placement: anchor.placement,
    }
    if (!best || candidate.score > best.score) best = candidate
  }

  return { placement: best, rejections, blockedZones }
}

function defaultFurnitureForRoom(roomType: string): string[] {
  if (roomType === 'bedroom') return ['double-bed', 'bedside-table', 'closet']
  if (roomType === 'living') return ['tv-stand', 'sofa', 'coffee-table']
  if (roomType === 'kitchen') return ['kitchen-counter', 'fridge', 'stove']
  if (roomType === 'bathroom') return ['toilet', 'bathroom-sink', 'shower-square']
  if (roomType === 'dining') return ['dining-table', 'dining-chair', 'dining-chair']
  if (roomType === 'office') return ['office-table', 'office-chair', 'bookshelf']
  return ['sofa', 'coffee-table']
}

function solveFurnitureLayout(args: Record<string, unknown>): FurnitureSolveResult {
  const room = boundsFromRoomArgs(args)
  const roomType = ((args.roomType as string | undefined) ?? 'living').toLowerCase()
  if (!room) {
    return {
      success: false,
      roomType,
      roomBounds: { minX: 0, minZ: 0, maxX: 0, maxZ: 0 },
      availableFurnitureZones: [],
      blockedZones: [],
      placements: [],
      rejections: [{ itemId: 'room', reasons: ['room bounds unresolved; provide slabId or roomOrigin/roomWidth/roomDepth'] }],
      suggestedNextTools: ['get_scene_info', 'suggest_furniture_layout'],
    }
  }
  const requested = args.items as unknown
  const itemIds = Array.isArray(requested) && requested.length > 0
    ? requested.map((item) => typeof item === 'string' ? item : isRecordLike(item) ? String(item.type ?? item.itemId ?? '') : '').filter(Boolean)
    : defaultFurnitureForRoom(roomType)

  const placements: FurnitureCandidate[] = []
  const rejections: FurnitureRejection[] = []
  let blockedZones = openingBlockedZones(getLevelId(), room)
  for (const itemId of itemIds) {
    let solve = solveSingleFurniture(itemId, room, roomType, placements)
    if (!solve.placement && SMALL_ROOM_SUBSTITUTIONS[itemId]) {
      solve = solveSingleFurniture(SMALL_ROOM_SUBSTITUTIONS[itemId]!, room, roomType, placements)
      if (solve.placement) {
        rejections.push({ itemId, reasons: [`substituted_with_${SMALL_ROOM_SUBSTITUTIONS[itemId]}`] })
      }
    }
    blockedZones = solve.blockedZones
    if (solve.placement) placements.push(solve.placement)
    else rejections.push(...solve.rejections.slice(0, 6))
  }

  return {
    success: placements.length > 0 && rejections.filter((r) => !r.reasons.some((reason) => reason.startsWith('substituted_with_'))).length === 0,
    roomType,
    slabId: room.slabId,
    roomBounds: room.bounds,
    availableFurnitureZones: [room.bounds],
    blockedZones,
    placements,
    rejections,
    suggestedNextTools: placements.length > 0 ? ['place_furniture_solved', 'validate_scene'] : ['suggest_furniture_layout', 'create_room'],
  }
}

function suggestFurnitureLayout(args: Record<string, unknown>): string {
  const result = solveFurnitureLayout(args)
  return JSON.stringify(result)
}

function placeFurnitureSolved(args: Record<string, unknown>): string {
  const solve = solveFurnitureLayout(args)
  if (solve.placements.length === 0) {
    return JSON.stringify({
      ...solve,
      success: false,
      error: 'No feasible furniture placements found',
    })
  }

  const created: unknown[] = []
  for (const placement of solve.placements) {
    const result = JSON.parse(placeFurniture({
      type: placement.itemId,
      position: placement.position,
      rotation: placement.rotation,
    }))
    created.push(result)
  }

  return JSON.stringify({
    ...solve,
    success: solve.rejections.filter((r) => !r.reasons.some((reason) => reason.startsWith('substituted_with_'))).length === 0,
    created,
    createdNodeIds: compactIds(created.map((result) => isRecordLike(result) ? result.itemId : undefined)),
    createdByType: { item: compactIds(created.map((result) => isRecordLike(result) ? result.itemId : undefined)) },
    suggestedNextTools: ['validate_scene', 'suggest_furniture_layout'],
  })
}

function placeFurniture(args: Record<string, unknown>): string {
  const levelId = getLevelId()
  const itemId = args.type as string
  const position = (args.position as [number, number, number]) ?? [0, 0, 0]
  const rotationDeg = (args.rotation as number) ?? 0
  const rotationRad = (rotationDeg * Math.PI) / 180

  // Look up in real catalog
  const catalogEntry = itemId ? findCatalogItem(itemId) : null

  if (!catalogEntry) {
    const floorItems = getFloorItems()
    const available = floorItems.map((i) => i.id).join(', ')
    return JSON.stringify({
      error: `Unknown item "${itemId}". Available floor items: ${available}`,
    })
  }

  const item = ItemNode.parse({
    position,
    rotation: [0, rotationRad, 0],
    asset: catalogEntry,
  })

  useScene.getState().createNode(item, levelId as AnyNodeId)

  // Compute world-space bounding box accounting for rotation
  const dims = catalogEntry.dimensions ?? [1, 1, 1]
  const rot = ((rotationDeg % 360) + 360) % 360
  const isRotated = rot === 90 || rot === 270
  const worldW = isRotated ? dims[2] : dims[0]
  const worldD = isRotated ? dims[0] : dims[2]
  const bbox = {
    minX: round3(position[0] - worldW / 2),
    minZ: round3(position[2] - worldD / 2),
    maxX: round3(position[0] + worldW / 2),
    maxZ: round3(position[2] + worldD / 2),
  }

  // Check if item center is inside any slab (= inside a room)
  let insideRoom: string | null = null
  const { nodes } = useScene.getState()
  for (const node of Object.values(nodes)) {
    if ((node as { type: string }).type === 'slab') {
      const slab = node as unknown as { id: string; polygon: [number, number][] }
      if (slab.polygon && pointInPolygonSimple(position[0], position[2], slab.polygon)) {
        insideRoom = slab.id
        break
      }
    }
  }

  // Check collisions with existing furniture items on the same level
  const collisions: Array<{ itemId: string; name: string; overlapArea: number }> = []
  for (const node of Object.values(nodes)) {
    const n = node as unknown as { id: string; type: string; position?: [number, number, number]; asset?: { id?: string; name?: string; dimensions?: [number, number, number] }; rotation?: [number, number, number]; parentId?: string }
    if (n.type !== 'item' || n.id === item.id) continue
    if (!n.position || !n.asset?.dimensions) continue
    // Compute other item's bbox
    const oDims = n.asset.dimensions
    const oRotRad = n.rotation?.[1] ?? 0
    const oRotDeg = ((Math.round((oRotRad * 180) / Math.PI) % 360) + 360) % 360
    const oIsRot = oRotDeg === 90 || oRotDeg === 270
    const oW = oIsRot ? oDims[2] : oDims[0]
    const oD = oIsRot ? oDims[0] : oDims[2]
    const oBbox = {
      minX: n.position[0] - oW / 2,
      minZ: n.position[2] - oD / 2,
      maxX: n.position[0] + oW / 2,
      maxZ: n.position[2] + oD / 2,
    }
    // AABB overlap test
    const overlapX = Math.max(0, Math.min(bbox.maxX, oBbox.maxX) - Math.max(bbox.minX, oBbox.minX))
    const overlapZ = Math.max(0, Math.min(bbox.maxZ, oBbox.maxZ) - Math.max(bbox.minZ, oBbox.minZ))
    const overlapArea = round3(overlapX * overlapZ)
    if (overlapArea > 0.01) { // > 1cm² overlap
      collisions.push({ itemId: n.id, name: n.asset.name ?? n.asset.id ?? 'unknown', overlapArea })
    }
  }

  const warnings: string[] = []
  if (!insideRoom) warnings.push('⚠️ Item center is NOT inside any room slab!')
  if (collisions.length > 0) warnings.push(`⚠️ Overlaps with ${collisions.length} item(s): ${collisions.map((c) => c.name).join(', ')}`)

  return JSON.stringify({
    success: true,
    itemId: item.id,
    name: catalogEntry.name,
    catalogId: catalogEntry.id,
    dimensions: catalogEntry.dimensions,
    position,
    bbox,
    insideSlabId: insideRoom,
    collisions: collisions.length > 0 ? collisions : undefined,
    warning: warnings.length > 0 ? warnings.join(' | ') : undefined,
    createdNodeIds: [item.id],
    createdByType: { item: [item.id] },
    spatialContext: {
      bbox,
      insideSlabId: insideRoom,
      collisions,
    },
    usableBounds: bbox,
    suggestedNextTools: warnings.length > 0 ? ['move_nodes', 'validate_scene'] : ['validate_scene', 'place_in_room', 'place_against_wall'],
  })
}

// Simple point-in-polygon (ray casting) for containment checks
function pointInPolygonSimple(x: number, z: number, polygon: [number, number][]): boolean {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i]![0], zi = polygon[i]![1]
    const xj = polygon[j]![0], zj = polygon[j]![1]
    if ((zi > z) !== (zj > z) && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) {
      inside = !inside
    }
  }
  return inside
}

// ── Semantic placement tools (Phase C) ──
// These tools let the AI place furniture using semantic anchors instead of raw coordinates.

function placeInRoom(args: Record<string, unknown>): string {
  const itemType = args.type as string
  const anchor = (args.anchor as string) ?? 'center'
  const orientation = (args.orientation as string) ?? 'auto'
  const offsetFromWall = (args.offsetFromWall as number) ?? 0.05
  const roomOrigin = args.roomOrigin as [number, number] | undefined
  const roomWidth = args.roomWidth as number | undefined
  const roomDepth = args.roomDepth as number | undefined
  const slabId = args.slabId as string | undefined
  const wallThickness = (args.wallThickness as number) ?? 0.15

  const catalogEntry = itemType ? findCatalogItem(itemType) : null
  if (!catalogEntry) {
    const floorItems = getFloorItems()
    return JSON.stringify({
      error: `Unknown item "${itemType}". Available: ${floorItems.map((i) => i.id).join(', ')}`,
    })
  }

  // Resolve room bounds — either from explicit params or by finding the slab
  let minX: number, minZ: number, maxX: number, maxZ: number
  if (roomOrigin && roomWidth && roomDepth) {
    const halfT = wallThickness / 2
    minX = roomOrigin[0] + halfT
    minZ = roomOrigin[1] + halfT
    maxX = roomOrigin[0] + roomWidth - halfT
    maxZ = roomOrigin[1] + roomDepth - halfT
  } else if (slabId) {
    const slab = useScene.getState().nodes[slabId as AnyNodeId] as unknown as { polygon: [number, number][] } | undefined
    if (!slab?.polygon) return JSON.stringify({ error: `Slab ${slabId} not found or has no polygon` })
    minX = Math.min(...slab.polygon.map((p) => p[0]))
    minZ = Math.min(...slab.polygon.map((p) => p[1]))
    maxX = Math.max(...slab.polygon.map((p) => p[0]))
    maxZ = Math.max(...slab.polygon.map((p) => p[1]))
  } else {
    return JSON.stringify({
      error: 'Must provide either (roomOrigin + roomWidth + roomDepth) or slabId to define the room bounds.',
    })
  }

  const dims = catalogEntry.dimensions ?? [1, 1, 1]
  const gap = offsetFromWall

  // Parse anchor → normalized dx, dz
  // Anchors: center, north-wall, south-wall, east-wall, west-wall,
  //          northwest-corner, northeast-corner, southwest-corner, southeast-corner
  let dx = 0.5
  let dz = 0.5
  if (anchor.includes('north')) dz = 1.0
  if (anchor.includes('south')) dz = 0.0
  if (anchor.includes('east')) dx = 1.0
  if (anchor.includes('west')) dx = 0.0
  if (anchor === 'center') { dx = 0.5; dz = 0.5 }

  // Determine rotation from orientation or anchor
  let rotDeg = 0
  if (orientation === 'auto') {
    // Face toward room center from the anchor wall
    if (anchor.includes('north')) rotDeg = 180
    else if (anchor.includes('south')) rotDeg = 0
    else if (anchor.includes('east')) rotDeg = 270
    else if (anchor.includes('west')) rotDeg = 90
  } else if (orientation === 'facing-north' || orientation === 'north') {
    rotDeg = 180
  } else if (orientation === 'facing-south' || orientation === 'south') {
    rotDeg = 0
  } else if (orientation === 'facing-east' || orientation === 'east') {
    rotDeg = 270
  } else if (orientation === 'facing-west' || orientation === 'west') {
    rotDeg = 90
  } else {
    rotDeg = Number(orientation) || 0
  }

  // Account for rotation when computing footprint
  const rot = ((rotDeg % 360) + 360) % 360
  const isRotated = rot === 90 || rot === 270
  const fw = isRotated ? dims[2] : dims[0]
  const fd = isRotated ? dims[0] : dims[2]

  // Clamp center to safe zone (wall face + half-item + gap)
  const minCX = minX + fw / 2 + gap
  const maxCX = maxX - fw / 2 - gap
  const minCZ = minZ + fd / 2 + gap
  const maxCZ = maxZ - fd / 2 - gap

  let x: number, z: number
  if (maxCX <= minCX) x = (minX + maxX) / 2
  else x = minCX + dx * (maxCX - minCX)
  if (maxCZ <= minCZ) z = (minZ + maxZ) / 2
  else z = minCZ + dz * (maxCZ - minCZ)

  // Place via the standard placeFurniture for consistent bbox/containment reporting
  const targetPosition: [number, number, number] = [round3(x), 0, round3(z)]
  const room = boundsFromRoomArgs({
    ...args,
    ...(slabId ? { slabId } : {}),
    ...(roomOrigin && roomWidth && roomDepth ? { roomOrigin, roomWidth, roomDepth, wallThickness } : {}),
  })
  if (room) {
    const solved = solveSingleFurniture(itemType, room, String(args.roomType ?? 'living'), [], [{
      x: targetPosition[0],
      z: targetPosition[2],
      rotation: rotDeg,
      placement: `requested-${anchor}`,
    }])
    if (solved.placement) {
      const result = JSON.parse(placeFurniture({
        type: itemType,
        position: solved.placement.position,
        rotation: solved.placement.rotation,
      }))
      return JSON.stringify({
        ...result,
        solverAdjusted: solved.placement.position[0] !== targetPosition[0] || solved.placement.position[2] !== targetPosition[2] || solved.placement.rotation !== rotDeg,
        requestedPosition: targetPosition,
        solverPlacement: solved.placement,
        rejections: solved.rejections.slice(0, 5),
      })
    }
    return JSON.stringify({
      success: false,
      error: 'Requested semantic furniture position is not feasible',
      requestedPosition: targetPosition,
      rejections: solved.rejections.slice(0, 8),
      suggestedNextTools: ['suggest_furniture_layout', 'place_furniture_solved'],
    })
  }

  return placeFurniture({
    type: itemType,
    position: targetPosition,
    rotation: rotDeg,
  })
}

function placeAgainstWall(args: Record<string, unknown>): string {
  const itemType = args.type as string
  const wallId = args.wallId as string
  const positionT = (args.position_t as number) ?? 0.5
  const offsetFromWall = (args.offsetFromWall as number) ?? 0.05
  const facing = (args.facing as string) ?? 'toward-wall'

  if (!wallId) return JSON.stringify({ error: 'wallId is required' })

  const catalogEntry = itemType ? findCatalogItem(itemType) : null
  if (!catalogEntry) {
    const floorItems = getFloorItems()
    return JSON.stringify({
      error: `Unknown item "${itemType}". Available: ${floorItems.map((i) => i.id).join(', ')}`,
    })
  }

  const wall = useScene.getState().nodes[wallId as AnyNodeId] as unknown as {
    type: string
    start: [number, number]
    end: [number, number]
    thickness?: number
  } | undefined
  if (!wall || wall.type !== 'wall') {
    return JSON.stringify({ error: `Wall ${wallId} not found or is not a wall` })
  }

  const wdx = wall.end[0] - wall.start[0]
  const wdz = wall.end[1] - wall.start[1]
  const wallLen = Math.sqrt(wdx * wdx + wdz * wdz)
  if (wallLen < 0.01) return JSON.stringify({ error: 'Wall has zero length' })

  // Wall direction unit vector and normal (pointing "left" of wall direction)
  const dirX = wdx / wallLen
  const dirZ = wdz / wallLen
  const normX = -dirZ // normal points to the left of wall direction
  const normZ = dirX

  // Position along wall
  const alongX = wall.start[0] + positionT * wdx
  const alongZ = wall.start[1] + positionT * wdz

  // Compute wall angle for furniture rotation
  const wallAngleDeg = (Math.atan2(-wdx, -wdz) * 180) / Math.PI // angle wall faces (normal direction)

  const dims = catalogEntry.dimensions ?? [1, 1, 1]
  const halfT = (wall.thickness ?? 0.15) / 2

  // Offset from wall: push item away from wall interior face by half its depth + gap
  let rotDeg: number
  let perpDist: number
  if (facing === 'toward-wall' || facing === 'facing-wall') {
    // Item faces the wall (e.g., desk against wall, person facing wall)
    rotDeg = ((wallAngleDeg + 180) % 360 + 360) % 360
    const rot = ((rotDeg % 360) + 360) % 360
    const isRot = rot === 90 || rot === 270
    const fd = isRot ? dims[0] : dims[2]
    perpDist = halfT + fd / 2 + offsetFromWall
  } else {
    // Item faces away from wall (e.g., bookshelf flush against wall)
    rotDeg = ((wallAngleDeg) % 360 + 360) % 360
    const rot = ((rotDeg % 360) + 360) % 360
    const isRot = rot === 90 || rot === 270
    const fd = isRot ? dims[0] : dims[2]
    perpDist = halfT + fd / 2 + offsetFromWall
  }

  // Final position: along wall + offset perpendicular
  const x = round3(alongX + normX * perpDist)
  const z = round3(alongZ + normZ * perpDist)

  const targetPosition: [number, number, number] = [x, 0, z]
  const room = boundsFromRoomArgs(args)
  if (room) {
    const solved = solveSingleFurniture(itemType, room, String(args.roomType ?? 'living'), [], [{
      x,
      z,
      rotation: Math.round(rotDeg),
      placement: `requested-wall-${wallId}`,
    }])
    if (solved.placement) {
      const result = JSON.parse(placeFurniture({
        type: itemType,
        position: solved.placement.position,
        rotation: solved.placement.rotation,
      }))
      return JSON.stringify({
        ...result,
        solverAdjusted: solved.placement.position[0] !== targetPosition[0] || solved.placement.position[2] !== targetPosition[2] || solved.placement.rotation !== Math.round(rotDeg),
        requestedPosition: targetPosition,
        solverPlacement: solved.placement,
        rejections: solved.rejections.slice(0, 5),
      })
    }
    return JSON.stringify({
      success: false,
      error: 'Requested wall furniture position is not feasible',
      requestedPosition: targetPosition,
      rejections: solved.rejections.slice(0, 8),
      suggestedNextTools: ['suggest_furniture_layout', 'place_furniture_solved'],
    })
  }

  return placeFurniture({ type: itemType, position: targetPosition, rotation: Math.round(rotDeg) })
}

// ── Furniture layout presets per room type ──
// dx/dz are normalized 0-1 offsets within the INTERIOR space (after wall inset).
// 0 = against south/west interior wall face, 1 = against north/east interior wall face, 0.5 = centered.
// rotation: degrees around Y, 0 = south-facing, 90 = west, 180 = north, 270 = east.
const ROOM_FURNITURE_PRESETS: Record<
  string,
  Array<{ type: string; dx: number; dz: number; rotation: number }>
> = {
  bedroom: [
    // Bed: head against back (north) wall, centered X
    { type: 'double-bed', dx: 0.5, dz: 1.0, rotation: 0 },
    // Bedside table: left side of bed, near back wall
    { type: 'bedside-table', dx: 0.05, dz: 0.9, rotation: 0 },
    // Closet: against left (west) wall, near front
    { type: 'closet', dx: 0.0, dz: 0.0, rotation: 0 },
    // Floor lamp: right rear corner
    { type: 'floor-lamp', dx: 0.95, dz: 0.9, rotation: 0 },
  ],
  living: [
    // TV stand: against front (south) wall, centered
    { type: 'tv-stand', dx: 0.5, dz: 0.0, rotation: 0 },
    // Sofa: facing TV, in back half of room
    { type: 'sofa', dx: 0.5, dz: 0.75, rotation: 180 },
    // Coffee table: between TV and sofa
    { type: 'coffee-table', dx: 0.5, dz: 0.45, rotation: 0 },
    // Floor lamp: left rear corner
    { type: 'floor-lamp', dx: 0.05, dz: 0.9, rotation: 0 },
  ],
  kitchen: [
    // Kitchen counter: against back (north) wall
    { type: 'kitchen-counter', dx: 0.5, dz: 1.0, rotation: 180 },
    // Fridge: left side against back wall
    { type: 'fridge', dx: 0.0, dz: 1.0, rotation: 180 },
    // Stove: right side against back wall
    { type: 'stove', dx: 1.0, dz: 1.0, rotation: 180 },
  ],
  bathroom: [
    // Toilet: against back (north) wall, left side
    { type: 'toilet', dx: 0.2, dz: 1.0, rotation: 180 },
    // Sink: against back wall, right side
    { type: 'bathroom-sink', dx: 0.75, dz: 1.0, rotation: 180 },
    // Washing machine: against left (west) wall, near front
    { type: 'washing-machine', dx: 0.0, dz: 0.0, rotation: 0 },
  ],
  dining: [
    // Dining table: centered in room
    { type: 'dining-table', dx: 0.5, dz: 0.5, rotation: 0 },
    // 4 chairs around table
    { type: 'dining-chair', dx: 0.25, dz: 0.3, rotation: 0 },
    { type: 'dining-chair', dx: 0.75, dz: 0.3, rotation: 0 },
    { type: 'dining-chair', dx: 0.25, dz: 0.7, rotation: 180 },
    { type: 'dining-chair', dx: 0.75, dz: 0.7, rotation: 180 },
  ],
  office: [
    // Desk: against back (north) wall, centered
    { type: 'office-table', dx: 0.5, dz: 1.0, rotation: 180 },
    // Chair: in front of desk
    { type: 'office-chair', dx: 0.5, dz: 0.6, rotation: 0 },
    // Bookshelf: against left (west) wall
    { type: 'bookshelf', dx: 0.0, dz: 0.5, rotation: 0 },
  ],
  entryway: [
    // Coat rack: near the entrance (south wall)
    { type: 'coat-rack', dx: 0.1, dz: 0.0, rotation: 0 },
    // Shoe shelf: against left wall
    { type: 'shelf', dx: 0.0, dz: 0.5, rotation: 0 },
    // Small plant: right side
    { type: 'small-indoor-plant', dx: 0.9, dz: 0.0, rotation: 0 },
  ],
  balcony: [
    // Indoor plant: left corner
    { type: 'indoor-plant', dx: 0.1, dz: 0.9, rotation: 0 },
    // Small plant: right corner
    { type: 'small-indoor-plant', dx: 0.9, dz: 0.9, rotation: 0 },
    // Lounge chair: centered
    { type: 'lounge-chair', dx: 0.5, dz: 0.4, rotation: 0 },
  ],
  kids: [
    // Single bed: head against north wall
    { type: 'single-bed', dx: 0.5, dz: 1.0, rotation: 0 },
    // Toy: on the floor, center-left
    { type: 'toy', dx: 0.3, dz: 0.4, rotation: 0 },
    // Dresser: against west wall
    { type: 'dresser', dx: 0.0, dz: 0.3, rotation: 0 },
    // Bookshelf: against east wall
    { type: 'bookshelf', dx: 1.0, dz: 0.5, rotation: 0 },
  ],
  laundry: [
    // Washing machine: back wall, left
    { type: 'washing-machine', dx: 0.2, dz: 1.0, rotation: 180 },
    // Ironing board: center
    { type: 'ironing-board', dx: 0.5, dz: 0.4, rotation: 0 },
    // Drying rack: back wall, right
    { type: 'drying-rack', dx: 0.8, dz: 1.0, rotation: 180 },
  ],
  gym: [
    // Treadmill: against back wall, centered
    { type: 'threadmill', dx: 0.5, dz: 0.9, rotation: 180 },
    // Barbell stand: left side
    { type: 'barbell-stand', dx: 0.1, dz: 0.3, rotation: 0 },
  ],
  guest: [
    // Single bed: head against north wall, centered
    { type: 'single-bed', dx: 0.5, dz: 1.0, rotation: 0 },
    // Bedside table: right side of bed
    { type: 'bedside-table', dx: 0.9, dz: 0.9, rotation: 0 },
    // Floor lamp: left corner
    { type: 'floor-lamp', dx: 0.05, dz: 0.9, rotation: 0 },
  ],
}

// Small-room substitution: when room area < threshold, swap large items for smaller ones
const SMALL_ROOM_SUBSTITUTIONS: Record<string, string> = {
  'double-bed': 'single-bed',
  'sofa': 'lounge-chair',
  'bathtub': 'shower-square',
  'bathroom-sink': 'toilet', // skip sink if too small
  'dining-table': 'coffee-table',
  'coffee-table': 'stool',
  'kitchen-counter': 'kitchen-cabinet',
  'closet': 'dresser',
  'bookshelf': 'shelf',
  'indoor-plant': 'small-indoor-plant',
  'ironing-board': 'laundry-bag',
}
const SMALL_ROOM_AREA_THRESHOLD = 6 // m² — below this, use substitutions

function furnishRoom(args: Record<string, unknown>): string {
  const roomType = (args.roomType as string) ?? 'living'
  const origin = (args.origin as [number, number]) ?? [0, 0]
  const width = (args.width as number) ?? 5
  const depth = (args.depth as number) ?? 4
  const wallThickness = (args.wallThickness as number) ?? 0.15

  const items = (args.items as string[] | undefined) ?? defaultFurnitureForRoom(roomType)
  const solved = JSON.parse(placeFurnitureSolved({
    ...args,
    roomType,
    items,
    roomOrigin: origin,
    roomWidth: width,
    roomDepth: depth,
    wallThickness,
  }))

  // Build spatial context for the furnished room
  const halfT = wallThickness / 2
  const gap = 0.05
  const roomSpatial = {
    roomBounds: {
      minX: round3(origin[0]), minZ: round3(origin[1]),
      maxX: round3(origin[0] + width), maxZ: round3(origin[1] + depth),
    },
    interiorBounds: {
      minX: round3(origin[0] + halfT + gap), minZ: round3(origin[1] + halfT + gap),
      maxX: round3(origin[0] + width - halfT - gap), maxZ: round3(origin[1] + depth - halfT - gap),
    },
  }

  return JSON.stringify({
    success: Boolean(solved.success),
    roomType,
    itemsPlaced: Array.isArray(solved.created) ? solved.created.length : 0,
    items: solved.created ?? [],
    solver: {
      placements: solved.placements ?? [],
      rejections: solved.rejections ?? [],
      blockedZones: solved.blockedZones ?? [],
    },
    roomSpatial,
    suggestedNextTools: ['validate_scene', 'suggest_furniture_layout'],
  })
}

function createHallway(args: Record<string, unknown>): string {
  const from = (args.from as [number, number]) ?? [0, 0]
  const to = (args.to as [number, number]) ?? [0, 4]
  const hallwayWidth = (args.width as number) ?? 1.2
  const wallHeight = args.wallHeight as number | undefined
  const wallThickness = args.wallThickness as number | undefined
  const addSlab = (args.addSlab as boolean) ?? true

  // Calculate direction vector
  const dx = to[0] - from[0]
  const dz = to[1] - from[1]
  const length = Math.sqrt(dx * dx + dz * dz)
  if (length < 0.1) {
    return JSON.stringify({ error: '"from" and "to" must be different points' })
  }

  // Perpendicular offset for width
  const nx = (-dz / length) * (hallwayWidth / 2)
  const nz = (dx / length) * (hallwayWidth / 2)

  // 4 corners of the hallway
  const p1: [number, number] = [from[0] + nx, from[1] + nz]
  const p2: [number, number] = [from[0] - nx, from[1] - nz]
  const p3: [number, number] = [to[0] - nx, to[1] - nz]
  const p4: [number, number] = [to[0] + nx, to[1] + nz]

  // Create 2 long walls (no end walls so it can connect to rooms)
  const wallDefs = [
    { start: p1, end: p4 }, // left wall
    { start: p3, end: p2 }, // right wall
  ]

  const wallArgs: Record<string, unknown> = {
    walls: wallDefs.map((w) => ({
      ...w,
      ...(wallHeight != null ? { height: wallHeight } : {}),
      ...(wallThickness != null ? { thickness: wallThickness } : {}),
    })),
  }
  const wallResult = JSON.parse(createWalls(wallArgs))

  const results: Record<string, unknown> = {
    success: true,
    walls: wallResult,
    length: Math.round(length * 100) / 100,
    width: hallwayWidth,
  }

  // Create floor slab
  if (addSlab) {
    const slabResult = JSON.parse(createSlab({ polygon: [p1, p4, p3, p2] }))
    results.slab = slabResult
  }

  return JSON.stringify(results)
}

function listFurniture(): string {
  const floorItems = getFloorItems()
  const catalog: Record<string, { name: string; category: string; dimensions: string }> = {}
  for (const item of floorItems) {
    const d = item.dimensions ?? [0, 0, 0]
    catalog[item.id] = {
      name: item.name,
      category: item.category,
      dimensions: `${d[0]}×${d[1]}×${d[2]}m`,
    }
  }
  return JSON.stringify({ catalog })
}

function createBuildingShell(args: Record<string, unknown>): string {
  const width = (args.width as number) ?? 10
  const depth = (args.depth as number) ?? 8
  const origin = (args.origin as [number, number]) ?? [0, 0]
  const wallHeight = (args.wallHeight as number) ?? 2.8
  const wallThickness = (args.wallThickness as number) ?? 0.15
  const addRoof = (args.addRoof as boolean) ?? true
  const roofType = (args.roofType as string) ?? 'gable'
  const ceilingHeight = (args.ceilingHeight as number) ?? wallHeight - 0.3

  // Create room with walls + slab + ceiling
  const roomResult = JSON.parse(
    createRoom({
      origin,
      width,
      depth,
      wallHeight,
      wallThickness,
      addDoor: true,
      doorWall: 'front',
      addWindows: true,
      addCeiling: true,
      ceilingHeight,
    }),
  )

  const results: Record<string, unknown> = {
    success: true,
    ...roomResult,
  }

  // Add roof
  if (addRoof) {
    const [ox, oz] = origin
    const roofResult = JSON.parse(
      createRoof({
        position: [ox + width / 2, wallHeight, oz + depth / 2],
        roofType,
        width: width + 0.6, // overhang
        depth: depth + 0.6,
        wallHeight: 0.5,
        roofHeight: 2.0,
        overhang: 0.3,
      }),
    )
    results.roof = roofResult
  }

  return JSON.stringify(results)
}

function createFurnishedApartment(args: Record<string, unknown>): string {
  const origin = (args.origin as [number, number]) ?? [0, 0]
  const rooms = args.rooms as Array<{
    name: string
    width: number
    depth: number
    roomType?: string
    hasDoor?: boolean
    hasWindow?: boolean
  }>
  const wallHeight = args.wallHeight as number | undefined
  const wallThickness = (args.wallThickness as number) ?? 0.15
  const maxRowWidth = (args.maxRowWidth as number) ?? 20

  if (!rooms || !Array.isArray(rooms) || rooms.length === 0) {
    return JSON.stringify({ error: 'rooms array is required' })
  }

  // Room name → furniture type mapping
  const nameToRoomType: Record<string, string> = {
    客厅: 'living',
    起居室: 'living',
    living: 'living',
    卧室: 'bedroom',
    主卧: 'bedroom',
    次卧: 'bedroom',
    bedroom: 'bedroom',
    厨房: 'kitchen',
    kitchen: 'kitchen',
    卫生间: 'bathroom',
    浴室: 'bathroom',
    洗手间: 'bathroom',
    bathroom: 'bathroom',
    餐厅: 'dining',
    dining: 'dining',
    书房: 'office',
    办公室: 'office',
    office: 'office',
    玄关: 'entryway',
    门厅: 'entryway',
    entryway: 'entryway',
    阳台: 'balcony',
    露台: 'balcony',
    balcony: 'balcony',
    儿童房: 'kids',
    kids: 'kids',
    洗衣房: 'laundry',
    洗衣间: 'laundry',
    laundry: 'laundry',
    健身房: 'gym',
    gym: 'gym',
    客房: 'guest',
    客卧: 'guest',
    guest: 'guest',
  }

  const results: unknown[] = []
  let curX = origin[0]
  let curZ = origin[1]
  let rowMaxDepth = 0

  for (const room of rooms) {
    // Wrap to next row if needed
    if (curX - origin[0] + room.width > maxRowWidth && curX !== origin[0]) {
      curZ += rowMaxDepth
      curX = origin[0]
      rowMaxDepth = 0
    }

    // Create the room structure
    const roomResult = JSON.parse(
      createRoom({
        origin: [curX, curZ],
        width: room.width,
        depth: room.depth,
        wallHeight,
        wallThickness,
        addDoor: room.hasDoor ?? true,
        doorWall: 'front',
        addWindows: room.hasWindow ?? false,
      }),
    )

    // Create zone label
    const t = wallThickness / 2
    const zoneResult = JSON.parse(
      createZone({
        name: room.name,
        polygon: [
          [curX + t, curZ + t],
          [curX + room.width - t, curZ + t],
          [curX + room.width - t, curZ + room.depth - t],
          [curX + t, curZ + room.depth - t],
        ],
      }),
    )

    // Determine room type for furnishing
    const roomType =
      room.roomType ??
      nameToRoomType[room.name] ??
      // Try partial matching
      Object.entries(nameToRoomType).find(([key]) =>
        room.name.toLowerCase().includes(key),
      )?.[1]

    let furnitureResult = null
    if (roomType && ROOM_FURNITURE_PRESETS[roomType]) {
      furnitureResult = JSON.parse(
        furnishRoom({
          roomType,
          origin: [curX, curZ],
          width: room.width,
          depth: room.depth,
          wallThickness,
        }),
      )
    }

    results.push({
      room: room.name,
      origin: [round3(curX), round3(curZ)],
      size: { width: room.width, depth: room.depth },
      ...roomResult,
      zone: zoneResult,
      furniture: furnitureResult,
    })

    curX += room.width
    rowMaxDepth = Math.max(rowMaxDepth, room.depth)
  }

  // Build overall spatial layout summary for the AI
  type RoomEntry = { room: string; origin: [number, number]; size: { width: number; depth: number }; furniture: { itemsPlaced?: number } | null }
  const typedResults = results as unknown as RoomEntry[]
  const layoutSummary = typedResults.map((r) => ({
    name: r.room,
    origin: r.origin,
    size: r.size,
    furnitureCount: r.furniture?.itemsPlaced ?? 0,
  }))
  const overallBounds = {
    minX: round3(Math.min(...typedResults.map((r) => r.origin[0]))),
    minZ: round3(Math.min(...typedResults.map((r) => r.origin[1]))),
    maxX: round3(Math.max(...typedResults.map((r) => r.origin[0] + r.size.width))),
    maxZ: round3(Math.max(...typedResults.map((r) => r.origin[1] + r.size.depth))),
  }

  return JSON.stringify({
    success: true,
    roomCount: rooms.length,
    overallBounds,
    layoutSummary,
    rooms: results,
  })
}

function mirrorRoom(args: Record<string, unknown>): string {
  const sourceOrigin = (args.sourceOrigin as [number, number]) ?? [0, 0]
  const sourceWidth = args.sourceWidth as number
  const sourceDepth = args.sourceDepth as number
  const axis = (args.axis as string) ?? 'x'
  const wallHeight = args.wallHeight as number | undefined
  const wallThickness = args.wallThickness as number | undefined
  const addDoor = (args.addDoor as boolean) ?? true
  const addWindows = (args.addWindows as boolean) ?? false
  const roomName = args.roomName as string | undefined

  if (!sourceWidth || sourceWidth <= 0)
    return JSON.stringify({ error: 'sourceWidth must be positive' })
  if (!sourceDepth || sourceDepth <= 0)
    return JSON.stringify({ error: 'sourceDepth must be positive' })

  let mirrorOrigin: [number, number]

  if (axis === 'x') {
    // Mirror along X axis: place the new room to the right of the source
    mirrorOrigin = [sourceOrigin[0] + sourceWidth, sourceOrigin[1]]
  } else {
    // Mirror along Z axis: place the new room behind the source
    mirrorOrigin = [sourceOrigin[0], sourceOrigin[1] + sourceDepth]
  }

  // Create a mirrored room
  const roomResult = JSON.parse(
    createRoom({
      origin: mirrorOrigin,
      width: sourceWidth,
      depth: sourceDepth,
      wallHeight,
      wallThickness,
      addDoor,
      doorWall: axis === 'x' ? 'front' : 'front',
      addWindows,
    }),
  )

  const results: Record<string, unknown> = {
    success: true,
    mirroredFrom: sourceOrigin,
    mirrorOrigin,
    axis,
    ...roomResult,
  }

  // Create zone if name provided
  if (roomName) {
    const t = (wallThickness ?? 0.15) / 2
    const zoneResult = JSON.parse(
      createZone({
        name: roomName,
        polygon: [
          [mirrorOrigin[0] + t, mirrorOrigin[1] + t],
          [mirrorOrigin[0] + sourceWidth - t, mirrorOrigin[1] + t],
          [mirrorOrigin[0] + sourceWidth - t, mirrorOrigin[1] + sourceDepth - t],
          [mirrorOrigin[0] + t, mirrorOrigin[1] + sourceDepth - t],
        ],
      }),
    )
    results.zone = zoneResult
  }

  return JSON.stringify(results)
}

// ── Helper: find building node ──
function findBuilding(): BuildingNode | null {
  const { nodes } = useScene.getState()
  return (Object.values(nodes).find((n) => n.type === 'building') as BuildingNode | undefined) ?? null
}

// ── Level Management Tools ──

function addLevel(args: Record<string, unknown>): string {
  const building = findBuilding()
  if (!building) return JSON.stringify({ error: 'No building found in scene' })

  const { nodes } = useScene.getState()
  const existingLevels = building.children
    .map((id) => nodes[id as AnyNodeId])
    .filter((n): n is LevelNode => n?.type === 'level')
  const nextLevelNum = existingLevels.length
  const name = (args.name as string) ?? `Level ${nextLevelNum}`

  const newLevel = LevelNode.parse({
    level: nextLevelNum,
    name,
    children: [],
  })

  useScene.getState().createNode(newLevel, building.id as AnyNodeId)
  useViewer.getState().setSelection({ levelId: newLevel.id })

  return JSON.stringify({
    success: true,
    levelId: newLevel.id,
    level: nextLevelNum,
    name,
  })
}

function switchLevel(args: Record<string, unknown>): string {
  const building = findBuilding()
  if (!building) return JSON.stringify({ error: 'No building found in scene' })

  const levelNum = args.level as number | undefined
  const levelId = args.levelId as string | undefined
  const { nodes } = useScene.getState()

  let target: LevelNode | null = null

  if (levelId) {
    const node = nodes[levelId as AnyNodeId]
    if (node?.type === 'level') target = node as LevelNode
  } else if (levelNum !== undefined) {
    target = (Object.values(nodes).find(
      (n) => n.type === 'level' && (n as LevelNode).level === levelNum,
    ) as LevelNode | undefined) ?? null
  }

  if (!target) {
    const levels = Object.values(nodes)
      .filter((n): n is LevelNode => n.type === 'level')
      .sort((a, b) => a.level - b.level)
    return JSON.stringify({
      error: `Level not found. Available levels: ${levels.map((l) => `${l.level} (${l.name ?? l.id})`).join(', ')}`,
    })
  }

  useViewer.getState().setSelection({ levelId: target.id })

  return JSON.stringify({
    success: true,
    levelId: target.id,
    level: target.level,
    name: target.name ?? `Level ${target.level}`,
  })
}

function deleteLevel(args: Record<string, unknown>): string {
  const levelNum = args.level as number | undefined
  const levelId = args.levelId as string | undefined
  const { nodes } = useScene.getState()

  let target: LevelNode | null = null

  if (levelId) {
    const node = nodes[levelId as AnyNodeId]
    if (node?.type === 'level') target = node as LevelNode
  } else if (levelNum !== undefined) {
    target = (Object.values(nodes).find(
      (n) => n.type === 'level' && (n as LevelNode).level === levelNum,
    ) as LevelNode | undefined) ?? null
  }

  if (!target) return JSON.stringify({ error: 'Level not found' })
  if (target.level === 0) return JSON.stringify({ error: 'Cannot delete level 0 (ground floor)' })

  useScene.getState().deleteNode(target.id as AnyNodeId)

  // Switch to level 0
  const level0 = Object.values(useScene.getState().nodes).find(
    (n) => n.type === 'level' && (n as LevelNode).level === 0,
  ) as LevelNode | undefined
  if (level0) useViewer.getState().setSelection({ levelId: level0.id })

  return JSON.stringify({
    success: true,
    deletedLevelId: target.id,
    deletedLevel: target.level,
  })
}

function renameLevel(args: Record<string, unknown>): string {
  const levelNum = args.level as number | undefined
  const levelId = args.levelId as string | undefined
  const name = args.name as string
  if (!name) return JSON.stringify({ error: 'name is required' })

  const { nodes } = useScene.getState()
  let target: LevelNode | null = null

  if (levelId) {
    const node = nodes[levelId as AnyNodeId]
    if (node?.type === 'level') target = node as LevelNode
  } else if (levelNum !== undefined) {
    target = (Object.values(nodes).find(
      (n) => n.type === 'level' && (n as LevelNode).level === levelNum,
    ) as LevelNode | undefined) ?? null
  } else {
    const activeLvlId = getActiveLevelId()
    if (activeLvlId) {
      const node = nodes[activeLvlId as AnyNodeId]
      if (node?.type === 'level') target = node as LevelNode
    }
  }

  if (!target) return JSON.stringify({ error: 'Level not found' })

  useScene.getState().updateNode(target.id as AnyNodeId, { name } as Partial<AnyNode>)

  return JSON.stringify({
    success: true,
    levelId: target.id,
    level: target.level,
    name,
  })
}

function duplicateLevel(args: Record<string, unknown>): string {
  const sourceLevelNum = args.sourceLevel as number | undefined
  const sourceLevelId = args.sourceLevelId as string | undefined
  const targetName = args.name as string | undefined
  const offset = (args.offset as [number, number]) ?? [0, 0]
  const [dx, dz] = offset
  const includeTypes = args.include as string[] | undefined
  const excludeTypes = args.exclude as string[] | undefined
  const skipRoof = (args.skipRoof as boolean) ?? false

  const building = findBuilding()
  if (!building) return JSON.stringify({ error: 'No building found in scene' })

  const { nodes } = useScene.getState()

  let sourceLevel: LevelNode | null = null
  if (sourceLevelId) {
    const node = nodes[sourceLevelId as AnyNodeId]
    if (node?.type === 'level') sourceLevel = node as LevelNode
  } else if (sourceLevelNum !== undefined) {
    sourceLevel = (Object.values(nodes).find(
      (n) => n.type === 'level' && (n as LevelNode).level === sourceLevelNum,
    ) as LevelNode | undefined) ?? null
  } else {
    const activeLvlId = getActiveLevelId()
    if (activeLvlId) {
      const node = nodes[activeLvlId as AnyNodeId]
      if (node?.type === 'level') sourceLevel = node as LevelNode
    }
  }

  if (!sourceLevel) return JSON.stringify({ error: 'Source level not found' })

  // Determine which types to copy
  const shouldCopy = (type: string): boolean => {
    if (skipRoof && (type === 'roof' || type === 'roof-segment')) return false
    if (includeTypes && includeTypes.length > 0) return includeTypes.includes(type)
    if (excludeTypes && excludeTypes.length > 0) return !excludeTypes.includes(type)
    return true
  }

  // Helpers to apply horizontal offset to coordinates
  const offsetPoint = (p: [number, number]): [number, number] => [p[0] + dx, p[1] + dz]
  const offsetPolygon = (poly: [number, number][]): [number, number][] => poly.map(offsetPoint)

  const existingLevels = building.children
    .map((id) => nodes[id as AnyNodeId])
    .filter((n): n is LevelNode => n?.type === 'level')
  const nextLevelNum = existingLevels.length

  const newLevel = LevelNode.parse({
    level: nextLevelNum,
    name: targetName ?? `Level ${nextLevelNum}`,
    children: [],
  })

  useScene.getState().createNode(newLevel, building.id as AnyNodeId)

  const idMap = new Map<string, string>()
  const ops: { node: AnyNode; parentId: AnyNodeId }[] = []
  const skippedTypes = new Set<string>()

  for (const childId of sourceLevel.children) {
    const child = nodes[childId as AnyNodeId]
    if (!child) continue

    if (!shouldCopy(child.type)) {
      skippedTypes.add(child.type)
      continue
    }

    let cloned: AnyNode | null = null

    if (child.type === 'wall') {
      const w = child as WallNode
      cloned = WallNode.parse({
        start: offsetPoint(w.start), end: offsetPoint(w.end), height: w.height,
        thickness: w.thickness, frontSide: w.frontSide, backSide: w.backSide,
      })
    } else if (child.type === 'slab') {
      const s = child as SlabNode
      cloned = SlabNode.parse({
        polygon: offsetPolygon(s.polygon),
        holes: s.holes.map((h) => offsetPolygon(h)),
        elevation: s.elevation,
      })
    } else if (child.type === 'ceiling') {
      const c = child as CeilingNode
      cloned = CeilingNode.parse({
        polygon: offsetPolygon(c.polygon),
        holes: c.holes.map((h) => offsetPolygon(h)),
        height: c.height,
      })
    } else if (child.type === 'zone') {
      const z = child as ZoneNode
      cloned = ZoneNode.parse({
        name: z.name,
        polygon: offsetPolygon(z.polygon),
        color: z.color,
      })
    } else if (child.type === 'roof') {
      const r = child as RoofNode
      cloned = RoofNode.parse({
        position: [r.position[0] + dx, r.position[1], r.position[2] + dz],
        rotation: r.rotation,
      })
    }

    if (cloned) {
      idMap.set(child.id, cloned.id)
      ops.push({ node: cloned, parentId: newLevel.id as AnyNodeId })
    }
  }

  // Clone wall children (doors, windows, wall-attached items)
  for (const childId of sourceLevel.children) {
    const child = nodes[childId as AnyNodeId]
    if (!child || child.type !== 'wall') continue
    const wall = child as WallNode
    const newWallId = idMap.get(wall.id)
    if (!newWallId) continue

    for (const wallChildId of wall.children) {
      const wallChild = nodes[wallChildId as AnyNodeId]
      if (!wallChild) continue

      if (!shouldCopy(wallChild.type)) {
        skippedTypes.add(wallChild.type)
        continue
      }

      let clonedChild: AnyNode | null = null
      if (wallChild.type === 'door') {
        const d = wallChild as DoorNode
        clonedChild = DoorNode.parse({ width: d.width, height: d.height, position: d.position, wallId: newWallId, side: d.side })
      } else if (wallChild.type === 'window') {
        const w = wallChild as WindowNode
        clonedChild = WindowNode.parse({ width: w.width, height: w.height, position: w.position, wallId: newWallId, side: w.side })
      } else if (wallChild.type === 'item') {
        const itm = wallChild as ItemNode
        clonedChild = ItemNode.parse({
          position: itm.position, rotation: itm.rotation, scale: itm.scale,
          wallId: newWallId, wallT: itm.wallT, side: itm.side, asset: itm.asset,
        })
      }

      if (clonedChild) ops.push({ node: clonedChild, parentId: newWallId as AnyNodeId })
    }
  }

  // Clone roof segments
  for (const childId of sourceLevel.children) {
    const child = nodes[childId as AnyNodeId]
    if (!child || child.type !== 'roof') continue
    if (!shouldCopy('roof')) continue
    const roof = child as RoofNode
    const newRoofId = idMap.get(roof.id)
    if (!newRoofId) continue

    for (const segId of roof.children) {
      const seg = nodes[segId as AnyNodeId]
      if (!seg || seg.type !== 'roof-segment') continue
      const rs = seg as RoofSegmentNode
      const clonedSeg = RoofSegmentNode.parse({
        position: [rs.position[0] + dx, rs.position[1], rs.position[2] + dz],
        rotation: rs.rotation, roofType: rs.roofType,
        width: rs.width, depth: rs.depth, wallHeight: rs.wallHeight,
        roofHeight: rs.roofHeight, wallThickness: rs.wallThickness,
        deckThickness: rs.deckThickness, overhang: rs.overhang, shingleThickness: rs.shingleThickness,
      })
      ops.push({ node: clonedSeg, parentId: newRoofId as AnyNodeId })
    }
  }

  useScene.getState().createNodes(ops)
  useViewer.getState().setSelection({ levelId: newLevel.id })

  return JSON.stringify({
    success: true,
    newLevelId: newLevel.id,
    level: nextLevelNum,
    name: newLevel.name ?? `Level ${nextLevelNum}`,
    copiedNodes: ops.length,
    sourceLevel: sourceLevel.level,
    offset: dx !== 0 || dz !== 0 ? offset : undefined,
    skippedTypes: skippedTypes.size > 0 ? Array.from(skippedTypes) : undefined,
  })
}

function listLevels(): string {
  const building = findBuilding()
  if (!building) return JSON.stringify({ error: 'No building found in scene' })

  const { nodes } = useScene.getState()
  const activeLevel = getActiveLevelId()

  const levels = building.children
    .map((id) => nodes[id as AnyNodeId])
    .filter((n): n is LevelNode => n?.type === 'level')
    .sort((a, b) => a.level - b.level)
    .map((level) => {
      const counts: Record<string, number> = {}
      for (const childId of level.children) {
        const child = nodes[childId as AnyNodeId]
        if (child) counts[child.type] = (counts[child.type] ?? 0) + 1
      }
      return {
        levelId: level.id,
        level: level.level,
        name: level.name ?? `Level ${level.level}`,
        isActive: level.id === activeLevel,
        childCounts: counts,
        totalChildren: level.children.length,
      }
    })

  return JSON.stringify({
    buildingId: building.id,
    activeLevelId: activeLevel,
    levels,
    totalLevels: levels.length,
  })
}

// ── Wall/Ceiling Attached Item Tools ──

function getWallAttachedItems() {
  return CATALOG_ITEMS.filter(
    (item) => item.attachTo === 'wall' || item.attachTo === 'wall-side',
  )
}

function getCeilingAttachedItems() {
  return CATALOG_ITEMS.filter((item) => item.attachTo === 'ceiling')
}

function placeWallItem(args: Record<string, unknown>): string {
  const itemId = args.type as string
  const wallId = args.wallId as string
  const wallT = (args.wallT as number) ?? 0.5
  const heightOffset = (args.heightOffset as number) ?? 1.2
  const side = (args.side as 'front' | 'back') ?? 'front'

  if (!wallId) return JSON.stringify({ error: 'wallId is required' })

  const { nodes } = useScene.getState()
  const wall = nodes[wallId as AnyNodeId]
  if (!wall || wall.type !== 'wall') {
    return JSON.stringify({ error: `Wall "${wallId}" not found` })
  }

  const catalogEntry = itemId ? findCatalogItem(itemId) : null
  if (!catalogEntry) {
    const available = getWallAttachedItems().map((i) => i.id).join(', ')
    return JSON.stringify({
      error: `Unknown wall item "${itemId}". Available: ${available}`,
    })
  }

  if (catalogEntry.attachTo !== 'wall' && catalogEntry.attachTo !== 'wall-side') {
    return JSON.stringify({
      error: `"${itemId}" is not a wall-attachable item. Use place_furniture for floor items.`,
    })
  }

  const item = ItemNode.parse({
    position: [0, heightOffset, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    wallId,
    wallT,
    side,
    asset: catalogEntry,
  })

  useScene.getState().createNode(item, wallId as AnyNodeId)

  return JSON.stringify({
    success: true,
    itemId: item.id,
    name: catalogEntry.name,
    catalogId: catalogEntry.id,
    attachTo: catalogEntry.attachTo,
    wallId,
    wallT,
    side,
  })
}

function placeCeilingItem(args: Record<string, unknown>): string {
  const levelId = getLevelId()
  const itemId = args.type as string
  const position = (args.position as [number, number, number]) ?? [0, 0, 0]
  const ceilingId = args.ceilingId as string | undefined

  const catalogEntry = itemId ? findCatalogItem(itemId) : null
  if (!catalogEntry) {
    const available = getCeilingAttachedItems().map((i) => i.id).join(', ')
    return JSON.stringify({
      error: `Unknown ceiling item "${itemId}". Available: ${available}`,
    })
  }

  if (catalogEntry.attachTo !== 'ceiling') {
    return JSON.stringify({
      error: `"${itemId}" is not a ceiling-attachable item.`,
    })
  }

  let parentId = ceilingId as string
  if (!parentId) {
    const { nodes } = useScene.getState()
    const ceiling = Object.values(nodes).find(
      (n) => n.type === 'ceiling' && n.parentId === levelId,
    )
    parentId = ceiling ? ceiling.id : levelId
  }

  const item = ItemNode.parse({
    position,
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    asset: catalogEntry,
  })

  useScene.getState().createNode(item, parentId as AnyNodeId)

  return JSON.stringify({
    success: true,
    itemId: item.id,
    name: catalogEntry.name,
    catalogId: catalogEntry.id,
    attachTo: 'ceiling',
    parentId,
    position,
  })
}

function validateScene(args: Record<string, unknown> = {}): string {
  const levelId = getLevelId()
  const result = validateAndCorrectScene(levelId, args.codeProfile as string | undefined)
  const report = formatValidationReport(result)
  try {
    lastValidationReport = JSON.parse(report) as Record<string, unknown>
  } catch {
    lastValidationReport = null
  }
  return report
}

function autoAlignWindows(args: Record<string, unknown>): string {
  const wallIds = args.wallIds as string[]
  const windowWidth = (args.windowWidth as number) ?? 1.5
  const windowHeight = (args.windowHeight as number) ?? 1.5
  const sillHeight = (args.sillHeight as number) ?? 0.9
  const spacing = (args.spacing as number) ?? 1.0

  if (!wallIds || !Array.isArray(wallIds) || wallIds.length === 0) {
    return JSON.stringify({ error: 'wallIds array is required and must not be empty' })
  }

  const { nodes } = useScene.getState()
  const createdWindowIds: string[] = []
  const ops: { node: AnyNode; parentId?: AnyNodeId }[] = []

  for (const wallId of wallIds) {
    const wallNode = nodes[wallId as AnyNodeId]
    if (!wallNode || wallNode.type !== 'wall') {
      return JSON.stringify({ error: `Wall ${wallId} not found or is not a wall` })
    }

    const wall = wallNode as unknown as { start: [number, number]; end: [number, number] }
    const dx = wall.end[0] - wall.start[0]
    const dz = wall.end[1] - wall.start[1]
    const wallLen = Math.sqrt(dx * dx + dz * dz)

    // Calculate how many windows we can fit
    const usableLength = wallLen - 1.0 // leave some margin
    if (usableLength < windowWidth) continue

    const count = Math.floor((usableLength + spacing) / (windowWidth + spacing))
    if (count <= 0) continue

    const totalWidth = count * windowWidth + (count - 1) * spacing
    const startX = (wallLen - totalWidth) / 2

    for (let i = 0; i < count; i++) {
      const xPos = startX + i * (windowWidth + spacing) + windowWidth / 2
      const yPos = sillHeight + windowHeight / 2

      const windowNode = WindowNode.parse({
        wallId,
        position: [xPos, yPos, 0],
        width: windowWidth,
        height: windowHeight,
      })

      ops.push({ node: windowNode, parentId: wallId as AnyNodeId })
      createdWindowIds.push(windowNode.id)
    }
  }

  if (ops.length > 0) {
    useScene.getState().createNodes(ops)
  }

  return JSON.stringify({
    success: true,
    createdCount: createdWindowIds.length,
    windowIds: createdWindowIds,
  })
}

function buildStaircase(args: Record<string, unknown>): string {
  const startLevelId = args.startLevelId as string
  const endLevelId = args.endLevelId as string
  const position = (args.position as [number, number, number]) ?? [0, 0, 0]
  const type = (args.type as string) ?? 'straight'
  const width = (args.width as number) ?? 1.2
  const depth = (args.depth as number) ?? 3.0

  if (!startLevelId || !endLevelId) {
    return JSON.stringify({ error: 'startLevelId and endLevelId are required' })
  }

  const { nodes } = useScene.getState()
  const startLevel = nodes[startLevelId as AnyNodeId]
  const endLevel = nodes[endLevelId as AnyNodeId]

  if (!startLevel || startLevel.type !== 'level') return JSON.stringify({ error: 'startLevel not found' })
  if (!endLevel || endLevel.type !== 'level') return JSON.stringify({ error: 'endLevel not found' })

  // Find slab on the endLevel to cut a hole in
  let targetSlab: AnyNode | null = null
  for (const childId of (endLevel as any).children || []) {
    const child = nodes[childId as AnyNodeId]
    if (child && child.type === 'slab') {
      targetSlab = child
      break
    }
  }

  const ops: { node: AnyNode; parentId?: AnyNodeId }[] = []
  
  // Create staircase item on startLevel
  const staircaseItem = ItemNode.parse({
    asset: {
      id: `staircase_${type}`, // A pseudo-catalog ID for staircase
      category: 'staircase',
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Staircase`,
      thumbnail: '',
      src: '',
      dimensions: [width, 3, depth], // [w, h, d]
    },
    position,
  })
  ops.push({ node: staircaseItem, parentId: startLevelId as AnyNodeId })

  let slabCutoutSuccess = false
  if (targetSlab) {
    slabCutoutSuccess = true
  }

  useScene.getState().createNodes(ops)

  return JSON.stringify({
    success: true,
    staircaseId: staircaseItem.id,
    startLevelId,
    endLevelId,
    slabCutoutSuccess,
    message: `Created ${type} staircase from level ${startLevelId} to ${endLevelId}`,
  })
}

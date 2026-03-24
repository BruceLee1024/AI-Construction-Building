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
        return validateScene()
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

  return JSON.stringify({
    success: true,
    wallIds: createdIds,
    count: createdIds.length,
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

  const results: Record<string, unknown> = {
    success: true,
    walls: wallResult,
    slab: slabResult,
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

  const zone = ZoneNode.parse({ name, polygon, color })
  useScene.getState().createNode(zone, levelId as AnyNodeId)

  return JSON.stringify({
    success: true,
    zoneId: zone.id,
    name,
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
  }>
  const wallHeight = args.wallHeight as number | undefined
  const wallThickness = (args.wallThickness as number) ?? 0.15
  const maxRowWidth = (args.maxRowWidth as number) ?? 20

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
        polygon: [
          [curX + t, curZ + t],
          [curX + room.width - t, curZ + t],
          [curX + room.width - t, curZ + room.depth - t],
          [curX + t, curZ + room.depth - t],
        ],
      }),
    )

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
  const zones: Array<{ id: string; name: unknown; color?: unknown }> = []
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
      zones.push({ id: z.id, name: z.name, color: z.color })
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
      isEmpty: walls.length === 0 && slabs.length === 0,
    },
    allLevels,
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
  }

  // Create floor slab
  if (addSlab) {
    const slabResult = JSON.parse(createSlab({ polygon }))
    results.slab = slabResult
  }

  // Add door on specified edge
  if (addDoor && doorEdgeIndex >= 0 && doorEdgeIndex < polygon.length) {
    const doorResult = JSON.parse(
      createDoor({ wallIndex: doorEdgeIndex, position_t: 0.5 }),
    )
    results.door = doorResult
  }

  // Create zone if name provided
  if (zoneName) {
    const zoneResult = JSON.parse(
      createZone({ name: zoneName, polygon, color: zoneColor }),
    )
    results.zone = zoneResult
  }

  return JSON.stringify(results)
}

// ── Look up real catalog item by ID ──
function findCatalogItem(id: string) {
  return CATALOG_ITEMS.find((item) => item.id === id) ?? null
}

// Floor-placeable items from the real catalog (exclude wall/ceiling-attached items)
function getFloorItems() {
  return CATALOG_ITEMS.filter(
    (item) => !item.attachTo || item.attachTo === undefined,
  )
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

  return JSON.stringify({
    success: true,
    itemId: item.id,
    name: catalogEntry.name,
    catalogId: catalogEntry.id,
    dimensions: catalogEntry.dimensions,
    position,
  })
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
}

function furnishRoom(args: Record<string, unknown>): string {
  const roomType = (args.roomType as string) ?? 'living'
  const origin = (args.origin as [number, number]) ?? [0, 0]
  const width = (args.width as number) ?? 5
  const depth = (args.depth as number) ?? 4
  const wallThickness = (args.wallThickness as number) ?? 0.15

  const preset = ROOM_FURNITURE_PRESETS[roomType]
  if (!preset) {
    const available = Object.keys(ROOM_FURNITURE_PRESETS).join(', ')
    return JSON.stringify({
      error: `Unknown room type "${roomType}". Available: ${available}`,
    })
  }

  // Compute interior bounds (inset from outer walls by wall thickness + gap)
  const gap = 0.05 // 5cm clearance from wall interior face
  const inset = wallThickness + gap
  const interiorW = Math.max(0.5, width - inset * 2)
  const interiorD = Math.max(0.5, depth - inset * 2)
  const interiorOx = origin[0] + inset
  const interiorOz = origin[1] + inset

  const placed: unknown[] = []

  for (const presetItem of preset) {
    const catalogEntry = findCatalogItem(presetItem.type)
    if (!catalogEntry) continue

    // Convert normalized (0-1) offsets to INTERIOR coordinates
    const dims = catalogEntry.dimensions ?? [1, 1, 1]
    const fw = dims[0] // furniture width (X)
    const fd = dims[2] // furniture depth (Z)

    // dx=0 → furniture flush against west interior wall
    // dx=1 → furniture flush against east interior wall
    // dx=0.5 → centered
    const availX = Math.max(0, interiorW - fw)
    const availZ = Math.max(0, interiorD - fd)
    const x = interiorOx + presetItem.dx * availX + fw / 2
    const z = interiorOz + presetItem.dz * availZ + fd / 2

    const result = JSON.parse(
      placeFurniture({
        type: presetItem.type,
        position: [x, 0, z],
        rotation: presetItem.rotation,
      }),
    )
    placed.push(result)
  }

  return JSON.stringify({
    success: true,
    roomType,
    itemsPlaced: placed.length,
    items: placed,
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
      ...roomResult,
      zone: zoneResult,
      furniture: furnitureResult,
    })

    curX += room.width
    rowMaxDepth = Math.max(rowMaxDepth, room.depth)
  }

  return JSON.stringify({
    success: true,
    roomCount: rooms.length,
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

function validateScene(): string {
  const levelId = getLevelId()
  const result = validateAndCorrectScene(levelId)
  return formatValidationReport(result)
}

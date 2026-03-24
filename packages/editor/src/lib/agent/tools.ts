import type { ChatCompletionTool } from 'openai/resources/chat/completions'

export const agentTools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'create_walls',
      description:
        'Create one or more walls on the current level. Each wall is defined by start and end points [x, z] in meters. Walls should form closed loops for rooms.',
      parameters: {
        type: 'object',
        properties: {
          walls: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                start: {
                  type: 'array',
                  items: { type: 'number' },
                  minItems: 2,
                  maxItems: 2,
                  description: 'Start point [x, z] in meters',
                },
                end: {
                  type: 'array',
                  items: { type: 'number' },
                  minItems: 2,
                  maxItems: 2,
                  description: 'End point [x, z] in meters',
                },
                thickness: {
                  type: 'number',
                  description: 'Wall thickness in meters (default: 0.15)',
                },
                height: {
                  type: 'number',
                  description: 'Wall height in meters (default: 2.8)',
                },
              },
              required: ['start', 'end'],
            },
            description: 'Array of wall definitions',
          },
        },
        required: ['walls'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_slab',
      description:
        'Create a floor slab defined by a polygon of [x, z] points. Points should be in counter-clockwise order.',
      parameters: {
        type: 'object',
        properties: {
          polygon: {
            type: 'array',
            items: {
              type: 'array',
              items: { type: 'number' },
              minItems: 2,
              maxItems: 2,
            },
            description: 'Array of [x, z] points defining the slab boundary',
          },
          elevation: {
            type: 'number',
            description: 'Slab elevation/thickness in meters (default: 0.05)',
          },
        },
        required: ['polygon'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_door',
      description:
        'Create a door on a specified wall. The door is positioned along the wall using a parametric t value (0-1).',
      parameters: {
        type: 'object',
        properties: {
          wallIndex: {
            type: 'integer',
            description:
              'Index of the wall (from the most recently created walls) to place the door on. 0-based.',
          },
          width: {
            type: 'number',
            description: 'Door width in meters (default: 0.9)',
          },
          height: {
            type: 'number',
            description: 'Door height in meters (default: 2.1)',
          },
          position_t: {
            type: 'number',
            description:
              'Parametric position along the wall from 0 (start) to 1 (end). 0.5 = center.',
          },
        },
        required: ['wallIndex'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_window',
      description:
        'Create a window on a specified wall. The window is positioned along the wall using a parametric t value (0-1).',
      parameters: {
        type: 'object',
        properties: {
          wallIndex: {
            type: 'integer',
            description:
              'Index of the wall (from the most recently created walls) to place the window on. 0-based.',
          },
          width: {
            type: 'number',
            description: 'Window width in meters (default: 1.5)',
          },
          height: {
            type: 'number',
            description: 'Window height in meters (default: 1.5)',
          },
          position_t: {
            type: 'number',
            description:
              'Parametric position along the wall from 0 (start) to 1 (end). 0.5 = center.',
          },
          sillHeight: {
            type: 'number',
            description: 'Height of window sill from floor in meters (default: 0.9)',
          },
        },
        required: ['wallIndex'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_room',
      description:
        'High-level helper: Create a complete rectangular room with walls and floor slab. Optionally add a door and windows.',
      parameters: {
        type: 'object',
        properties: {
          origin: {
            type: 'array',
            items: { type: 'number' },
            minItems: 2,
            maxItems: 2,
            description: 'Bottom-left corner [x, z] of the room in meters (default: [0, 0])',
          },
          width: {
            type: 'number',
            description: 'Room width along X axis in meters',
          },
          depth: {
            type: 'number',
            description: 'Room depth along Z axis in meters',
          },
          wallHeight: {
            type: 'number',
            description: 'Wall height in meters (default: 2.8)',
          },
          wallThickness: {
            type: 'number',
            description: 'Wall thickness in meters (default: 0.15)',
          },
          addDoor: {
            type: 'boolean',
            description: 'Whether to add a door on the front wall (default: true)',
          },
          doorWall: {
            type: 'string',
            enum: ['front', 'back', 'left', 'right'],
            description: 'Which wall to place the door on (default: front)',
          },
          addWindows: {
            type: 'boolean',
            description: 'Whether to add windows (default: false)',
          },
          addCeiling: {
            type: 'boolean',
            description: 'Whether to add a ceiling (default: false)',
          },
          ceilingHeight: {
            type: 'number',
            description: 'Ceiling height in meters (default: wallHeight - 0.3, or 2.5)',
          },
        },
        required: ['width', 'depth'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_ceiling',
      description:
        'Create a ceiling defined by a polygon of [x, z] points, at a given height. The polygon should match the room boundary.',
      parameters: {
        type: 'object',
        properties: {
          polygon: {
            type: 'array',
            items: {
              type: 'array',
              items: { type: 'number' },
              minItems: 2,
              maxItems: 2,
            },
            description: 'Array of [x, z] points defining the ceiling boundary',
          },
          height: {
            type: 'number',
            description: 'Ceiling height in meters (default: 2.5)',
          },
        },
        required: ['polygon'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_zone',
      description:
        'Create a named zone (labeled area) on the current level. Zones are colored polygonal regions used to label rooms and spaces.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Name/label of the zone (e.g., "Living Room", "Kitchen", "Bedroom")',
          },
          polygon: {
            type: 'array',
            items: {
              type: 'array',
              items: { type: 'number' },
              minItems: 2,
              maxItems: 2,
            },
            description: 'Array of [x, z] points defining the zone boundary',
          },
          color: {
            type: 'string',
            description: 'Hex color for the zone (default: "#3b82f6" blue)',
          },
        },
        required: ['name', 'polygon'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_roof',
      description:
        'Create a roof on the current level. Supports various roof types: gable, hip, shed, flat, gambrel, dutch, mansard.',
      parameters: {
        type: 'object',
        properties: {
          position: {
            type: 'array',
            items: { type: 'number' },
            minItems: 3,
            maxItems: 3,
            description: 'Center position [x, y, z] of the roof (default: [0, 0, 0])',
          },
          rotation: {
            type: 'number',
            description: 'Rotation around Y axis in degrees (default: 0)',
          },
          roofType: {
            type: 'string',
            enum: ['gable', 'hip', 'shed', 'flat', 'gambrel', 'dutch', 'mansard'],
            description: 'Type of roof (default: "gable")',
          },
          width: {
            type: 'number',
            description: 'Roof footprint width in meters (default: 8)',
          },
          depth: {
            type: 'number',
            description: 'Roof footprint depth in meters (default: 6)',
          },
          wallHeight: {
            type: 'number',
            description: 'Height of walls below the roof in meters (default: 0.5)',
          },
          roofHeight: {
            type: 'number',
            description: 'Height of the roof peak above walls in meters (default: 2.5)',
          },
          overhang: {
            type: 'number',
            description: 'Eave overhang distance in meters (default: 0.3)',
          },
        },
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_apartment',
      description:
        'High-level helper: Create a multi-room apartment layout. Rooms are placed adjacent to each other sharing walls. Specify room list with names and dimensions.',
      parameters: {
        type: 'object',
        properties: {
          origin: {
            type: 'array',
            items: { type: 'number' },
            minItems: 2,
            maxItems: 2,
            description: 'Bottom-left corner [x, z] of the apartment (default: [0, 0])',
          },
          rooms: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Room name (e.g., "Living Room", "Bedroom")',
                },
                width: {
                  type: 'number',
                  description: 'Room width along X axis in meters',
                },
                depth: {
                  type: 'number',
                  description: 'Room depth along Z axis in meters',
                },
                hasDoor: {
                  type: 'boolean',
                  description: 'Whether this room has a door (default: true)',
                },
                hasWindow: {
                  type: 'boolean',
                  description: 'Whether this room has windows (default: false)',
                },
              },
              required: ['name', 'width', 'depth'],
            },
            description: 'List of rooms to create. Rooms are laid out left-to-right then wrap to next row.',
          },
          wallHeight: {
            type: 'number',
            description: 'Wall height in meters (default: 2.8)',
          },
          wallThickness: {
            type: 'number',
            description: 'Wall thickness in meters (default: 0.15)',
          },
          maxRowWidth: {
            type: 'number',
            description: 'Maximum width before wrapping to next row (default: 20)',
          },
        },
        required: ['rooms'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_l_shaped_room',
      description:
        'Create an L-shaped room defined by two overlapping rectangles. Creates walls, floor slab, and optional door.',
      parameters: {
        type: 'object',
        properties: {
          origin: {
            type: 'array',
            items: { type: 'number' },
            minItems: 2,
            maxItems: 2,
            description: 'Bottom-left corner [x, z] (default: [0, 0])',
          },
          mainWidth: {
            type: 'number',
            description: 'Width of the main (longer) section in meters',
          },
          mainDepth: {
            type: 'number',
            description: 'Depth of the main section in meters',
          },
          wingWidth: {
            type: 'number',
            description: 'Width of the wing (shorter) section in meters',
          },
          wingDepth: {
            type: 'number',
            description: 'Depth of the wing section in meters',
          },
          wallHeight: {
            type: 'number',
            description: 'Wall height in meters (default: 2.8)',
          },
          addDoor: {
            type: 'boolean',
            description: 'Whether to add a door on the front wall (default: true)',
          },
        },
        required: ['mainWidth', 'mainDepth', 'wingWidth', 'wingDepth'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'modify_node',
      description:
        'Modify properties of an existing node by its ID. Can change wall height/thickness, door/window dimensions, zone color/name, etc.',
      parameters: {
        type: 'object',
        properties: {
          nodeId: {
            type: 'string',
            description: 'The ID of the node to modify',
          },
          updates: {
            type: 'object',
            description:
              'Properties to update. Depends on node type. Walls: { height, thickness }, Doors: { width, height }, Windows: { width, height }, Zones: { name, color }.',
          },
        },
        required: ['nodeId', 'updates'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'delete_all_on_level',
      description: 'Delete all walls, slabs, doors, windows, ceilings, zones, and roofs on the current level. Useful for starting over.',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_scene_info',
      description:
        'Get information about the current scene: number of walls, slabs, doors, windows, ceilings, zones, roofs and their basic properties. Use this BEFORE making changes to understand the current state.',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'undo',
      description: 'Undo the last scene change. Can be called multiple times to undo multiple steps.',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'redo',
      description: 'Redo the last undone scene change.',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'delete_node',
      description:
        'Delete a specific node by its ID. Also deletes all children (e.g., deleting a wall also removes its doors/windows).',
      parameters: {
        type: 'object',
        properties: {
          nodeId: {
            type: 'string',
            description: 'The ID of the node to delete',
          },
        },
        required: ['nodeId'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'select_node',
      description:
        'Select a node in the viewer to highlight it. Useful after creating something so the user can see what was made.',
      parameters: {
        type: 'object',
        properties: {
          nodeId: {
            type: 'string',
            description: 'The ID of the node to select',
          },
        },
        required: ['nodeId'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'move_nodes',
      description:
        'Move one or more nodes by a delta offset [dx, dz]. For walls this shifts both start and end points. For slabs/zones/ceilings it shifts all polygon vertices. For doors/windows it is not supported (move the parent wall instead).',
      parameters: {
        type: 'object',
        properties: {
          nodeIds: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of node IDs to move',
          },
          delta: {
            type: 'array',
            items: { type: 'number' },
            minItems: 2,
            maxItems: 2,
            description: 'Offset [dx, dz] in meters to shift the nodes',
          },
        },
        required: ['nodeIds', 'delta'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'add_door_to_wall',
      description:
        'Place a door on an existing wall identified by its wall ID (not index). Use this when you know the wall ID from get_scene_info.',
      parameters: {
        type: 'object',
        properties: {
          wallId: {
            type: 'string',
            description: 'The ID of the wall to place the door on',
          },
          width: {
            type: 'number',
            description: 'Door width in meters (default: 0.9)',
          },
          height: {
            type: 'number',
            description: 'Door height in meters (default: 2.1)',
          },
          position_t: {
            type: 'number',
            description: 'Parametric position along the wall 0-1 (default: 0.5 = center)',
          },
        },
        required: ['wallId'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'add_window_to_wall',
      description:
        'Place a window on an existing wall identified by its wall ID (not index). Use this when you know the wall ID from get_scene_info.',
      parameters: {
        type: 'object',
        properties: {
          wallId: {
            type: 'string',
            description: 'The ID of the wall to place the window on',
          },
          width: {
            type: 'number',
            description: 'Window width in meters (default: 1.5)',
          },
          height: {
            type: 'number',
            description: 'Window height in meters (default: 1.5)',
          },
          position_t: {
            type: 'number',
            description: 'Parametric position along the wall 0-1 (default: 0.5 = center)',
          },
          sillHeight: {
            type: 'number',
            description: 'Height of window sill from floor in meters (default: 0.9)',
          },
        },
        required: ['wallId'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'batch_modify_nodes',
      description:
        'Modify the same property on multiple nodes at once. Useful for changing all wall heights, all zone colors, etc.',
      parameters: {
        type: 'object',
        properties: {
          nodeIds: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of node IDs to modify',
          },
          updates: {
            type: 'object',
            description: 'Properties to update on all specified nodes',
          },
        },
        required: ['nodeIds', 'updates'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_polygon_room',
      description:
        'Create a room from a custom polygon outline (not limited to rectangles). Creates walls along each edge, a floor slab, and optionally a door on one edge.',
      parameters: {
        type: 'object',
        properties: {
          polygon: {
            type: 'array',
            items: {
              type: 'array',
              items: { type: 'number' },
              minItems: 2,
              maxItems: 2,
            },
            description: 'Array of [x, z] vertices defining the room outline (at least 3 points, counter-clockwise)',
          },
          wallHeight: {
            type: 'number',
            description: 'Wall height in meters (default: 2.8)',
          },
          wallThickness: {
            type: 'number',
            description: 'Wall thickness in meters (default: 0.15)',
          },
          addDoor: {
            type: 'boolean',
            description: 'Whether to add a door on the first edge (default: true)',
          },
          doorEdgeIndex: {
            type: 'integer',
            description: 'Which edge to place the door on, 0-based (default: 0)',
          },
          addSlab: {
            type: 'boolean',
            description: 'Whether to add a floor slab (default: true)',
          },
          zoneName: {
            type: 'string',
            description: 'Optional zone label name. If provided, a zone is also created.',
          },
          zoneColor: {
            type: 'string',
            description: 'Hex color for the zone (default: "#3b82f6")',
          },
        },
        required: ['polygon'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'place_furniture',
      description:
        'Place a furniture item from the catalog on the current level. Each item has a real 3D model. Available IDs: sofa, lounge-chair, livingroom-chair, stool, coffee-table, tv-stand, bookshelf, floor-lamp, ceiling-lamp, recessed-light, table-lamp, rectangular-carpet, round-carpet, indoor-plant, small-indoor-plant, cactus, double-bed, single-bed, bunkbed, bedside-table, closet, dresser, dining-table, dining-chair, office-table, office-chair, kitchen-counter, kitchen-cabinet, kitchen, stove, fridge, microwave, toilet, bathtub, bathroom-sink, shower-square, shower-angle, washing-machine, television, computer, stairs, column, piano, pool-table, coat-rack, trash-bin, picture, round-mirror, shelf. Use list_furniture to see all items with dimensions.',
      parameters: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description:
              'Catalog item ID (e.g., "sofa", "double-bed", "office-table"). See description for full list.',
          },
          position: {
            type: 'array',
            items: { type: 'number' },
            minItems: 3,
            maxItems: 3,
            description:
              'Position [x, y, z] in level coordinates. x = left/right, y = height offset (usually 0), z = front/back.',
          },
          rotation: {
            type: 'number',
            description:
              'Rotation around Y axis in degrees. 0 = facing -Z (south), 90 = facing -X (west), 180 = facing +Z (north), 270 = facing +X (east).',
          },
        },
        required: ['type'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'furnish_room',
      description:
        'Automatically furnish a room with appropriate furniture based on room type. Places furniture items using built-in layout presets. Supported room types: bedroom, living, kitchen, bathroom, dining, office.',
      parameters: {
        type: 'object',
        properties: {
          roomType: {
            type: 'string',
            enum: ['bedroom', 'living', 'kitchen', 'bathroom', 'dining', 'office'],
            description: 'Type of room to furnish',
          },
          origin: {
            type: 'array',
            items: { type: 'number' },
            minItems: 2,
            maxItems: 2,
            description: 'Bottom-left corner [x, z] of the room (default: [0, 0])',
          },
          width: {
            type: 'number',
            description: 'Room width along X axis in meters (default: 5)',
          },
          depth: {
            type: 'number',
            description: 'Room depth along Z axis in meters (default: 4)',
          },
        },
        required: ['roomType'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_hallway',
      description:
        'Create a hallway/corridor between two points. Creates two parallel walls and a floor slab. The hallway has no end walls so it can connect to rooms.',
      parameters: {
        type: 'object',
        properties: {
          from: {
            type: 'array',
            items: { type: 'number' },
            minItems: 2,
            maxItems: 2,
            description: 'Start center point [x, z] of the hallway',
          },
          to: {
            type: 'array',
            items: { type: 'number' },
            minItems: 2,
            maxItems: 2,
            description: 'End center point [x, z] of the hallway',
          },
          width: {
            type: 'number',
            description: 'Hallway width in meters (default: 1.2)',
          },
          wallHeight: {
            type: 'number',
            description: 'Wall height in meters (default: 2.8)',
          },
          wallThickness: {
            type: 'number',
            description: 'Wall thickness in meters (default: 0.15)',
          },
          addSlab: {
            type: 'boolean',
            description: 'Whether to add a floor slab (default: true)',
          },
        },
        required: ['from', 'to'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'list_furniture',
      description:
        'List all available furniture types in the catalog with their names, categories, and dimensions. Use this to check what furniture is available before placing items.',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_building_shell',
      description:
        'Create a complete building shell in one call: 4 walls + floor slab + ceiling + optional roof with door and windows. Ideal for creating a single-room building quickly.',
      parameters: {
        type: 'object',
        properties: {
          origin: {
            type: 'array',
            items: { type: 'number' },
            minItems: 2,
            maxItems: 2,
            description: 'Bottom-left corner [x, z] (default: [0, 0])',
          },
          width: {
            type: 'number',
            description: 'Building width along X axis in meters (default: 10)',
          },
          depth: {
            type: 'number',
            description: 'Building depth along Z axis in meters (default: 8)',
          },
          wallHeight: {
            type: 'number',
            description: 'Wall height in meters (default: 2.8)',
          },
          wallThickness: {
            type: 'number',
            description: 'Wall thickness in meters (default: 0.15)',
          },
          addRoof: {
            type: 'boolean',
            description: 'Whether to add a roof (default: true)',
          },
          roofType: {
            type: 'string',
            enum: ['gable', 'hip', 'shed', 'flat', 'gambrel', 'dutch', 'mansard'],
            description: 'Type of roof (default: "gable")',
          },
          ceilingHeight: {
            type: 'number',
            description: 'Ceiling height in meters (default: wallHeight - 0.3)',
          },
        },
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_furnished_apartment',
      description:
        'Create a multi-room apartment AND automatically furnish each room based on its name/type. Combines create_apartment + furnish_room. Room names like "客厅", "卧室", "厨房", "卫生间", "餐厅", "书房" are auto-detected for furniture placement.',
      parameters: {
        type: 'object',
        properties: {
          origin: {
            type: 'array',
            items: { type: 'number' },
            minItems: 2,
            maxItems: 2,
            description: 'Bottom-left corner [x, z] (default: [0, 0])',
          },
          rooms: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description:
                    'Room name (e.g., "客厅", "卧室", "厨房"). Name is used to auto-detect furniture type.',
                },
                width: {
                  type: 'number',
                  description: 'Room width along X axis in meters',
                },
                depth: {
                  type: 'number',
                  description: 'Room depth along Z axis in meters',
                },
                roomType: {
                  type: 'string',
                  enum: ['bedroom', 'living', 'kitchen', 'bathroom', 'dining', 'office'],
                  description:
                    'Explicit room type for furniture (optional, auto-detected from name)',
                },
                hasDoor: {
                  type: 'boolean',
                  description: 'Whether this room has a door (default: true)',
                },
                hasWindow: {
                  type: 'boolean',
                  description: 'Whether this room has windows (default: false)',
                },
              },
              required: ['name', 'width', 'depth'],
            },
            description: 'List of rooms. Rooms are laid out left-to-right, wrapping at maxRowWidth.',
          },
          wallHeight: {
            type: 'number',
            description: 'Wall height in meters (default: 2.8)',
          },
          wallThickness: {
            type: 'number',
            description: 'Wall thickness in meters (default: 0.15)',
          },
          maxRowWidth: {
            type: 'number',
            description: 'Maximum width before wrapping to next row (default: 20)',
          },
        },
        required: ['rooms'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'mirror_room',
      description:
        'Create a mirror copy of a room adjacent to the original. Useful for creating symmetrical layouts (e.g., two identical bedrooms side by side).',
      parameters: {
        type: 'object',
        properties: {
          sourceOrigin: {
            type: 'array',
            items: { type: 'number' },
            minItems: 2,
            maxItems: 2,
            description: 'Bottom-left corner [x, z] of the original room',
          },
          sourceWidth: {
            type: 'number',
            description: 'Width of the original room in meters',
          },
          sourceDepth: {
            type: 'number',
            description: 'Depth of the original room in meters',
          },
          axis: {
            type: 'string',
            enum: ['x', 'z'],
            description:
              'Mirror axis: "x" places new room to the right, "z" places it behind (default: "x")',
          },
          wallHeight: {
            type: 'number',
            description: 'Wall height in meters (default: 2.8)',
          },
          wallThickness: {
            type: 'number',
            description: 'Wall thickness in meters (default: 0.15)',
          },
          addDoor: {
            type: 'boolean',
            description: 'Whether to add a door (default: true)',
          },
          addWindows: {
            type: 'boolean',
            description: 'Whether to add windows (default: false)',
          },
          roomName: {
            type: 'string',
            description: 'Optional zone label name for the mirrored room',
          },
        },
        required: ['sourceOrigin', 'sourceWidth', 'sourceDepth'],
      },
    },
  },
  // ── Level Management Tools ──
  {
    type: 'function',
    function: {
      name: 'add_level',
      description:
        'Add a new level (floor) to the building. Automatically sets the level number. The new level becomes active.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Optional name for the level (e.g., "2nd Floor", "Attic")',
          },
        },
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'switch_level',
      description:
        'Switch the active level by level number or ID. Use list_levels to see available levels.',
      parameters: {
        type: 'object',
        properties: {
          level: {
            type: 'number',
            description: 'Level number (0 = ground floor, 1 = first floor, etc.)',
          },
          levelId: {
            type: 'string',
            description: 'Level node ID (alternative to level number)',
          },
        },
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'delete_level',
      description:
        'Delete a level and all its contents (walls, slabs, furniture, etc.). Cannot delete level 0 (ground floor).',
      parameters: {
        type: 'object',
        properties: {
          level: {
            type: 'number',
            description: 'Level number to delete',
          },
          levelId: {
            type: 'string',
            description: 'Level node ID (alternative to level number)',
          },
        },
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'rename_level',
      description: 'Rename a level. If no level specified, renames the active level.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'New name for the level',
          },
          level: {
            type: 'number',
            description: 'Level number to rename',
          },
          levelId: {
            type: 'string',
            description: 'Level node ID (alternative to level number)',
          },
        },
        required: ['name'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'duplicate_level',
      description:
        'Deep-copy all contents of a level (walls, doors, windows, slabs, ceilings, furniture, zones, roofs) to a new level. Great for creating multi-story buildings with identical floor plans. Supports horizontal offset for split-level/staggered buildings, and selective copying to include/exclude specific element types.',
      parameters: {
        type: 'object',
        properties: {
          sourceLevel: {
            type: 'number',
            description: 'Source level number to copy from (default: active level)',
          },
          sourceLevelId: {
            type: 'string',
            description: 'Source level ID (alternative to level number)',
          },
          name: {
            type: 'string',
            description: 'Name for the new level',
          },
          offset: {
            type: 'array',
            items: { type: 'number' },
            minItems: 2,
            maxItems: 2,
            description: 'Horizontal offset [dx, dz] in meters to shift all copied elements. Use for split-level or staggered buildings. Default: [0, 0]',
          },
          include: {
            type: 'array',
            items: { type: 'string' },
            description: 'Only copy these element types. Values: wall, slab, ceiling, zone, roof, door, window, item. If omitted, copies everything.',
          },
          exclude: {
            type: 'array',
            items: { type: 'string' },
            description: 'Skip these element types. Values: wall, slab, ceiling, zone, roof, door, window, item. Ignored if include is set.',
          },
          skipRoof: {
            type: 'boolean',
            description: 'Skip roof and roof segments (shortcut for exclude: ["roof"]). Useful for mid-floor duplication. Default: false',
          },
        },
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'list_levels',
      description:
        'List all levels in the building with their content counts (walls, slabs, zones, etc.). Shows which level is currently active.',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
  // ── Wall/Ceiling Attached Item Tools ──
  {
    type: 'function',
    function: {
      name: 'place_wall_item',
      description:
        'Place a wall-mounted item on a specific wall. Items include: picture, round-mirror, shelf, ev-wall-charger, thermostat, television, kitchen-counter, kitchen-cabinet, bathroom-sink, microwave, coat-rack. Use get_scene_info to find wall IDs first.',
      parameters: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: 'Catalog item ID for the wall item (e.g., "picture", "round-mirror", "shelf")',
          },
          wallId: {
            type: 'string',
            description: 'ID of the wall to attach the item to',
          },
          wallT: {
            type: 'number',
            description:
              'Position along the wall (0 = start, 0.5 = center, 1 = end). Default: 0.5',
          },
          heightOffset: {
            type: 'number',
            description: 'Height offset from floor in meters. Default: 1.2',
          },
          side: {
            type: 'string',
            enum: ['front', 'back'],
            description: 'Which side of the wall to place on. Default: front',
          },
        },
        required: ['type', 'wallId'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'place_ceiling_item',
      description:
        'Place a ceiling-mounted item. Items include: ceiling-lamp, recessed-light, smoke-detector, sprinkler. Automatically finds the ceiling on the current level.',
      parameters: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: 'Catalog item ID (e.g., "ceiling-lamp", "recessed-light", "smoke-detector")',
          },
          position: {
            type: 'array',
            items: { type: 'number' },
            minItems: 3,
            maxItems: 3,
            description: 'Position [x, y, z]. x/z = horizontal position, y = usually ceiling height.',
          },
          ceilingId: {
            type: 'string',
            description: 'Optional ceiling node ID. If omitted, uses first ceiling on active level.',
          },
        },
        required: ['type'],
      },
    },
  },
  // ── Spatial Validation ──
  {
    type: 'function',
    function: {
      name: 'validate_scene',
      description:
        'Validate and auto-correct spatial issues on the current level. Fixes: wall endpoint gaps (snaps within 5cm), furniture outside room boundaries (nudges inside), door/window overflows (clamps position). Also reports warnings for walls with gaps. Auto-runs after every scene modification, but can be called manually to inspect.',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
]

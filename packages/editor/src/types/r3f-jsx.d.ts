/// <reference types="@react-three/fiber" />

import type { ThreeElements } from '@react-three/fiber'

type PascalThreeIntrinsicElements = ThreeElements & {
  group: any
  mesh: any
  line: any
  lineSegments: any
  bufferGeometry: any
  planeGeometry: any
  shapeGeometry: any
  meshBasicMaterial: any
  lineBasicMaterial: any
  lineBasicNodeMaterial: any
  pointsMaterial: any
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends PascalThreeIntrinsicElements {}
  }

  namespace React {
    namespace JSX {
      interface IntrinsicElements extends PascalThreeIntrinsicElements {}
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends PascalThreeIntrinsicElements {}
  }
}

export {}

import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const rootDir = path.resolve(import.meta.dirname, '../..')
const outdir = path.join(rootDir, 'artifacts/agent-harness/.bundle')
const outfile = path.join(outdir, 'run.mjs')

await mkdir(outdir, { recursive: true })

await build({
  entryPoints: [path.join(rootDir, 'tooling/agent-harness/run.ts')],
  outfile,
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node24',
  conditions: ['source', 'node', 'import', 'default'],
  external: [
    'three',
    '@react-three/*',
    'react',
    'react-dom',
    'next',
  ],
  logLevel: 'silent',
})

await import(pathToFileURL(outfile).href)

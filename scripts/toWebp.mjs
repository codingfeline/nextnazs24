#!/usr/bin/env node
// Convert JPG/PNG/TIFF images to WebP using sharp.
// Run with --help for usage.

import { parseArgs } from 'node:util'
import { readdir, stat, mkdir, unlink } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const INPUT_EXT = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff'])

const HELP = `
Convert images to WebP.

Usage:
  npm run img:webp -- <file|dir>... [options]
  node scripts/toWebp.mjs <file|dir>... [options]

Directories are searched recursively for .jpg .jpeg .png .tif .tiff files.

Options:
  -q, --quality <0-100>   WebP quality (default 80)
  -w, --width <px>        Max width; never enlarges (default: keep size)
  -o, --out <dir>         Output directory (default: next to each source file)
      --lossless          Lossless WebP (--quality is ignored)
  -f, --force             Overwrite existing .webp files
  -d, --delete            Delete the source file after a successful conversion
  -h, --help              Show this help

Examples:
  npm run img:webp -- public/bg_css.jpg
  npm run img:webp -- public/bg_css.jpg -q 65 -w 1920
  npm run img:webp -- public/photos -o public/photos-webp -f
`

const fail = (message) => {
  console.error(`Error: ${message}\n\nRun with --help for usage.`)
  process.exit(1)
}

let args
try {
  args = parseArgs({
    allowPositionals: true,
    options: {
      quality: { type: 'string', short: 'q', default: '80' },
      width: { type: 'string', short: 'w' },
      out: { type: 'string', short: 'o' },
      lossless: { type: 'boolean', default: false },
      force: { type: 'boolean', short: 'f', default: false },
      delete: { type: 'boolean', short: 'd', default: false },
      help: { type: 'boolean', short: 'h', default: false },
    },
  })
} catch (err) {
  fail(err.message)
}

const { values, positionals } = args

if (values.help) {
  console.log(HELP)
  process.exit(0)
}
if (positionals.length === 0) fail('no input files or directories given')

const quality = Number(values.quality)
if (!Number.isInteger(quality) || quality < 0 || quality > 100) {
  fail('--quality must be an integer from 0 to 100')
}

const width = values.width === undefined ? undefined : Number(values.width)
if (width !== undefined && (!Number.isInteger(width) || width <= 0)) {
  fail('--width must be a positive integer')
}

const isImage = (file) => INPUT_EXT.has(path.extname(file).toLowerCase())

async function collect(target) {
  let info
  try {
    info = await stat(target)
  } catch {
    console.warn(`Skipping ${target}: not found`)
    return []
  }
  if (info.isFile()) {
    if (isImage(target)) return [target]
    console.warn(`Skipping ${target}: unsupported file type`)
    return []
  }
  const entries = await readdir(target, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(target, entry.name)
      if (entry.isDirectory()) return collect(full)
      return isImage(full) ? [full] : []
    })
  )
  return nested.flat()
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`

async function convert(source) {
  const outDir = values.out ?? path.dirname(source)
  const target = path.join(outDir, `${path.parse(source).name}.webp`)

  if (!values.force) {
    const exists = await stat(target).then(() => true, () => false)
    if (exists) {
      console.log(`skip     ${target} (exists, use --force to overwrite)`)
      return false
    }
  }

  await mkdir(outDir, { recursive: true })

  let pipeline = sharp(source).rotate() // apply EXIF orientation
  if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true })
  const result = await pipeline
    .webp(values.lossless ? { lossless: true } : { quality })
    .toFile(target)

  const before = (await stat(source)).size
  const change = Math.round((1 - result.size / before) * 100)
  console.log(
    `${source} -> ${target}  ${kb(before)} -> ${kb(result.size)} (${change >= 0 ? '-' : '+'}${Math.abs(change)}%)`
  )

  if (values.delete) await unlink(source)
  return true
}

const files = [...new Set((await Promise.all(positionals.map(collect))).flat())]
if (files.length === 0) fail('no convertible images found')

let converted = 0
let failed = 0
for (const file of files) {
  try {
    if (await convert(file)) converted++
  } catch (err) {
    failed++
    console.error(`failed   ${file}: ${err.message}`)
  }
}

console.log(`\nDone: ${converted} converted, ${files.length - converted - failed} skipped, ${failed} failed.`)
process.exit(failed > 0 ? 1 : 0)

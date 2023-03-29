import brotliPromise from 'brotli-wasm'

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 b'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['b', 'kb', 'mb']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export async function compressUrlCode(param: string, code: string) {
  if (!code) {
    const url = new URL(window.location.href)
    url.searchParams.delete(param)
    history.replaceState(null, '', url.toString())
    return
  }
  const brotli = await brotliPromise
  const textEncoder = new TextEncoder()
  const compressed = brotli.compress(textEncoder.encode(code))
  const url = new URL(window.location.href)
  url.searchParams.set(param, compressed.join('.'))
  history.replaceState(null, '', url.toString())
}

export async function decompressUrlCode(param: string) {
  const brotli = await brotliPromise
  const textDecoder = new TextDecoder()
  const compressedString = new URLSearchParams(window.location.search).get(
    param
  )
  if (!compressedString) return ''
  const compressed = Uint8Array.from(
    compressedString.split('.').map((n) => Number(n))
  )
  try {
    const decompressed = brotli.decompress(compressed)
    const code = textDecoder.decode(decompressed)
    return code
  } catch (error) {
    return ''
  }
}

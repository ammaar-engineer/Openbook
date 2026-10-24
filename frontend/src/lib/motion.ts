import type { CSSProperties } from 'react'

/**
 * Fade + rise an element in once when it mounts.
 * Works with tw-animate-css (`animate-in` and friends).
 */
export const revealIn =
  'animate-in fade-in-0 slide-in-from-bottom-1 duration-300 ease-out fill-mode-backwards motion-reduce:animate-none'

/**
 * Staggers `revealIn` for list items. Capped so long lists stay snappy.
 */
export function revealDelay(index: number, step = 40): CSSProperties {
  return { animationDelay: `${Math.min(index, 12) * step}ms` }
}

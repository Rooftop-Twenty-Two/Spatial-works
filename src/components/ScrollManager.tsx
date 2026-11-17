import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Client-side navigation keeps the previous scroll position, so on a route
 * change jump to the top — or to the `#hash` target (e.g. "/#projects" from
 * the About page). Same-page hash links are left to the browser's smooth scroll.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const prevPath = useRef(pathname)

  useEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname

    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' })
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

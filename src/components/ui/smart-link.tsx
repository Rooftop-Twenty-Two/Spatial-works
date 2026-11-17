import * as React from 'react'
import { Link } from 'react-router-dom'

type SmartLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/** True for same-site paths like "/about" or "/#projects" (not "//cdn…", "#x", "mailto:"). */
const isRoute = (href: string) => href.startsWith('/') && !href.startsWith('//')

/**
 * Drop-in replacement for `<a>`: internal routes navigate client-side via
 * React Router's `<Link>`; in-page hashes, mailto/tel and external URLs stay
 * plain anchors.
 */
export const SmartLink = React.forwardRef<HTMLAnchorElement, SmartLinkProps>(
  ({ href, ...props }, ref) =>
    isRoute(href) ? <Link ref={ref} to={href} {...props} /> : <a ref={ref} href={href} {...props} />,
)
SmartLink.displayName = 'SmartLink'

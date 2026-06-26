import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

import { ArrowButton } from '@/components/ui/button-with-icon'
import { OriginButton } from '@/components/ui/origin-button'

/* ------------------------------------------------------------------ */
/*  Shared primitives                                                  */
/* ------------------------------------------------------------------ */

export const Container = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => (
  <div className={`mx-auto w-full max-w-[1280px] px-6 md:px-10 ${className}`}>
    {children}
  </div>
)

/**
 * Build an href to an on-page section. On the homepage it's a bare hash
 * (smooth-scrolls); on any other route it points back to the homepage anchor.
 */
function useSectionHref() {
  const { pathname } = useLocation()
  return (id: string) => `${pathname === '/' ? '' : '/'}#${id}`
}

/** Jump to an in-page section (used by general OriginButtons). */
const goToHash = (id: string) => () => {
  window.location.hash = id
}

/* ------------------------------------------------------------------ */
/*  Navigation data                                                    */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = ['Solutions', 'Projects', 'About', 'News', 'Contact']

const NAV_LINKS: { label: string; id?: string; to?: string }[] = [
  { label: 'Projects', id: 'projects' },
  { label: 'About', to: '/about' },
  { label: 'News', id: 'news' },
]

/** Standalone pages reachable from the nav (everything else is a homepage section). */
const PAGE_ROUTES: Record<string, string> = { About: '/about', Contact: '/contact' }

const MENU_GROUPS = [
  {
    title: 'Solutions',
    items: ['3D Design Elements', 'Form at Wood', 'Cork & Gencork', 'Architectural Film', 'Design Glass Film'],
  },
  {
    title: 'Biophilic',
    items: ['Preserved Moss Walls', 'Vistafolia', 'Living Plant Walls'],
  },
  {
    title: 'Branding',
    items: ['Illuminated Signage', 'Wall Graphics', 'Branded Interiors', 'Wayfinding'],
  },
]

/* Featured project shown inside the Solutions mega menu — swap freely. */
const MEGA_FEATURED = {
  eyebrow: 'Featured project',
  title: 'Flagship Retail Feature Wall',
  location: 'Grafton St, Dublin',
  img: '/brand/project-retail.jpg',
  href: '#projects',
}

/* ------------------------------------------------------------------ */
/*  Header — sticky, mega menu, reveals on scroll-up                   */
/* ------------------------------------------------------------------ */

export function Header({ onOpenMobile }: { onOpenMobile: () => void }) {
  const [show, setShow] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [mega, setMega] = useState(false)
  const lastY = useRef(0)
  const sectionHref = useSectionHref()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      if (y < 80) setShow(true)
      else if (y > lastY.current + 4) setShow(false)
      else if (y < lastY.current - 4) setShow(true)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const visible = show || mega

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div
        className={`bg-sw-white ${scrolled ? 'shadow-[0_1px_0_rgba(2,2,25,0.08)]' : ''}`}
        onMouseLeave={() => setMega(false)}
      >
        <div className="flex h-16 w-full items-center justify-between px-6 md:h-20 md:px-10 lg:px-16">
          <a href="#top" aria-label="Spatial Works home" onMouseEnter={() => setMega(false)}>
            <img src="/brand/wordmark-orange.svg" alt="Spatial Works" className="h-5 w-auto md:h-6" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            <button
              type="button"
              onMouseEnter={() => setMega(true)}
              onClick={() => setMega((v) => !v)}
              className={`nav-link flex items-center gap-1.5 py-2 transition-colors ${
                mega ? 'text-sw-orange' : 'text-sw-black hover:text-sw-orange'
              }`}
              aria-expanded={mega}
            >
              Solutions
              <ChevronDown
                size={16}
                strokeWidth={2}
                className={`transition-transform duration-300 ${mega ? 'rotate-180' : ''}`}
              />
            </button>
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.to ?? sectionHref(l.id ?? '')}
                onMouseEnter={() => setMega(false)}
                className="nav-link py-2 text-sw-black transition-colors hover:text-sw-orange"
              >
                {l.label}
              </a>
            ))}
            <ArrowButton href="/contact" tone="dark" className="ml-2">
              Get in touch
            </ArrowButton>
          </nav>

          {/* Mobile trigger */}
          <button
            onClick={onOpenMobile}
            aria-label="Open menu"
            className="flex h-11 w-12 flex-col items-center justify-center gap-[5px] rounded-xl bg-sw-black transition-colors hover:bg-sw-orange lg:hidden"
          >
            <span className="block h-[2px] w-5 bg-sw-white" />
            <span className="block h-[2px] w-5 bg-sw-white" />
            <span className="block h-[2px] w-5 bg-sw-white" />
          </button>
        </div>

        {/* Mega menu panel */}
        <div
          onMouseEnter={() => setMega(true)}
          className={`overflow-hidden border-sw-black/5 transition-[max-height,opacity] duration-300 ease-out ${
            mega ? 'max-h-[560px] border-t opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="grid w-full grid-cols-1 gap-10 px-6 py-10 sm:grid-cols-2 md:px-10 lg:grid-cols-[1fr_1fr_1fr_1.25fr] lg:gap-12 lg:px-16">
            {MENU_GROUPS.map((g) => (
              <div key={g.title}>
                <span className="eyebrow text-graphite">{g.title}</span>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((it) => (
                    <li key={it}>
                      <a
                        href={sectionHref('solutions')}
                        onClick={() => setMega(false)}
                        className="track-display text-lg font-medium text-sw-black/70 transition-colors hover:text-sw-orange"
                      >
                        {it}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Featured project */}
            <a
              href={sectionHref('projects')}
              onClick={() => setMega(false)}
              className="group block sm:col-span-2 lg:col-span-1"
            >
              <div className="aspect-[16/10] w-full overflow-hidden rounded-xl ring-1 ring-sw-black/5">
                <img
                  src={MEGA_FEATURED.img}
                  alt={MEGA_FEATURED.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <span className="eyebrow mt-4 block text-sw-orange">{MEGA_FEATURED.eyebrow}</span>
              <h4 className="track-display mt-1.5 text-lg font-semibold text-sw-black transition-colors group-hover:text-sw-orange">
                {MEGA_FEATURED.title}
              </h4>
              <p className="mt-0.5 text-base text-graphite">{MEGA_FEATURED.location}</p>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/*  Full-screen overlay menu (mobile)                                  */
/* ------------------------------------------------------------------ */

function OverlayMenu({ onClose }: { onClose: () => void }) {
  const sectionHref = useSectionHref()
  const itemHref = (item: string) => PAGE_ROUTES[item] ?? sectionHref(item.toLowerCase())
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-sw-black text-sw-white">
      <Container className="flex items-center justify-between py-6 md:py-8">
        <img src="/brand/wordmark-white.svg" alt="Spatial Works" className="h-5 w-auto md:h-6" />
        <button
          onClick={onClose}
          className="eyebrow rounded-lg bg-sw-orange px-5 py-3 text-sw-white transition-colors hover:bg-sw-white hover:text-sw-black"
          aria-label="Close menu"
        >
          Close ✕
        </button>
      </Container>

      <Container className="grid grid-cols-1 gap-14 pb-20 pt-8 md:grid-cols-12 md:pt-16">
        <nav className="md:col-span-5">
          <span className="eyebrow text-graphite">Menu</span>
          <ul className="mt-6 space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <a
                  href={itemHref(item)}
                  onClick={onClose}
                  className="track-display block text-4xl font-semibold leading-tight transition-colors hover:text-steel md:text-6xl"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 md:col-span-7">
          {MENU_GROUPS.map((g) => (
            <div key={g.title}>
              <span className="eyebrow text-steel">{g.title}</span>
              <ul className="mt-5 space-y-3">
                {g.items.map((it) => (
                  <li key={it}>
                    <a
                      href={sectionHref('solutions')}
                      onClick={onClose}
                      className="text-lg text-steel transition-colors hover:text-sw-white"
                    >
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="sm:col-span-3">
            <a
              href="mailto:hello@spatialworks.ie"
              onClick={onClose}
              className="track-display text-2xl font-medium text-sw-white underline decoration-sw-white/40 decoration-2 underline-offset-8 hover:decoration-sw-white"
            >
              hello@spatialworks.ie
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Hero — edge-to-edge rounded image, soft scrim                      */
/* ------------------------------------------------------------------ */

export function Hero() {
  return (
    <section id="top" className="bg-sw-white px-3 pb-3 md:px-4 md:pb-4">
      <div className="relative flex min-h-[86vh] flex-col overflow-hidden rounded-[20px] bg-sw-black md:rounded-[28px]">
        {/* Full-bleed project image fills the panel */}
        <img
          src="/brand/hero-project.jpg"
          alt="Spatial Works signage installation on an architectural facade"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        {/* Soft scrim — bottom-weighted so the headline stays legible */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-sw-black/30 via-sw-black/5 to-sw-black/65" />

        {/* Center stage — headline over the image */}
        <div className="relative z-20 flex flex-1 items-center pt-16 md:pt-20">
          <Container className="[&_*]:[text-shadow:0_2px_44px_rgba(2,2,25,0.55)]">
            <h1 className="track-display max-w-[14ch] text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.92] text-sw-white">
              Exceptional spaces, expertly crafted
            </h1>
          </Container>
        </div>

        {/* Bottom bar — supporting copy + services CTA */}
        <div className="relative z-30 flex flex-col gap-8 p-6 md:flex-row md:items-end md:justify-between md:p-10">
          <p className="max-w-md text-lg leading-relaxed text-sw-white/85">
            We design, supply and install signage, feature walls and branded
            interiors for retail, hospitality and corporate spaces. You tell us
            what you need — we deliver, without delay.
          </p>
          <ArrowButton href="#solutions" tone="light">
            Our services
          </ArrowButton>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Why Spatial Works  (white, monochrome index)                       */
/* ------------------------------------------------------------------ */

/* Bespoke geometric icon set — built from the same flat, angular geometry as the
   Spatial Works emblem, drawn in a single consistent line weight. */
type IconProps = { className?: string }

const iconBase = {
  viewBox: '0 0 32 32',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

// Layered surfaces — materials & finishes expertise
export function IconExpertise({ className = '' }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M16 4 28 11 16 18 4 11 Z" />
      <path d="M4 16 16 23 28 16" />
      <path d="M4 21 16 28 28 21" />
    </svg>
  )
}

// Solid dimensional block — built to last
export function IconDurable({ className = '' }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M16 3 28 9.5 28 22.5 16 29 4 22.5 4 9.5 Z" />
      <path d="M4 9.5 16 16 28 9.5" />
      <path d="M16 16 16 29" />
    </svg>
  )
}

// Forward chevrons — no-delay delivery
export function IconSpeed({ className = '' }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M7 7 16 16 7 25" />
      <path d="M17 7 26 16 17 25" />
    </svg>
  )
}

const PILLARS = [
  {
    icon: IconExpertise,
    title: 'Hands-on expertise',
    body: 'Founded by an industry veteran. We understand the materials and the process, not just the render.',
  },
  {
    icon: IconDurable,
    title: 'Built to last',
    body: 'Durable, practical finishes specified for commercial wear — from fit-out day one to year ten.',
  },
  {
    icon: IconSpeed,
    title: 'No-delay delivery',
    body: 'A straightforward process that cuts the back-and-forth. When we promise, we deliver.',
  },
]

export function Why() {
  return (
    <section id="about" className="bg-sw-white py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <h2 className="track-display col-span-1 text-3xl font-semibold leading-[1.02] md:col-span-6 md:text-5xl">
            Feature walls, branded interiors,{' '}
            <span className="text-sw-orange">architectural finishes</span>
          </h2>
          <p className="col-span-1 self-end text-lg leading-relaxed text-graphite md:col-span-5 md:col-start-8">
            Spatial Works is a Dublin studio specialising in the design, supply
            and installation of feature environments for commercial spaces. We
            bridge vision and practicality — striking designs that are
            fundamentally robust and made to be installed.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 md:mt-20 md:grid-cols-3">
          {PILLARS.map((p) => {
            const Icon = p.icon
            return (
              <div key={p.title} className="border-t border-sw-black/15 pt-6">
                <Icon className="h-9 w-9 text-sw-orange" />
                <h3 className="track-display mt-5 text-2xl font-semibold text-sw-black md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-xs text-lg leading-relaxed text-graphite">
                  {p.body}
                </p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Showcase — image expands from the side to near-full on scroll      */
/* ------------------------------------------------------------------ */

export function ShowcaseScroll() {
  const trackRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const apply = () => {
      const el = trackRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      // 0 → image in the right column, 1 → image nearly fills the viewport.
      // Finish the expansion a touch early so it settles full before unpinning.
      const raw = total > 0 ? -rect.top / total : 0
      const p = Math.min(Math.max(raw / 0.82, 0), 1)

      const box = boxRef.current
      if (box) {
        const inset = 10 - p * 6
        box.style.left = `${50 - p * 47}%`
        box.style.top = `${inset}%`
        box.style.bottom = `${inset}%`
      }
      const text = textRef.current
      if (text) {
        text.style.opacity = `${Math.max(0, 1 - p * 1.9)}`
        text.style.transform = `translate3d(${-p * 40}px,0,0)`
      }
    }

    // One update per frame, tracking the scroll 1:1 (no easing lag) and writing
    // straight to the DOM — no React re-renders.
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        apply()
        ticking = false
      })
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section className="bg-sw-white">
      <div ref={trackRef} className="relative h-[170vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {/* Text — fades as the image takes over */}
          <Container className="relative z-10 w-full">
            <div ref={textRef} className="max-w-md [will-change:transform,opacity]">
              <span className="eyebrow text-sw-orange">Our work</span>
              <h2 className="track-display mt-5 text-3xl font-semibold leading-[1.05] md:text-5xl">
                Spaces people remember
              </h2>
              <p className="mt-5 max-w-sm text-lg leading-relaxed text-graphite">
                From a single feature wall to a full branded fit-out, we design
                and install environments that earn their keep — and keep earning.
              </p>
              <ArrowButton href="#projects" tone="dark" className="mt-8">
                See projects
              </ArrowButton>
            </div>
          </Container>

          {/* Expanding image */}
          <div
            ref={boxRef}
            className="absolute overflow-hidden rounded-2xl ring-1 ring-sw-black/5"
            style={{ left: '50%', right: '3%', top: '10%', bottom: '10%' }}
          >
            <img
              src="/brand/project-retail.jpg"
              alt="A finished Spatial Works retail environment"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Solutions — condensed index list  (white)                          */
/* ------------------------------------------------------------------ */

const SOLUTIONS: { title: string; body: string }[] = [
  { title: 'Preserved Moss Walls', body: 'Living-look biophilic walls. Zero light, zero maintenance.' },
  { title: 'Vistafolia', body: 'Premium artificial green walls, fire-rated for commercial use.' },
  { title: '3D Design Elements', body: 'Sculpted feature surfaces that add depth and shadow.' },
  { title: 'Cork & Gencork', body: 'Acoustic, sustainable textured panels with warmth.' },
  { title: 'Form at Wood', body: 'Flexible timber slat systems that wrap any geometry.' },
  { title: 'Architectural Film', body: 'Resurface doors, walls and joinery — without the rebuild.' },
  { title: 'Design Glass Film', body: 'Privacy, branding and decorative glazing in one layer.' },
  { title: 'Wonderwall Studios', body: 'Reclaimed timber wall art, panel by panel.' },
  { title: 'Wall Rapture', body: 'Bespoke printed wallcoverings at architectural scale.' },
]

export function Solutions() {
  return (
    <section id="solutions" className="bg-sw-white py-20 md:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="track-display max-w-2xl text-3xl font-semibold leading-[1.02] md:text-5xl">
            A finish for every surface, brief and budget
          </h2>
          <OriginButton onClick={goToHash('solutions')}>All solutions</OriginButton>
        </div>

        <div className="mt-12 grid grid-cols-1 border-t border-sw-black/10 md:grid-cols-2 md:gap-x-16">
          {SOLUTIONS.map((s, i) => (
            <a
              key={s.title}
              href="#solutions"
              className="group flex items-center justify-between gap-6 border-b border-sw-black/10 py-5"
            >
              <div className="flex items-baseline gap-5">
                <span className="eyebrow text-steel">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="track-display text-xl font-medium transition-colors group-hover:text-sw-orange md:text-2xl">
                  {s.title}
                </span>
              </div>
              <div className="flex items-center gap-8">
                <span className="hidden max-w-xs text-base text-graphite xl:block">
                  {s.body}
                </span>
                <span className="text-graphite transition-all duration-200 group-hover:translate-x-1 group-hover:text-sw-orange">
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Featured Projects — slow horizontal case-study rail  (black)       */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  { title: 'Flagship Retail Feature Wall', sector: 'Retail', location: 'Grafton St, Dublin', img: '/brand/project-retail.jpg' },
  { title: 'Hospitality Lounge Biophilic', sector: 'Hospitality', location: 'Docklands, Dublin', img: '/brand/project-hospitality.jpg' },
  { title: 'Corporate HQ Reception', sector: 'Corporate', location: 'Sandyford, Dublin', img: '/brand/project-corporate.jpg' },
  { title: 'Preserved Moss Installation', sector: 'Biophilic', location: 'Grafton St, Dublin', img: '/brand/news-project.jpg' },
  { title: 'Illuminated Facade Signage', sector: 'Signage', location: 'City Centre, Dublin', img: '/brand/hero-project.jpg' },
  { title: 'Material & Finish Library', sector: 'Studio', location: 'Spatial Works, Dublin', img: '/brand/news-materials.jpg' },
]

function ProjectCard({ p }: { p: (typeof PROJECTS)[number] }) {
  return (
    <a href="#projects" className="group block w-[78vw] shrink-0 sm:w-[360px] md:w-[400px]">
      <div className="aspect-[4/5] w-full overflow-hidden rounded-xl ring-1 ring-sw-white/10">
        <img
          src={p.img}
          alt={p.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4">
        <span className="eyebrow text-steel">{p.sector}</span>
        <h3 className="track-display mt-2 text-xl font-medium">{p.title}</h3>
        <p className="mt-1 text-base text-steel">{p.location}</p>
      </div>
    </a>
  )
}

export function Projects() {
  return (
    <section id="projects" className="overflow-hidden bg-sw-black py-20 text-sw-white md:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="track-display max-w-2xl text-3xl font-semibold leading-[1.02] md:text-5xl">
            Recent installations across Dublin
          </h2>
          <ArrowButton href="#projects" tone="light">
            All projects
          </ArrowButton>
        </div>
      </Container>

      <div className="marquee-track relative mt-12 md:mt-16">
        <div className="flex w-max animate-marquee gap-6 pl-6 md:pl-10">
          {[...PROJECTS, ...PROJECTS].map((p, i) => (
            <ProjectCard key={`${p.title}-${i}`} p={p} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-sw-black to-transparent md:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-sw-black to-transparent md:w-16" />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Testimonials — carousel + trusted-by logo rail  (white)            */
/* ------------------------------------------------------------------ */

export const TESTIMONIALS = [
  {
    quote:
      'They turned a blank wall into the first thing every customer photographs. On site, on budget, no drama — we have no hesitation recommending Spatial Works.',
    name: 'Naomi Hughes',
    title: 'Store Design Lead',
    brand: 'Harbourview Retail',
    logo: '/brand/clients/harbourview.svg',
  },
  {
    quote:
      'Spatial Works understood the material constraints before we did. The install was faster and cleaner than anything we had seen on a fit-out of this scale.',
    name: 'Cian Doyle',
    title: 'Operations Director',
    brand: 'The Dock House',
    logo: '/brand/clients/dock-house.svg',
  },
  {
    quote:
      'From concept to fitted in three weeks. Our reception finally looks like the company we actually are — knowledgeable, professional and a pleasure to work with.',
    name: 'Aoife Brennan',
    title: 'Facilities Manager',
    brand: 'Meridian Workspaces',
    logo: '/brand/clients/meridian.svg',
  },
]

export const CLIENTS = [
  { name: 'Harbourview', logo: '/brand/clients/harbourview.svg' },
  { name: 'Dock House', logo: '/brand/clients/dock-house.svg' },
  { name: 'Meridian', logo: '/brand/clients/meridian.svg' },
  { name: 'Northside', logo: '/brand/clients/northside.svg' },
  { name: 'Liffey & Co', logo: '/brand/clients/liffey.svg' },
  { name: 'Grafton', logo: '/brand/clients/grafton.svg' },
  { name: 'Aurora', logo: '/brand/clients/aurora.svg' },
  { name: 'Quay', logo: '/brand/clients/quay.svg' },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = TESTIMONIALS.length
  const go = (delta: number) => setIndex((prev) => (prev + delta + count) % count)

  // Auto-advance every 5s. The timer re-arms whenever `index` changes, so a manual
  // click (or a pause) resets the countdown rather than jumping early.
  useEffect(() => {
    if (paused) return
    const id = setTimeout(() => setIndex((p) => (p + 1) % count), 5000)
    return () => clearTimeout(id)
  }, [index, count, paused])

  const arrowBtn =
    'flex h-10 w-10 items-center justify-center rounded-full border border-sw-black/15 text-base text-graphite transition-colors hover:border-sw-black/40 hover:text-sw-black'

  return (
    <section
      id="testimonials"
      className="bg-sw-white py-20 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container>
        <h2 className="track-display text-center text-3xl font-semibold md:text-5xl">
          A trusted partner
        </h2>

        {/* Every quote occupies the same grid cell, so the block keeps the height of
            the tallest testimonial — the controls below never shift. Crossfade on change. */}
        <div className="mx-auto mt-12 grid max-w-3xl">
          {TESTIMONIALS.map((item, i) => (
            <figure
              key={item.brand}
              aria-hidden={i !== index}
              className={`col-start-1 row-start-1 flex h-full flex-col transition-opacity duration-500 ease-out ${
                i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <blockquote className="track-body text-center text-2xl leading-snug text-sw-black md:text-[2rem] md:leading-[1.3]">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-auto flex flex-col items-center justify-between gap-6 pt-10 md:flex-row">
                <div className="text-center md:text-left">
                  <div className="track-display text-xl font-semibold text-sw-black">
                    {item.name}
                  </div>
                  <div className="mt-1 text-base text-sw-orange">
                    {item.title} at {item.brand}
                  </div>
                </div>
                <img src={item.logo} alt={item.brand} className="h-8 w-auto md:h-9" />
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Carousel controls — subtle, fixed position at the foot of the section */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className={arrowBtn}>
            ←
          </button>
          <button onClick={() => go(1)} aria-label="Next testimonial" className={arrowBtn}>
            →
          </button>
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Trusted by — logo band beneath the hero                            */
/* ------------------------------------------------------------------ */

export function TrustedBy() {
  return (
    <section className="border-b border-sw-black/10 bg-sw-white">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:gap-14 md:py-14">
        <h2 className="track-display max-w-xs shrink-0 text-2xl font-semibold leading-[1.1] text-sw-black md:text-3xl">
          Trusted by leading commercial brands
        </h2>
        <div className="marquee-track relative min-w-0 flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-14 md:gap-20">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <img
                key={`${c.name}-${i}`}
                src={c.logo}
                alt={c.name}
                className="h-8 w-auto shrink-0 md:h-10"
              />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-sw-white to-transparent md:w-24" />
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Company News  (white)                                              */
/* ------------------------------------------------------------------ */

const NEWS = [
  {
    date: 'June 2026',
    cat: 'Studio',
    title: 'Spatial Works opens a new fabrication workshop in Dublin',
    img: '/brand/news-studio.jpg',
  },
  {
    date: 'May 2026',
    cat: 'Project',
    title: 'Preserved moss feature wall completed for a Grafton St flagship',
    img: '/brand/news-project.jpg',
  },
  {
    date: 'April 2026',
    cat: 'Materials',
    title: 'Now offering fire-rated Vistafolia for hospitality fit-outs',
    img: '/brand/news-materials.jpg',
  },
]

export function CompanyNews() {
  return (
    <section id="news" className="bg-sw-white py-20 md:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="track-display max-w-2xl text-3xl font-semibold leading-[1.02] md:text-5xl">
            Company news
          </h2>
          <OriginButton onClick={goToHash('news')}>All news</OriginButton>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3">
          {NEWS.map((n) => (
            <a key={n.title} href="#news" className="group block">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-xl">
                <img
                  src={n.img}
                  alt={n.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className="eyebrow text-sw-orange">{n.cat}</span>
                <span className="text-steel">·</span>
                <span className="text-base text-graphite">{n.date}</span>
              </div>
              <h3 className="track-display mt-2 text-xl font-medium leading-snug transition-colors group-hover:text-sw-orange">
                {n.title}
              </h3>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Contact — image-first  (black)                                     */
/* ------------------------------------------------------------------ */

export function CtaBand() {
  return (
    <section id="contact" className="bg-sw-black text-sw-white">
      <Container className="grid grid-cols-1 items-center gap-14 py-20 md:grid-cols-2 md:gap-16 md:py-28">
        <div className="order-2 md:order-1">
          <img
            src="/brand/emblem-white.svg"
            alt=""
            aria-hidden="true"
            className="h-10 w-auto opacity-90"
          />
          <h2 className="track-display mt-10 max-w-[14ch] text-3xl font-semibold leading-[1.08] md:text-5xl">
            Connect with us
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-steel">
            Tell us about the space and our team will handle design, supply and
            installation.
          </p>
          <ArrowButton href="/contact" tone="light" className="mt-9">
            Contact our team
          </ArrowButton>
        </div>

        <div className="order-1 grid grid-cols-2 gap-4 md:order-2">
          <div className="aspect-[3/4] overflow-hidden rounded-xl ring-1 ring-sw-white/10">
            <img
              src="/brand/project-corporate.jpg"
              alt="Corporate interior installation by Spatial Works"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-[3/4] overflow-hidden rounded-xl ring-1 ring-sw-white/10">
            <img
              src="/brand/project-hospitality.jpg"
              alt="Hospitality feature wall by Spatial Works"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Footer  (black)                                                    */
/* ------------------------------------------------------------------ */

export function Footer() {
  const sectionHref = useSectionHref()
  return (
    <footer className="bg-sw-black text-sw-white">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src="/brand/wordmark-white.svg" alt="Spatial Works" className="h-6 w-auto" />
            <p className="mt-6 max-w-xs text-lg leading-relaxed text-steel">
              Design, supply and installation of feature environments for
              commercial spaces. Dublin, Ireland.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <span className="eyebrow text-graphite">Explore</span>
            <ul className="mt-5 space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <a
                    href={PAGE_ROUTES[item] ?? sectionHref(item.toLowerCase())}
                    className="text-lg text-steel transition-colors hover:text-sw-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <span className="eyebrow text-graphite">Get in touch</span>
            <ul className="mt-5 space-y-3 text-lg text-steel">
              <li>
                <a href="mailto:hello@spatialworks.ie" className="transition-colors hover:text-sw-white">
                  hello@spatialworks.ie
                </a>
              </li>
              <li>Dublin, Ireland</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-sw-white/12 pt-6 text-base text-steel md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Spatial Works. All rights reserved.</span>
          <span className="eyebrow text-graphite">Exceptional spaces, expertly crafted</span>
        </div>
      </Container>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/*  Site shell — header, fixed-header spacer, footer + mobile menu      */
/* ------------------------------------------------------------------ */

export function SiteShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <div className="min-h-screen bg-sw-white text-sw-black track-body">
      <Header onOpenMobile={() => setMobileOpen(true)} />
      <div className="h-16 md:h-20" />
      {children}
      <Footer />
      {mobileOpen && <OverlayMenu onClose={() => setMobileOpen(false)} />}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Homepage                                                           */
/* ------------------------------------------------------------------ */

export function Page() {
  return (
    <SiteShell>
      <Hero />
      <TrustedBy />
      <main>
        <Why />
        <ShowcaseScroll />
        <Solutions />
        <Projects />
        <Testimonials />
        <CompanyNews />
        <CtaBand />
      </main>
    </SiteShell>
  )
}

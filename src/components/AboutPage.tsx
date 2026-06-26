import { useEffect } from 'react'

import { ArrowButton } from '@/components/ui/button-with-icon'
import {
  CLIENTS,
  Container,
  CtaBand,
  IconDurable,
  IconExpertise,
  IconSpeed,
  SiteShell,
  TESTIMONIALS,
} from '@/components/Sections'

/* ------------------------------------------------------------------ */
/*  PLACEHOLDER CONTENT — filler copy + stand-in logos, testimonial and  */
/*  case study to size the sections. The client logos (CLIENTS) are       */
/*  placeholder marks, the testimonial is fictional, and the case study   */
/*  below is a stand-in. Replace ALL of it with real proof before launch. */
/* ------------------------------------------------------------------ */

// PLACEHOLDER — featured project case study (stand-in copy + reused image).
const CASE_STUDY = {
  title: 'Flagship Retail Feature Wall',
  meta: 'Retail · Grafton St, Dublin',
  summary:
    'A full-height feature wall and illuminated signage for a flagship store — designed, fabricated and installed in a six-week window around a live retail floor.',
  img: '/brand/project-retail.jpg',
  href: '/#projects',
}

// PLACEHOLDER — single featured quote pulled from the (fictional) testimonial set.
const FEATURED_QUOTE = TESTIMONIALS[0]

const SECTORS = [
  {
    name: 'Retail',
    line: 'Storefronts, feature walls and in-store branding that earn a second look.',
    img: '/brand/project-retail.jpg',
  },
  {
    name: 'Hospitality',
    line: 'Lobbies, bars and restaurants where the finish sets the tone.',
    img: '/brand/project-hospitality.jpg',
  },
  {
    name: 'Corporate',
    line: 'Receptions, workspaces and wayfinding that look like the company.',
    img: '/brand/project-corporate.jpg',
  },
]

const VALUES = [
  {
    icon: IconExpertise,
    title: 'One team, start to finish',
    body: 'Design, supply and installation under one roof — no handoff between someone who drew it and someone who never saw the drawing.',
  },
  {
    icon: IconDurable,
    title: 'Specified for real use',
    body: 'Commercial-grade materials chosen for wear, cleaning and compliance, so a space looks right on opening day and years after it.',
  },
  {
    icon: IconSpeed,
    title: 'Straight answers',
    body: 'Honest timelines and honest costs. If something will not work or will not last, we say so before it is built, not after.',
  },
]

export function AboutPage() {
  useEffect(() => {
    document.title = 'About — Spatial Works'
    window.scrollTo(0, 0)
  }, [])

  return (
    <SiteShell>
      <main>
        {/* Hero — same framed panel as the homepage, but short, with the
            heading set over a studio image rather than a full-height statement. */}
        <section className="bg-sw-white px-3 pb-3 md:px-4 md:pb-4">
          <div className="relative flex min-h-[44vh] flex-col justify-end overflow-hidden rounded-[20px] bg-sw-black md:min-h-[52vh] md:rounded-[28px]">
            <img
              src="/brand/news-studio.jpg"
              alt="Inside the Spatial Works fabrication workshop"
              className="absolute inset-0 z-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-sw-black/85 via-sw-black/35 to-sw-black/5" />
            <div className="relative z-20 p-6 md:p-10 [&_*]:[text-shadow:0_2px_30px_rgba(2,2,25,0.5)]">
              <span className="eyebrow text-sw-white/80">About</span>
              <h1 className="track-display mt-4 max-w-[18ch] text-4xl font-bold leading-[1.0] text-sw-white md:text-6xl">
                One team, from first sketch to final fix
              </h1>
            </div>
          </div>
        </section>

        {/* Intro statement — lead on the left, supporting paragraphs on the right */}
        <section className="bg-sw-white py-16 md:py-24">
          <Container className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
            <p className="track-body text-2xl leading-snug text-sw-black md:col-span-7 md:text-[1.75rem] md:leading-[1.35]">
              We&apos;re a Dublin studio that designs, supplies and installs the
              parts of a space people actually notice — the signage, the feature
              walls, the finishes and the branded detail.
            </p>
            <div className="space-y-5 self-end md:col-span-5 md:col-start-8">
              <p className="text-lg leading-relaxed text-graphite">
                Because the same team handles design and installation, what gets
                drawn is what gets built. There&apos;s no gap between a nice visual
                and a buildable detail, and no surprises when the install crew
                turns up on site.
              </p>
              <p className="text-lg leading-relaxed text-graphite">
                We work across retail, hospitality and corporate fit-outs, usually
                alongside the architects, contractors and brand teams who need a
                specialist to own the finish.
              </p>
            </div>
          </Container>
        </section>

        {/* Large image band */}
        <section className="bg-sw-white pb-16 md:pb-24">
          <Container>
            <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl ring-1 ring-sw-black/5">
              <img
                src="/brand/news-materials.jpg"
                alt="Materials and finishes in the Spatial Works studio"
                className="h-full w-full object-cover"
              />
            </div>
          </Container>
        </section>

        {/* Approach — text + framed image */}
        <section className="bg-sw-white pb-16 md:pb-24">
          <Container className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <h2 className="track-display text-3xl font-semibold leading-[1.05] md:text-5xl">
                Practical by default
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-graphite">
                We start with how a space gets built, not just how it looks in a
                render — materials that hold up to commercial use, details that can
                actually be installed, and a straight read on cost and lead time
                before anything is committed.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-graphite">
                That discipline runs from the first conversation to the last
                fixing: we measure twice, specify for the room rather than the
                photo, and keep one point of contact across the whole job.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-graphite">
                The result is a finish that reads well on opening day and keeps
                reading well long after the install team has gone.
              </p>
            </div>

            <div className="md:col-span-5 md:col-start-8">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-sw-black/5">
                <img
                  src="/brand/project-hospitality.jpg"
                  alt="A Spatial Works installation in a hospitality space"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Sectors — three image cards */}
        <section className="bg-sw-white pb-16 md:pb-24">
          <Container>
            <h2 className="track-display max-w-2xl text-3xl font-semibold leading-[1.02] md:text-5xl">
              Where we work
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3">
              {SECTORS.map((s) => (
                <a key={s.name} href="/#projects" className="group block">
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-xl">
                    <img
                      src={s.img}
                      alt={`${s.name} work by Spatial Works`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="track-display mt-4 text-xl font-medium transition-colors group-hover:text-sw-orange">
                    {s.name}
                  </h3>
                  <p className="mt-1 max-w-xs text-base leading-relaxed text-graphite">
                    {s.line}
                  </p>
                </a>
              ))}
            </div>
          </Container>
        </section>

        {/* Featured project case study — image + summary */}
        <section className="bg-sw-white pb-16 md:pb-24">
          <Container className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-sw-black/5">
                <img
                  src={CASE_STUDY.img}
                  alt={CASE_STUDY.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-5">
              <span className="eyebrow text-sw-orange">Featured project</span>
              <h2 className="track-display mt-4 text-3xl font-semibold leading-[1.05] md:text-4xl">
                {CASE_STUDY.title}
              </h2>
              <p className="mt-2 text-base text-graphite">{CASE_STUDY.meta}</p>
              <p className="mt-6 text-lg leading-relaxed text-graphite">{CASE_STUDY.summary}</p>
              <ArrowButton href={CASE_STUDY.href} tone="dark" className="mt-8">
                View the work
              </ArrowButton>
            </div>
          </Container>
        </section>

        {/* Testimonial block — single featured quote */}
        <section className="bg-sw-white pb-16 md:pb-24">
          <Container>
            <figure className="max-w-3xl">
              <blockquote className="track-body text-2xl leading-snug text-sw-black md:text-[2rem] md:leading-[1.3]">
                “{FEATURED_QUOTE.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-5">
                <img src={FEATURED_QUOTE.logo} alt={FEATURED_QUOTE.brand} className="h-8 w-auto" />
                <div>
                  <div className="track-display text-lg font-semibold text-sw-black">
                    {FEATURED_QUOTE.name}
                  </div>
                  <div className="text-base text-sw-orange">
                    {FEATURED_QUOTE.title} at {FEATURED_QUOTE.brand}
                  </div>
                </div>
              </figcaption>
            </figure>
          </Container>
        </section>

        {/* Trusted-by logo grid */}
        <section className="bg-sw-white pb-16 md:pb-24">
          <Container>
            <h2 className="track-display max-w-2xl text-3xl font-semibold leading-[1.02] md:text-5xl">
              Brands we work with
            </h2>
            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-sw-black/10 bg-sw-black/10 sm:grid-cols-4">
              {CLIENTS.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-center bg-sw-white px-6 py-10"
                >
                  <img src={c.logo} alt={c.name} className="h-7 w-auto opacity-70 md:h-8" />
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* What we stand for — pillars */}
        <section className="bg-sw-white pb-16 md:pb-24">
          <Container>
            <h2 className="track-display max-w-2xl text-3xl font-semibold leading-[1.02] md:text-5xl">
              How it is to work with us
            </h2>

            <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:mt-16 md:grid-cols-3">
              {VALUES.map((v) => {
                const Icon = v.icon
                return (
                  <div key={v.title} className="border-t border-sw-black/15 pt-6">
                    <Icon className="h-9 w-9 text-sw-orange" />
                    <h3 className="track-display mt-5 text-2xl font-semibold text-sw-black md:text-3xl">
                      {v.title}
                    </h3>
                    <p className="mt-3 max-w-xs text-lg leading-relaxed text-graphite">
                      {v.body}
                    </p>
                  </div>
                )
              })}
            </div>
          </Container>
        </section>

        {/* Close — site's image-first contact CTA */}
        <CtaBand />
      </main>
    </SiteShell>
  )
}

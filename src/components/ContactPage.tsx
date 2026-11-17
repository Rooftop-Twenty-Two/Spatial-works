import { useEffect, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'

import { ArrowButton } from '@/components/ui/button-with-icon'
import { Container, SiteShell } from '@/components/Sections'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PROJECT_TYPES = [
  'Signage',
  'Feature walls',
  'Branded interiors',
  'Architectural finishes',
  'Biophilic / green walls',
  'Something else',
]

const DETAILS: { label: string; value: string; href?: string }[] = [
  { label: 'Email', value: 'hello@spatialworks.ie', href: 'mailto:hello@spatialworks.ie' },
  { label: 'Phone', value: '+353 1 555 0123', href: 'tel:+35315550123' },
  { label: 'Studio', value: 'Dublin, Ireland' },
  { label: 'Hours', value: 'Mon–Fri, 9:00–17:30' },
]

/* ------------------------------------------------------------------ */
/*  Form fields                                                        */
/* ------------------------------------------------------------------ */

const inputCls =
  'w-full rounded-xl border border-sw-black/15 bg-sw-white px-4 py-3 text-base text-sw-black transition-colors placeholder:text-steel focus:border-sw-black focus:outline-none focus:ring-2 focus:ring-sw-orange/25'

function FieldLabel({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <span className="mb-2 block text-base font-medium text-sw-black">
      {children}
      {required && <span className="text-sw-orange"> *</span>}
    </span>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <label className="block">
      <FieldLabel required={required}>{label}</FieldLabel>
      <input className={inputCls} name={name} type={type} required={required} placeholder={placeholder} />
    </label>
  )
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <select className={`${inputCls} appearance-none`} name={name} defaultValue="">
        <option value="" disabled>
          Select an option
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}

/* ------------------------------------------------------------------ */
/*  Contact page                                                       */
/* ------------------------------------------------------------------ */

export function ContactPage() {
  const [sent, setSent] = useState(false)

  useEffect(() => {
    document.title = 'Contact — Spatial Works'
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: wire to a form endpoint (Formspree / Resend / your CRM) before launch.
    setSent(true)
  }

  return (
    <SiteShell>
      <main>
        {/* Intro */}
        <section className="bg-sw-white pt-12 md:pt-20">
          <Container>
            <span className="eyebrow text-sw-orange">Contact</span>
            <h1 className="track-display mt-5 max-w-[15ch] text-4xl font-bold leading-[0.98] md:text-6xl">
              Let&apos;s build something exceptional
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-graphite">
              Tell us about the space, the brief and the deadline. We design,
              supply and install — and we&apos;ll tell you straight what works.
            </p>
          </Container>
        </section>

        {/* Form + details */}
        <section className="bg-sw-white py-14 md:py-20">
          <Container className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-16">
            {/* Form */}
            <div className="md:col-span-7">
              {sent ? (
                <div className="rounded-2xl border border-sw-black/10 p-8 md:p-10">
                  <h2 className="track-display text-2xl font-semibold md:text-3xl">
                    Thanks — message received
                  </h2>
                  <p className="mt-3 text-lg leading-relaxed text-graphite">
                    We&apos;ll be in touch within one working day. For anything
                    urgent, email{' '}
                    <a className="text-sw-orange underline underline-offset-4" href="mailto:hello@spatialworks.ie">
                      hello@spatialworks.ie
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="eyebrow mt-8 text-graphite underline underline-offset-4 transition-colors hover:text-sw-black"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field label="Name" name="name" required placeholder="Your name" />
                    <Field label="Email" name="email" type="email" required placeholder="you@company.com" />
                    <Field label="Company" name="company" placeholder="Company / brand" />
                    <SelectField label="Project type" name="projectType" options={PROJECT_TYPES} />
                  </div>
                  <label className="block">
                    <FieldLabel required>Tell us about the project</FieldLabel>
                    <textarea
                      className={`${inputCls} min-h-[9rem] resize-y`}
                      name="message"
                      required
                      placeholder="Location, scope, rough timeline and budget if you have one…"
                    />
                  </label>
                  <ArrowButton type="submit" tone="dark">
                    Send enquiry
                  </ArrowButton>
                </form>
              )}
            </div>

            {/* Details + image */}
            <aside className="md:col-span-4 md:col-start-9">
              <dl className="space-y-7 border-t border-sw-black/10 pt-8">
                {DETAILS.map((d) => (
                  <div key={d.label}>
                    <dt className="eyebrow text-graphite">{d.label}</dt>
                    <dd className="mt-2 text-lg text-sw-black">
                      {d.href ? (
                        <a className="transition-colors hover:text-sw-orange" href={d.href}>
                          {d.value}
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-sw-black/5">
                <img
                  src="/brand/project-corporate.jpg"
                  alt="A Spatial Works installation"
                  className="h-full w-full object-cover"
                />
              </div>
            </aside>
          </Container>
        </section>
      </main>
    </SiteShell>
  )
}

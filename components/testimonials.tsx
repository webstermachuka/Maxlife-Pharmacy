import { testimonials } from "@/lib/content"

export function Testimonials() {
  return (
    <section id="results" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance font-sans text-3xl font-semibold text-foreground sm:text-4xl">
          Experiences from previous clients
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Real stories, real results
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure
            key={`${t.name}-${i}`}
            className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-sans text-3xl font-semibold text-primary">
                {t.amount}
              </span>
              <span className="text-sm text-muted-foreground">
                in {t.duration}
              </span>
            </div>
            <blockquote className="text-pretty leading-relaxed text-foreground">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-auto border-t border-border pt-4">
              <span className="font-semibold text-foreground">{t.name}</span>
              <span className="block text-sm text-muted-foreground">
                Client
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

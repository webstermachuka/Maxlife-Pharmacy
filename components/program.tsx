import { programPoints } from "@/lib/content"

export function Program() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance font-sans text-3xl font-semibold text-foreground sm:text-4xl">
          We stand behind our program
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Because your goals deserve more than promises. They deserve
          results.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {programPoints.map((point) => (
          <div
            key={point.title}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="text-xl font-semibold text-card-foreground">
              {point.title}
            </h3>
            <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
              {point.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

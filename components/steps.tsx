import { steps } from "@/lib/content"

export function Steps() {
  return (
    <section id="how-it-works" className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            It&apos;s not magic, it&apos;s metabolic science
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Lose up to 15% of your body weight in 3 easy steps
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-serif text-xl font-semibold text-primary-foreground">
                {step.number}
              </span>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

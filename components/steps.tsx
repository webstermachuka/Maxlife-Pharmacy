import { steps } from "@/lib/content"

export function Steps() {
  return (
    <section id="how-it-works" className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-normal tracking-normal text-muted-foreground">
            At Novus Pharma, our doctors assess each patient individually and
            recommend clinically appropriate treatment, including GLP-1
            agonists (Oral or Injectable) and dual-agonist therapies
            (injectable) where suitable, under full medical supervision.
          </p>
          <h2 className="mt-3 text-balance font-sans text-lg font-semibold text-foreground">
            Just 3 easy steps
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex flex-col gap-4">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground ${
                  idx === 0 ? "font-sans" : idx === 1 ? "" : ""
                }`}
              >
                {step.number}
              </span>
              <h3 className="font-sans text-xl font-semibold text-foreground">
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

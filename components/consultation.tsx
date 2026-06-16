import { Check, ShieldCheck } from "lucide-react"
import { ConsultationButton } from "@/components/consultation-wizard"
import { whyMaxlife } from "@/lib/content"

export function Consultation() {
  return (
    <section id="consultation" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <h2 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
            Book a free 20-minute consultation
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            No upfront payment and no obligation. Find out if our program is the
            right fit for you.
          </p>
          <ul className="flex flex-col gap-3">
            {whyMaxlife.map((item) => (
              <li key={item} className="flex items-center gap-3 text-foreground">
                <Check className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-center gap-6 rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
          <div className="flex flex-col items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
              <ShieldCheck className="h-7 w-7 text-primary" aria-hidden="true" />
            </span>
            <h3 className="text-2xl font-semibold text-card-foreground">
              Start your free consultation
            </h3>
            <p className="max-w-sm text-muted-foreground">
              Answer a few quick questions about your goals and health. It takes
              under two minutes and there&apos;s no obligation.
            </p>
          </div>
          <ConsultationButton size="lg" className="w-full">
            Begin consultation
          </ConsultationButton>
          <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            100% Confidential and Secure
          </p>
        </div>
      </div>
    </section>
  )
}

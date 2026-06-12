import Image from "next/image"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trustBadges, medications } from "@/lib/content"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col gap-6">
          <p className="text-sm font-semibold capitalize tracking-wide text-primary">
            Safe & Lasting Weight Loss Management in Kenya
          </p>
          <h1 className="text-balance font-sans text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Your path to weight loss: safe, guided and effective.
          </h1>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Are you still struggling with weight despite trying everything? Our
            doctor-led medical weight loss management program offers a clinically
            supervised treatment tailored to your body and goals.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              nativeButton={false}
              render={<a href="#consultation" />}
              size="lg"
            >
              Start free consultation
            </Button>
            <Button
              nativeButton={false}
              render={<a href="#how-it-works" />}
              size="lg"
              variant="outline"
            >
              See how it works
            </Button>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
            {trustBadges.map((badge) => (
              <li
                key={badge}
                className="flex items-center gap-1.5 text-sm text-muted-foreground"
              >
                <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {badge}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <Image
              src="/hero-wellness.png"
              alt="A confident, healthy member smiling outdoors"
              width={720}
              height={560}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {medications.map((med) => (
              <div
                key={med.name}
                className="rounded-xl border border-border bg-card p-5"
              >
                <h3 className="font-sans text-xl font-semibold text-card-foreground">
                  {med.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {med.result}
                </p>
                <p className="mt-3 text-sm font-semibold text-primary">
                  {med.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

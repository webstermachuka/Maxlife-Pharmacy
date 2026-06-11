"use client"

import { useState } from "react"
import { Check, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { whyMaxlife } from "@/lib/content"

export function Consultation() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="consultation" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
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

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          {submitted ? (
            <div
              className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center"
              aria-live="polite"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                <Check className="h-7 w-7 text-primary" aria-hidden="true" />
              </span>
              <h3 className="font-serif text-2xl font-semibold text-card-foreground">
                Thank you!
              </h3>
              <p className="max-w-sm text-muted-foreground">
                We&apos;ve received your request. One of our weight loss
                specialists will reach out to schedule your free consultation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="firstName">First name*</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lastName">Last name*</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Phone number*</Label>
                <Input id="phone" name="phone" type="tel" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email*</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <Button type="submit" size="lg" className="mt-2 w-full">
                Submit
              </Button>
              <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                100% Confidential and Secure
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

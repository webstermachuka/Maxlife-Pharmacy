"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  AlertTriangle,
  Check,
  Info,
  Activity,
  Brain,
  HeartPulse,
  Gauge,
  Stethoscope,
  CalendarCheck,
  Syringe,
  Headset,
} from "lucide-react"

type Topic = {
  id: string
  title: string
}

const topics: Topic[] = [
  { id: "popularity", title: "Medical Weight Loss Injections in Kenya" },
  { id: "disclaimer", title: "Medical Disclaimer" },
  { id: "what-are", title: "What Are GLP-1 and Dual-Agonist Injections?" },
  { id: "how-they-work", title: "How These Medications Work" },
  { id: "right-for-you", title: "Is This Treatment Right for You?" },
  { id: "comparison", title: "GLP-1 vs Dual-Agonist: Which One Suits You?" },
  { id: "why-maxlife", title: "Why Choose Maxlife?" },
]

const benefits = [
  {
    icon: Gauge,
    text: "Enhances insulin function and metabolism, helping the body manage blood sugar and energy storage more effectively.",
  },
  {
    icon: Activity,
    text: "Reduces cravings and hunger, making it easier to maintain healthy eating habits.",
  },
  {
    icon: Brain,
    text: "Helps you feel full sooner by signaling the brain when you're satisfied.",
  },
  {
    icon: HeartPulse,
    text: "Supports gradual and sustainable weight loss rather than rapid fluctuations.",
  },
]

const maxlifeBenefits = [
  {
    icon: Stethoscope,
    title: "Expert Consultation",
    text: "Assessment and prescription by qualified doctors.",
  },
  {
    icon: CalendarCheck,
    title: "Ongoing Monitoring",
    text: "Personalized monthly follow-ups and clinical monitoring.",
  },
  {
    icon: Syringe,
    title: "Safe Technique Training",
    text: "Guidance on proper and safe injection technique.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    text: "Round-the-clock access to the clinical support team.",
  },
]

const comparisonRows = [
  {
    aspect: "Common Brands",
    dual: "Mounjaro, Zepbound",
    glp1: "Ozempic, Wegovy, Rybelsus",
  },
  {
    aspect: "Mechanism",
    dual: "Targets GLP-1 and GIP receptors",
    glp1: "Targets GLP-1 receptor only",
  },
  {
    aspect: "Clinical Weight Loss",
    dual: "Up to 20–22% body weight loss",
    glp1: "10–15% body weight loss",
  },
  {
    aspect: "Best For",
    dual: "Obesity and overweight management, with or without diabetes",
    glp1: "Type 2 Diabetes and weight management",
  },
  {
    aspect: "Blood Sugar Impact",
    dual: "Stronger HbA1c reduction",
    glp1: "Moderate HbA1c reduction",
  },
  {
    aspect: "Craving Control",
    dual: "More effective appetite reduction",
    glp1: "Effective appetite reduction",
  },
  {
    aspect: "Common Side Effects",
    dual: "Nausea, constipation, fatigue",
    glp1: "Similar side-effect profile",
  },
  {
    aspect: "Availability at Maxlife",
    dual: "Mounjaro available after consultation",
    glp1: "Ozempic and Wegovy available after consultation",
  },
]

export function TableOfContents() {
  const [open, setOpen] = useState<string[]>([])

  function jumpTo(id: string) {
    setOpen((prev) => (prev.includes(id) ? prev : [...prev, id]))
    // Allow the panel to expand before scrolling into view
    requestAnimationFrame(() => {
      setTimeout(() => {
        document
          .getElementById(`topic-${id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 50)
    })
  }

  return (
    <section
      id="table-of-contents"
      className="border-t border-border bg-background"
    >
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Learn about medical weight loss
          </h2>
          <p className="mt-3 text-pretty text-lg leading-relaxed text-muted-foreground">
            Everything you need to know about GLP-1 and dual-agonist treatments.
            Tap any topic below to expand it.
          </p>
        </div>

        {/* Quick jump links */}
        <nav aria-label="Table of contents" className="mt-10">
          <ol className="grid gap-2 sm:grid-cols-2">
            {topics.map((topic, idx) => (
              <li key={topic.id}>
                <button
                  type="button"
                  onClick={() => jumpTo(topic.id)}
                  className="flex w-full items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-secondary/60"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {idx + 1}
                  </span>
                  <span className="text-pretty">{topic.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <Accordion
          value={open}
          onValueChange={(value) => setOpen(value as string[])}
          className="mt-10 flex flex-col gap-3"
        >
          {/* 1. Popularity in Kenya */}
          <AccordionItem
            id="topic-popularity"
            value="popularity"
            className="scroll-mt-24 rounded-xl border border-border bg-card px-5"
          >
            <AccordionTrigger className="text-base font-semibold">
              1. Medical Weight Loss Injections and Their Popularity in Kenya
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              <p>
                Medical weight loss injections, with the most common options in
                Kenya being <strong>Ozempic (Semaglutide)</strong> and{" "}
                <strong>Mounjaro (Tirzepatide)</strong>, are prescription
                medicines that help people lose weight.
              </p>
              <p>
                These injections have become increasingly popular in Kenya as
                more people seek effective ways to manage their weight, and
                social media has significantly increased awareness of these
                treatments.
              </p>
              <p>
                However, Kenyan health authorities advise that these medicines
                should only be used under the supervision of a qualified
                healthcare professional, as they can cause side effects and may
                not be suitable for everyone.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* 2. Medical Disclaimer */}
          <AccordionItem
            id="topic-disclaimer"
            value="disclaimer"
            className="scroll-mt-24 rounded-xl border border-border bg-card px-5"
          >
            <AccordionTrigger className="text-base font-semibold">
              2. Medical Disclaimer
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <div className="flex gap-3 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4">
                <AlertTriangle
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                  aria-hidden="true"
                />
                <div className="space-y-3 leading-relaxed">
                  <p>
                    Maxlife is a patient management platform that collaborates
                    with independent physicians and healthcare practitioners.
                  </p>
                  <p>
                    This website advertises healthcare services and is not
                    promoting any specific medication.
                  </p>
                  <p>
                    Compounded medications are not subject to pre-market review
                    or PPB approval and may differ from commercially available
                    drugs in efficacy, safety, and side-effect profiles.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 3. What are GLP-1 */}
          <AccordionItem
            id="topic-what-are"
            value="what-are"
            className="scroll-mt-24 rounded-xl border border-border bg-card px-5"
          >
            <AccordionTrigger className="text-base font-semibold">
              3. What Are GLP-1 and Dual-Agonist Weight Loss Injections?
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              <p>
                GLP-1 and Dual-Agonist medications work by targeting hormones
                that regulate hunger, fullness, and metabolism. Some of the most
                clinically studied medications in this category include:
              </p>
              <ul className="my-4 flex flex-wrap gap-2">
                {["Tirzepatide", "Semaglutide"].map((m) => (
                  <li
                    key={m}
                    className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-foreground"
                  >
                    {m}
                  </li>
                ))}
              </ul>
              <p>
                These medications were originally developed to manage Type 2
                Diabetes but have demonstrated significant weight loss results
                in clinical studies, making them valuable options within a
                structured medical weight loss program.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* 4. How they work */}
          <AccordionItem
            id="topic-how-they-work"
            value="how-they-work"
            className="scroll-mt-24 rounded-xl border border-border bg-card px-5"
          >
            <AccordionTrigger className="text-base font-semibold">
              4. How These Medications Work
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              <p>
                Prescription weight loss injections work by targeting key
                hormones that control hunger, fullness, and how the body
                processes food.
              </p>
              <div className="my-4 grid gap-3 sm:grid-cols-2">
                {benefits.map((b) => (
                  <div
                    key={b.text}
                    className="flex gap-3 rounded-lg border border-border bg-secondary/40 p-4"
                  >
                    <b.icon
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-foreground">
                      {b.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4">
                <Info
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-foreground">
                  <strong>Important Note:</strong> Within the Maxlife Weight Loss
                  Management Program, medication doses are adjusted only by the
                  prescribing doctor based on individual medical response and
                  progress.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 5. Right for you */}
          <AccordionItem
            id="topic-right-for-you"
            value="right-for-you"
            className="scroll-mt-24 rounded-xl border border-border bg-card px-5"
          >
            <AccordionTrigger className="text-base font-semibold">
              5. Is This Treatment Right for You?
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              <p>
                Our doctors will assess your suitability during your
                consultation. Generally, suitable candidates include people who:
              </p>
              <ul className="my-4 space-y-2">
                {[
                  "Have a BMI of 30 or higher.",
                  "Have a BMI of 27 or higher with a related condition such as Type 2 Diabetes, Hypertension, or PCOS.",
                  "Struggle with appetite control.",
                  "Experience weight regain after previous weight-loss attempts.",
                  "Are committed to combining medical treatment with long-term lifestyle changes.",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    className="h-5 w-5 shrink-0 text-amber-600"
                    aria-hidden="true"
                  />
                  <h4 className="font-semibold text-foreground">
                    Important Medical Restrictions
                  </h4>
                </div>
                <p className="mt-2 text-sm leading-relaxed">
                  Treatment may not be appropriate for individuals who:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm leading-relaxed">
                  <li>Are pregnant or breastfeeding.</li>
                  <li>Have a history of Medullary Thyroid Cancer.</li>
                  <li>Have MEN2 syndrome.</li>
                  <li>Have severe gastrointestinal conditions.</li>
                  <li>Have pancreatic disorders.</li>
                </ul>
                <p className="mt-3 text-sm leading-relaxed">
                  Your doctor will conduct a complete assessment before issuing
                  any prescription.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 6. Comparison */}
          <AccordionItem
            id="topic-comparison"
            value="comparison"
            className="scroll-mt-24 rounded-xl border border-border bg-card px-5"
          >
            <AccordionTrigger className="text-base font-semibold">
              6. Comparing GLP-1 vs Dual-Agonist Injections
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 pr-4 font-semibold text-foreground">
                        Aspect
                      </th>
                      <th className="px-4 py-3 font-semibold text-foreground">
                        Dual-Agonist (GLP-1 + GIP) – Tirzepatide
                      </th>
                      <th className="px-4 py-3 font-semibold text-foreground">
                        GLP-1 – Semaglutide
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr
                        key={row.aspect}
                        className="border-b border-border/60 align-top"
                      >
                        <td className="py-3 pr-4 font-medium text-foreground">
                          {row.aspect}
                        </td>
                        <td className="px-4 py-3 leading-relaxed">{row.dual}</td>
                        <td className="px-4 py-3 leading-relaxed">{row.glp1}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 7. Why Maxlife */}
          <AccordionItem
            id="topic-why-maxlife"
            value="why-maxlife"
            className="scroll-mt-24 rounded-xl border border-border bg-card px-5"
          >
            <AccordionTrigger className="text-base font-semibold">
              7. Why Choose Maxlife?
            </AccordionTrigger>
            <AccordionContent className="leading-relaxed text-muted-foreground">
              <p>
                At Maxlife, care extends beyond simply receiving a prescription.
                Our approach recognizes that successful long-term weight
                management requires medical, nutritional, and behavioural
                support.
              </p>
              <div className="my-4 grid gap-3 sm:grid-cols-2">
                {maxlifeBenefits.map((b) => (
                  <div
                    key={b.title}
                    className="rounded-lg border border-border bg-secondary/40 p-4"
                  >
                    <b.icon
                      className="h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                    <h4 className="mt-2 font-semibold text-foreground">
                      {b.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed">{b.text}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}

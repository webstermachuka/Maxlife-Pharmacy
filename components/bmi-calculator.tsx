"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type BmiResult = {
  value: number
  category: string
}

function classify(bmi: number): string {
  if (bmi < 18.5) return "Underweight"
  if (bmi < 25) return "Normal weight"
  if (bmi < 30) return "Overweight"
  return "Obese"
}

export function BmiCalculator() {
  const [feet, setFeet] = useState("")
  const [inches, setInches] = useState("")
  const [weight, setWeight] = useState("")
  const [result, setResult] = useState<BmiResult | null>(null)
  const [error, setError] = useState("")

  function calculate(e: React.FormEvent) {
    e.preventDefault()
    const totalInches = Number(feet) * 12 + Number(inches)
    const lbs = Number(weight)

    if (!totalInches || !lbs || totalInches <= 0 || lbs <= 0) {
      setError("Please enter a valid height and weight.")
      setResult(null)
      return
    }

    const bmi = (lbs / (totalInches * totalInches)) * 703
    setError("")
    setResult({ value: Math.round(bmi * 10) / 10, category: classify(bmi) })
  }

  return (
    <section id="bmi" className="border-y border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Check your BMI
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Enter your height and weight below to see where you stand.
          </p>

          <form onSubmit={calculate} className="mt-8 flex flex-col gap-5">
            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 text-sm font-medium text-foreground">
                Height
              </legend>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Label htmlFor="feet" className="sr-only">
                    Feet
                  </Label>
                  <Input
                    id="feet"
                    type="number"
                    inputMode="numeric"
                    placeholder="ft"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="inches" className="sr-only">
                    Inches
                  </Label>
                  <Input
                    id="inches"
                    type="number"
                    inputMode="numeric"
                    placeholder="in"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                  />
                </div>
              </div>
            </fieldset>

            <div className="flex flex-col gap-2">
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                type="number"
                inputMode="numeric"
                placeholder="lbs"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}

            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Calculate BMI
            </Button>

            {result ? (
              <div
                className="rounded-xl border border-border bg-card p-6"
                aria-live="polite"
              >
                <p className="text-sm text-muted-foreground">Your BMI</p>
                <p className="font-serif text-4xl font-semibold text-primary">
                  {result.value}
                </p>
                <p className="mt-1 font-medium text-foreground">
                  {result.category}
                </p>
              </div>
            ) : null}
          </form>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <Image
            src="/before-after.png"
            alt="Before and after weight loss transformation of a member"
            width={640}
            height={520}
            className="h-full w-full object-cover"
          />
          <div className="flex items-center justify-between gap-4 border-t border-border p-5">
            <div>
              <p className="font-semibold text-card-foreground">Jenny, 25</p>
              <p className="text-sm text-muted-foreground">30 lbs in 3 months</p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">200 lbs</span>{" "}
                before
              </p>
              <p>
                <span className="font-semibold text-primary">170 lbs</span> after
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lock,
  ShieldCheck,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                                   Context                                  */
/* -------------------------------------------------------------------------- */

type ConsultationContextValue = {
  open: () => void
  close: () => void
  isOpen: boolean
}

const ConsultationContext = createContext<ConsultationContextValue | null>(null)

export function useConsultation() {
  const ctx = useContext(ConsultationContext)
  if (!ctx) {
    throw new Error("useConsultation must be used within ConsultationProvider")
  }
  return ctx
}

export function ConsultationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({ open, close, isOpen }),
    [open, close, isOpen],
  )

  return (
    <ConsultationContext.Provider value={value}>
      {children}
      <ConsultationModal open={isOpen} onClose={close} />
    </ConsultationContext.Provider>
  )
}

/* -------------------------------------------------------------------------- */
/*                              Trigger button                                */
/* -------------------------------------------------------------------------- */

type ConsultationButtonProps = React.ComponentProps<typeof Button>

export function ConsultationButton({
  children,
  ...props
}: ConsultationButtonProps) {
  const { open } = useConsultation()
  return (
    <Button type="button" onClick={open} {...props}>
      {children}
    </Button>
  )
}

/* -------------------------------------------------------------------------- */
/*                                Wizard data                                 */
/* -------------------------------------------------------------------------- */

const TOTAL_STEPS = 7

const goalOptions = [
  "Lose 1–10 Kgs for good",
  "Lose 11–20 Kgs for good",
  "Lose over 20 Kgs for good",
  "Maintain my weight and get fit",
  "Haven't decided yet",
]

const knowledgeOptions = [
  "I've never heard of them",
  "I've heard of them, but don't know much",
  "After doing extensive research, I'm quite knowledgeable",
]

const priorMedsOptions = ["Yes", "No", "Not sure"]

type HeightUnit = "imperial" | "metric"

type WizardData = {
  goal: string
  knowledge: string
  priorMeds: string
  heightUnit: HeightUnit
  feet: string
  inches: string
  cm: string
  weight: string
  email: string
  phone: string
}

const initialData: WizardData = {
  goal: "",
  knowledge: "",
  priorMeds: "",
  heightUnit: "imperial",
  feet: "",
  inches: "",
  cm: "",
  weight: "",
  email: "",
  phone: "",
}

/* -------------------------------------------------------------------------- */
/*                                BMI helpers                                 */
/* -------------------------------------------------------------------------- */

type BmiCategory = {
  label: string
  color: string
}

function classifyBmi(bmi: number): BmiCategory {
  if (bmi < 18.5) return { label: "Underweight", color: "text-muted-foreground" }
  if (bmi < 25) return { label: "Healthy range", color: "text-emerald-600" }
  if (bmi < 30) return { label: "Overweight range", color: "text-amber-600" }
  if (bmi < 35) return { label: "Obesity range", color: "text-orange-600" }
  return { label: "High-risk range", color: "text-red-600" }
}

const bmiSegments = [
  { label: "Underweight", className: "bg-muted-foreground/40", width: "14%" },
  { label: "Healthy", className: "bg-emerald-500", width: "26%" },
  { label: "Overweight", className: "bg-amber-400", width: "20%" },
  { label: "Obesity", className: "bg-orange-500", width: "20%" },
  { label: "High-risk", className: "bg-red-500", width: "20%" },
]

function bmiToPercent(bmi: number): number {
  // Scale maps BMI 15 -> 0% and BMI 40 -> 100%
  const clamped = Math.min(Math.max(bmi, 15), 40)
  return ((clamped - 15) / 25) * 100
}

/* -------------------------------------------------------------------------- */
/*                                   Modal                                    */
/* -------------------------------------------------------------------------- */

function ConsultationModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<WizardData>(initialData)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  // Reset everything whenever the modal is freshly opened.
  useEffect(() => {
    if (open) {
      setStep(0)
      setData(initialData)
      setSubmitted(false)
      setError("")
    }
  }, [open])

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  const update = useCallback((patch: Partial<WizardData>) => {
    setData((d) => ({ ...d, ...patch }))
    setError("")
  }, [])

  const bmi = useMemo(() => {
    let heightMeters = 0
    if (data.heightUnit === "imperial") {
      const totalInches = Number(data.feet) * 12 + Number(data.inches)
      heightMeters = totalInches * 0.0254
    } else {
      heightMeters = Number(data.cm) / 100
    }
    const kg = Number(data.weight)
    if (!heightMeters || !kg || heightMeters <= 0 || kg <= 0) return null
    return Math.round((kg / (heightMeters * heightMeters)) * 10) / 10
  }, [data])

  if (!open) return null

  function validateStep(): boolean {
    switch (step) {
      case 0:
        if (!data.goal) {
          setError("Please select a goal to continue.")
          return false
        }
        return true
      case 1:
        if (!data.knowledge) {
          setError("Please select an option to continue.")
          return false
        }
        return true
      case 2:
        if (!data.priorMeds) {
          setError("Please select an option to continue.")
          return false
        }
        return true
      case 3: {
        if (data.heightUnit === "imperial") {
          if (!Number(data.feet) || Number(data.feet) <= 0) {
            setError("Please enter your height in feet.")
            return false
          }
        } else if (!Number(data.cm) || Number(data.cm) <= 0) {
          setError("Please enter your height in centimeters.")
          return false
        }
        return true
      }
      case 4:
        if (!Number(data.weight) || Number(data.weight) <= 0) {
          setError("Please enter a valid weight in kilograms.")
          return false
        }
        return true
      default:
        return true
    }
  }

  function next() {
    if (!validateStep()) return
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1))
  }

  function back() {
    setError("")
    setStep((s) => Math.max(s - 1, 0))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    if (!emailValid) {
      setError("Please enter a valid email address.")
      return
    }
    if (!data.phone.trim()) {
      setError("Please enter a phone number.")
      return
    }
    setError("")
    setSubmitted(true)
  }

  const progress = ((step + 1) / TOTAL_STEPS) * 100

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close consultation"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-foreground/50 backdrop-blur-sm animate-in fade-in"
      />

      {/* Panel */}
      <div className="relative flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-border bg-card shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 sm:rounded-2xl">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-muted-foreground">
              {submitted ? "All done" : `Step ${step + 1} of ${TOTAL_STEPS}`}
            </p>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Close"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {!submitted && (
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={step + 1}
              aria-valuemin={1}
              aria-valuemax={TOTAL_STEPS}
            >
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
          {submitted ? (
            <ConfirmationView />
          ) : (
            <div key={step} className="animate-in fade-in slide-in-from-right-3 duration-300">
              {step === 0 && (
                <StepChoices
                  title="What is your weight loss goal?"
                  options={goalOptions}
                  value={data.goal}
                  onSelect={(v) => update({ goal: v })}
                />
              )}

              {step === 1 && (
                <StepChoices
                  title="How much do you know about GLP-1 medications?"
                  options={knowledgeOptions}
                  value={data.knowledge}
                  onSelect={(v) => update({ knowledge: v })}
                />
              )}

              {step === 2 && (
                <StepChoices
                  title="Have you taken any prescription medications for weight loss, including GLP-1 medications?"
                  options={priorMedsOptions}
                  value={data.priorMeds}
                  onSelect={(v) => update({ priorMeds: v })}
                />
              )}

              {step === 3 && (
                <HeightStep data={data} update={update} />
              )}

              {step === 4 && (
                <WeightStep data={data} update={update} />
              )}

              {step === 5 && <BmiResultsStep bmi={bmi} weight={Number(data.weight)} />}

              {step === 6 && (
                <ContactStep data={data} update={update} onSubmit={handleSubmit} />
              )}

              {error && (
                <p className="mt-4 text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-4 sm:px-6">
            {step > 0 ? (
              <Button type="button" variant="ghost" size="lg" onClick={back}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            ) : (
              <span />
            )}

            {step === TOTAL_STEPS - 1 ? (
              <Button type="button" size="lg" onClick={handleSubmit}>
                Start Medical Intake
              </Button>
            ) : (
              <Button type="button" size="lg" onClick={next}>
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Steps                                    */
/* -------------------------------------------------------------------------- */

function StepChoices({
  title,
  options,
  value,
  onSelect,
}: {
  title: string
  options: string[]
  value: string
  onSelect: (value: string) => void
}) {
  return (
    <div>
      <h2
        id="consultation-title"
        className="text-balance text-xl font-semibold text-card-foreground sm:text-2xl"
      >
        {title}
      </h2>
      <div className="mt-5 flex flex-col gap-3">
        {options.map((option) => {
          const selected = value === option
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(option)}
              className={cn(
                "flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all",
                selected
                  ? "border-primary bg-accent text-accent-foreground ring-2 ring-primary/30"
                  : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted",
              )}
            >
              <span className="text-pretty">{option}</span>
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                  selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border",
                )}
                aria-hidden="true"
              >
                {selected && <Check className="h-3.5 w-3.5" />}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function HeightStep({
  data,
  update,
}: {
  data: WizardData
  update: (patch: Partial<WizardData>) => void
}) {
  return (
    <div>
      <h2
        id="consultation-title"
        className="text-balance text-xl font-semibold text-card-foreground sm:text-2xl"
      >
        What is your height?
      </h2>

      <div
        role="radiogroup"
        aria-label="Height measurement system"
        className="mt-5 inline-flex w-fit rounded-lg border border-border bg-background p-1"
      >
        <button
          type="button"
          role="radio"
          aria-checked={data.heightUnit === "imperial"}
          onClick={() => update({ heightUnit: "imperial" })}
          className={cn(
            "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
            data.heightUnit === "imperial"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Feet & Inches
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={data.heightUnit === "metric"}
          onClick={() => update({ heightUnit: "metric" })}
          className={cn(
            "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
            data.heightUnit === "metric"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Centimeters
        </button>
      </div>

      {data.heightUnit === "imperial" ? (
        <div className="mt-5 flex gap-3">
          <div className="flex-1">
            <Label htmlFor="wiz-feet" className="mb-1.5 block text-sm">
              Feet
            </Label>
            <Input
              id="wiz-feet"
              type="number"
              inputMode="numeric"
              min="0"
              placeholder="e.g. 5"
              value={data.feet}
              onChange={(e) => update({ feet: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="wiz-inches" className="mb-1.5 block text-sm">
              Inches
            </Label>
            <Input
              id="wiz-inches"
              type="number"
              inputMode="numeric"
              min="0"
              max="11"
              placeholder="e.g. 10"
              value={data.inches}
              onChange={(e) => update({ inches: e.target.value })}
            />
          </div>
        </div>
      ) : (
        <div className="mt-5">
          <Label htmlFor="wiz-cm" className="mb-1.5 block text-sm">
            Centimeters
          </Label>
          <Input
            id="wiz-cm"
            type="number"
            inputMode="numeric"
            min="0"
            placeholder="e.g. 178"
            value={data.cm}
            onChange={(e) => update({ cm: e.target.value })}
          />
        </div>
      )}
    </div>
  )
}

function WeightStep({
  data,
  update,
}: {
  data: WizardData
  update: (patch: Partial<WizardData>) => void
}) {
  return (
    <div>
      <h2
        id="consultation-title"
        className="text-balance text-xl font-semibold text-card-foreground sm:text-2xl"
      >
        What is your current weight?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter your weight in kilograms (kg).
      </p>
      <div className="mt-5">
        <Label htmlFor="wiz-weight" className="mb-1.5 block text-sm">
          Weight (kg)
        </Label>
        <Input
          id="wiz-weight"
          type="number"
          inputMode="numeric"
          min="0"
          placeholder="e.g. 85 kg"
          value={data.weight}
          onChange={(e) => update({ weight: e.target.value })}
        />
      </div>
    </div>
  )
}

function BmiResultsStep({
  bmi,
  weight,
}: {
  bmi: number | null
  weight: number
}) {
  const category = bmi ? classifyBmi(bmi) : null
  const markerPercent = bmi ? bmiToPercent(bmi) : 0
  const potentialLoss = weight > 0 ? Math.round(weight * 0.2) : 0
  const futureWeight = weight > 0 ? Math.round(weight * 0.8) : 0

  return (
    <div>
      <h2
        id="consultation-title"
        className="text-balance text-xl font-semibold text-card-foreground sm:text-2xl"
      >
        Your BMI results
      </h2>

      {bmi ? (
        <>
          <div className="mt-5 flex items-end justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Your BMI</p>
              <p className="text-4xl font-semibold text-card-foreground">{bmi}</p>
            </div>
            <p className={cn("text-sm font-semibold", category?.color)}>
              {category?.label}
            </p>
          </div>

          {/* BMI indicator */}
          <div className="mt-5">
            <div className="relative">
              <div className="flex h-3 w-full overflow-hidden rounded-full">
                {bmiSegments.map((seg) => (
                  <div
                    key={seg.label}
                    className={seg.className}
                    style={{ width: seg.width }}
                  />
                ))}
              </div>
              {/* Marker */}
              <div
                className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card bg-foreground shadow-md transition-all"
                style={{ left: `${markerPercent}%` }}
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Healthy
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400" /> Overweight
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-orange-500" /> Obesity
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500" /> High-risk
              </span>
            </div>
          </div>

          <p className="mt-6 rounded-xl border border-border bg-secondary/60 p-4 text-sm leading-relaxed text-foreground">
            With GLP-1 medication, some patients may lose up to 20% of their body
            weight over a period of 6&ndash;12 months when combined with
            appropriate medical supervision and lifestyle changes.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-border bg-background p-3 text-center">
              <p className="text-xs text-muted-foreground">Current</p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {weight} kg
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-3 text-center">
              <p className="text-xs text-muted-foreground">Potential loss</p>
              <p className="mt-1 text-lg font-semibold text-primary">
                {potentialLoss} kg
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-3 text-center">
              <p className="text-xs text-muted-foreground">Estimated</p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {futureWeight} kg
              </p>
            </div>
          </div>
        </>
      ) : (
        <p className="mt-5 text-sm text-muted-foreground">
          We couldn&apos;t calculate your BMI. Please go back and check your
          height and weight entries.
        </p>
      )}
    </div>
  )
}

function ContactStep({
  data,
  update,
  onSubmit,
}: {
  data: WizardData
  update: (patch: Partial<WizardData>) => void
  onSubmit: (e: React.FormEvent) => void
}) {
  return (
    <form onSubmit={onSubmit}>
      <h2
        id="consultation-title"
        className="text-balance text-xl font-semibold text-card-foreground sm:text-2xl"
      >
        How can we contact you about your care and treatment?
      </h2>

      <div className="mt-5 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="wiz-email">Email address*</Label>
          <Input
            id="wiz-email"
            type="email"
            required
            placeholder="you@example.com"
            value={data.email}
            onChange={(e) => update({ email: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="wiz-phone">Phone number*</Label>
          <Input
            id="wiz-phone"
            type="tel"
            required
            placeholder="+254 7XX XXX XXX"
            value={data.phone}
            onChange={(e) => update({ phone: e.target.value })}
          />
        </div>
      </div>

      <p className="mt-5 flex items-start gap-2 rounded-xl border border-border bg-secondary/60 p-3 text-sm leading-relaxed text-muted-foreground">
        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        Your information is private, secure, and will only be used by our
        healthcare team regarding your consultation and treatment options.
      </p>
    </form>
  )
}

function ConfirmationView() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-8 text-center"
      aria-live="polite"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
        <ShieldCheck className="h-8 w-8 text-primary" aria-hidden="true" />
      </span>
      <h2 className="text-2xl font-semibold text-card-foreground">
        Your intake has started
      </h2>
      <p className="max-w-sm text-pretty text-muted-foreground">
        Thank you! We&apos;ve received your responses. One of our healthcare
        specialists will reach out shortly to guide you through the next stage
        of your medical intake.
      </p>
    </div>
  )
}

import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Steps } from "@/components/steps"
import { Testimonials } from "@/components/testimonials"
import { BmiCalculator } from "@/components/bmi-calculator"
import { Program } from "@/components/program"
import { Faq } from "@/components/faq"
import { Consultation } from "@/components/consultation"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Steps />
        <Testimonials />
        <BmiCalculator />
        <Program />
        <Faq />
        <Consultation />
      </main>
      <SiteFooter />
    </>
  )
}

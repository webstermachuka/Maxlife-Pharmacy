import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/lib/content"

export function Faq() {
  return (
    <section id="faq" className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="text-balance text-center font-sans text-3xl font-semibold text-foreground sm:text-4xl">
          Frequently asked questions
        </h2>
        <Accordion className="mt-10 w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

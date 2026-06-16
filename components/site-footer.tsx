import { Mail, Phone, MessageCircle } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="text-2xl font-semibold text-foreground">
              Novus Pharma
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A wellness platform that facilitates access to GLP-1 care through
              licensed pharmacy partners. We are not a drug manufacturer or
              compounding pharmacy.
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a href="#how-it-works" className="hover:text-foreground">
              How it works
            </a>
            <a href="#results" className="hover:text-foreground">
              Results
            </a>
            <a href="#bmi" className="hover:text-foreground">
              BMI Check
            </a>
            <a href="#faq" className="hover:text-foreground">
              FAQ
            </a>
          </nav>
          <div className="max-w-sm">
            <h2 className="text-lg font-semibold text-foreground">Contact Us</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Need assistance with your weight loss journey? Get in touch with
              us.
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href="mailto:Novuspharma@novafoldltd.com"
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="break-all">Novuspharma@novafoldltd.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+254746460207"
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>+254 746 460 207</span>
                </a>
              </li>
            </ul>
            <a
              href="https://wa.me/254746460207"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            &copy; {new Date().getFullYear()} Novus Pharma. This page is for
            informational purposes only and is not a substitute for professional
            medical advice. Individual results may vary.
          </p>
        </div>
      </div>
    </footer>
  )
}

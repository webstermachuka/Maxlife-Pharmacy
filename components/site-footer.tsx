export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
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

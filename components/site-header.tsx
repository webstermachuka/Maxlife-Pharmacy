import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-sans text-2xl font-semibold tracking-tight text-foreground">
          Maxlife
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#how-it-works" className="transition-colors hover:text-foreground">
            How it works
          </a>
          <a href="#table-of-contents" className="transition-colors hover:text-foreground">
            Learn
          </a>
          <a href="#bmi" className="transition-colors hover:text-foreground">
            BMI Check
          </a>
          <a href="#results" className="transition-colors hover:text-foreground">
            Results
          </a>
          <a href="#faq" className="transition-colors hover:text-foreground">
            FAQ
          </a>
        </nav>
        <Button nativeButton={false} render={<a href="#consultation" />}>
          Free Consultation
        </Button>
      </div>
    </header>
  )
}

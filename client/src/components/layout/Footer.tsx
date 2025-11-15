import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">GREENENGINE Project</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              An international educational initiative promoting intercultural competence and sustainable development across Central Asia, Georgia, and Europe.
            </p>
            <p className="text-xs text-muted-foreground">
              Funded by the European Union Erasmus+ Programme
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-base">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/about">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">
                  About GREENENGINE
                </a>
              </Link>
              <Link href="/passport">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-passport">
                  Intercultural Passport
                </a>
              </Link>
              <Link href="/stories">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-stories">
                  Institution Stories
                </a>
              </Link>
              <Link href="/events">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-events">
                  Events
                </a>
              </Link>
              <Link href="/partners">
                <a className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-partners">
                  Project Partners
                </a>
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-base">Contact</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>For inquiries and partnership opportunities</p>
              <p className="font-medium">greenengine@example.org</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} GREENENGINE Project. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Co-funded by the European Union
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "wouter";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import erasmusLogo from "@assets/Eurasmus+ Co-funded logo HIGH QUALITY_1763433184665.jpg";

const brandLogoUrl = "/attached_assets/greenengine-logo-official.png";

export default function Footer() {
  return (
    <footer className="border-t bg-gradient-to-b from-muted/40 via-background to-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr]">
          <div className="space-y-6">
            <div>
              <Link href="/" data-testid="link-footer-home">
                <img src={brandLogoUrl} alt="GREENENGINE Logo" className="h-24 w-auto max-w-[340px] object-contain sm:h-28 sm:max-w-[420px]" />
              </Link>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-foreground">About Green Engine</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-7">
                  GREEN ENGINE is an international educational and innovation initiative focused on developing sustainable solutions, fostering intercultural competence, and supporting green transformation.
                </p>
              </div>
              <p className="text-sm text-muted-foreground leading-7">
                The project brings together partners from Uzbekistan and Europe to enhance education quality, promote research collaboration, and implement modern technologies in engineering and environmental fields.
              </p>
            </div>
            <div className="pt-1">
              <img 
                src={erasmusLogo} 
                alt="Co-funded by the Erasmus+ Programme of the European Union" 
                className="h-14 w-auto opacity-90"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-base text-foreground">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-3 sm:max-w-md">
              <Link 
                href="/about" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors" 
                data-testid="link-footer-about"
              >
                About
              </Link>
              <Link 
                href="/passport" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors" 
                data-testid="link-footer-passport"
              >
                Intercultural Passport
              </Link>
              <Link 
                href="/activities" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors" 
                data-testid="link-footer-activities"
              >
                Activities
              </Link>
              <Link 
                href="/stories" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors" 
                data-testid="link-footer-stories"
              >
                Stories
              </Link>
              <Link 
                href="/events" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors" 
                data-testid="link-footer-events"
              >
                Events
              </Link>
              <Link 
                href="/action-plans" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors" 
                data-testid="link-footer-action"
              >
                Action Plans
              </Link>
              <Link 
                href="/infographics" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors" 
                data-testid="link-footer-infographics"
              >
                Infographics
              </Link>
              <Link 
                href="/partners" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors" 
                data-testid="link-footer-partners"
              >
                Partners
              </Link>
            </nav>

            <div className="pt-4 space-y-3">
              <h4 className="font-semibold text-sm text-foreground">Follow Us</h4>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  asChild
                  data-testid="link-footer-facebook"
                >
                  <a
                    href="https://www.facebook.com/profile.php?id=61586359144401"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  asChild
                  data-testid="link-footer-instagram"
                >
                  <a
                    href="https://www.instagram.com/greenengine26?igsh=cnF5NzUzcXY3ZXY%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  asChild
                  data-testid="link-footer-linkedin"
                >
                  <a
                    href="https://www.linkedin.com/company/greenengine-cbhe"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-base text-foreground">Contact</h3>
            <div className="space-y-4 rounded-2xl border border-border/70 bg-muted/30 p-5">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-[0.18em]">Email</p>
                  <a
                    href="mailto:info@greenengine.uz"
                    className="text-sm text-foreground hover:text-primary transition-colors"
                    data-testid="link-footer-email"
                  >
                    info@greenengine.uz
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-[0.18em]">Phone</p>
                  <a
                    href="tel:+998781294040"
                    className="text-sm text-foreground hover:text-primary transition-colors"
                  >
                    +998 78 129 4040
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-[0.18em]">Location</p>
                  <p className="text-sm text-foreground">
                    Uzbekistan & Europe
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock3 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-[0.18em]">Working Hours</p>
                  <p className="text-sm text-foreground">
                    Mon – Fri, 9:00 – 18:00
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button asChild className="w-full" data-testid="button-footer-admin">
                <Link href="/login">
                  Admin Login
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Section */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} GREENENGINE Project. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground">
                Co-funded by the Erasmus+ Programme of the European Union
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link 
                href="/about" 
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/about" 
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

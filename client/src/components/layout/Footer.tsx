import { Link } from "wouter";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import logoImage from "@assets/green-logo.png";
import erasmusLogo from "@assets/Eurasmus+ Co-funded logo HIGH QUALITY_1763433184665.jpg";

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content - 3 Column Layout */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Column 1: Project Info */}
          <div className="space-y-6">
            <div>
              <Link href="/" data-testid="link-footer-home">
                <img src={logoImage} alt="GREENENGINE Logo" className="h-32 w-auto" />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              An international educational initiative promoting intercultural competence and sustainable development across Central Asia, Georgia, and Europe.
            </p>
            <div className="pt-2">
              <img 
                src={erasmusLogo} 
                alt="Co-funded by the Erasmus+ Programme of the European Union" 
                className="h-14 w-auto opacity-90"
              />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="font-semibold text-base text-foreground">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-3">
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
                Passport
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
                Action
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

          {/* Column 3: Contact Information */}
          <div className="space-y-6">
            <h3 className="font-semibold text-base text-foreground">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
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
                  <p className="text-xs text-muted-foreground mb-1">Phone</p>
                  <a
                    href="tel:+998781294040"
                    className="text-sm text-foreground hover:text-primary transition-colors"
                  >
                    +99878 129 4040
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Location</p>
                  <p className="text-sm text-foreground">
                    Central Asia & Europe
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
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

import { Link } from "wouter";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import logoImage from "@assets/22_1763377690616.jpg";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Project Info */}
          <div className="space-y-4">
            <Link href="/">
              <a className="inline-block">
                <img src={logoImage} alt="GREENENGINE Logo" className="h-12 w-auto" />
              </a>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              An international educational initiative promoting intercultural competence and sustainable development across Central Asia, Georgia, and Europe.
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              Funded by the European Union Erasmus+ Programme
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/about">
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-about">
                  About GREENENGINE
                </a>
              </Link>
              <Link href="/passport">
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-passport">
                  Intercultural Passport
                </a>
              </Link>
              <Link href="/stories">
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-stories">
                  Stories
                </a>
              </Link>
              <Link href="/events">
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-events">
                  Events
                </a>
              </Link>
              <Link href="/partners">
                <a className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-partners">
                  Project Partners
                </a>
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Contact</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="leading-relaxed">For inquiries and partnership opportunities</p>
              <p className="font-medium text-foreground">info@greenengine.org</p>
              <p className="text-xs pt-2">Project Coordination Office<br />European Higher Education Area</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/greenengine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-footer-facebook"
                aria-label="Facebook"
              >
                <FaFacebook className="h-[25px] w-[25px]" />
              </a>
              <a
                href="https://instagram.com/greenengine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-footer-instagram"
                aria-label="Instagram"
              >
                <FaInstagram className="h-[25px] w-[25px]" />
              </a>
              <a
                href="https://youtube.com/greenengine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-footer-youtube"
                aria-label="YouTube"
              >
                <FaYoutube className="h-[25px] w-[25px]" />
              </a>
              <a
                href="https://linkedin.com/company/greenengine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-footer-linkedin"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-[25px] w-[25px]" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              Stay connected with our latest updates and initiatives
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 pt-6 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
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

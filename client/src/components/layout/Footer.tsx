import { Link } from "wouter";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { Mail, Globe, Leaf } from "lucide-react";
import logoImage from "@assets/22_1763377690616.jpg";
import erasmusLogo from "@assets/Eurasmus+ Co-funded logo HIGH QUALITY_1763433184665.jpg";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 border-t border-primary/20">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Project Info with Logos */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <Link href="/" className="inline-block hover-elevate active-elevate-2 rounded-lg p-2 -ml-2">
                <img src={logoImage} alt="GREENENGINE Logo" className="h-20 w-auto" />
              </Link>
              <div className="flex items-center gap-2 text-primary">
                <Leaf className="h-5 w-5" />
                <span className="font-semibold text-lg">Sustainable Education for a Greener Future</span>
              </div>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed max-w-md">
              An international educational initiative promoting intercultural competence and sustainable development across Central Asia, Georgia, and Europe through innovative partnerships and transformative learning experiences.
            </p>
            <div className="bg-background/50 backdrop-blur-sm border border-primary/20 rounded-lg p-4 inline-block">
              <img src={erasmusLogo} alt="Co-funded by the Erasmus+ Programme" className="h-16 w-auto" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3">
              <Link href="/about" className="text-sm text-foreground/70 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group" data-testid="link-footer-about">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                About GREENENGINE
              </Link>
              <Link href="/passport" className="text-sm text-foreground/70 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group" data-testid="link-footer-passport">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                Intercultural Passport
              </Link>
              <Link href="/stories" className="text-sm text-foreground/70 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group" data-testid="link-footer-stories">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                Stories
              </Link>
              <Link href="/events" className="text-sm text-foreground/70 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group" data-testid="link-footer-events">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                Events
              </Link>
              <Link href="/partners" className="text-sm text-foreground/70 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group" data-testid="link-footer-partners">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                Project Partners
              </Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-5">
            <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Connect With Us
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-foreground/70">For inquiries and partnerships</p>
                <a href="mailto:info@greenengine.org" className="font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2 group">
                  info@greenengine.org
                  <Mail className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              
              <div className="pt-3 space-y-3">
                <p className="text-sm font-semibold text-foreground">Follow Our Journey</p>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com/greenengine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
                    data-testid="link-footer-facebook"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com/greenengine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
                    data-testid="link-footer-instagram"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://youtube.com/greenengine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
                    data-testid="link-footer-youtube"
                    aria-label="YouTube"
                  >
                    <FaYoutube className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com/company/greenengine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
                    data-testid="link-footer-linkedin"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 mt-8 border-t border-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="space-y-2">
              <p className="text-sm text-foreground/70 font-medium">
                © {new Date().getFullYear()} GREENENGINE Project. All rights reserved.
              </p>
              <p className="text-xs text-foreground/60">
                Erasmus+ Programme of the European Union
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-foreground/60">
              <Link href="/about" className="hover:text-primary transition-colors">About</Link>
              <span className="w-1 h-1 rounded-full bg-foreground/30"></span>
              <Link href="/partners" className="hover:text-primary transition-colors">Partners</Link>
              <span className="w-1 h-1 rounded-full bg-foreground/30"></span>
              <a href="mailto:info@greenengine.org" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

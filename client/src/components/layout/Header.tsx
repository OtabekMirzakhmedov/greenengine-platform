import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import logoImage from "@assets/22_1763377690616.jpg";

const aboutLinks = [
  { title: "About GREENENGINE", href: "/about" },
  { title: "Goals and Objectives", href: "/about/goals" },
  { title: "Activities and Outcomes", href: "/about/activities" },
  { title: "Management and Quality", href: "/about/management" },
];

const passportLinks = [
  { title: "Overview", href: "/passport" },
  { title: "IACD MOOC", href: "/passport/mooc" },
  { title: "Digital Storytelling", href: "/passport/storytelling" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/">
              <a className="flex items-center gap-3 hover-elevate active-elevate-2 px-2 py-1 rounded-md transition-colors" data-testid="link-home">
                <img src={logoImage} alt="GREENENGINE Logo" className="h-10 w-auto" />
              </a>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/">
                <a
                  className={`px-3 py-2 text-sm font-medium rounded-md hover-elevate active-elevate-2 transition-colors ${
                    location === "/" ? "bg-accent text-accent-foreground" : "text-foreground/80"
                  }`}
                  data-testid="link-nav-home"
                >
                  Home
                </a>
              </Link>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-10 text-sm font-medium" data-testid="button-about-menu">
                      About GREENENGINE
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-64 p-2">
                        {aboutLinks.map((link) => (
                          <Link key={link.href} href={link.href}>
                            <a className="block px-3 py-2 text-sm rounded-md hover-elevate active-elevate-2 transition-colors" data-testid={`link-${link.href.replace(/\//g, '-')}`}>
                              {link.title}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-10 text-sm font-medium" data-testid="button-passport-menu">
                      Intercultural Passport
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-64 p-2">
                        {passportLinks.map((link) => (
                          <Link key={link.href} href={link.href}>
                            <a className="block px-3 py-2 text-sm rounded-md hover-elevate active-elevate-2 transition-colors" data-testid={`link-${link.href.replace(/\//g, '-')}`}>
                              {link.title}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Link href="/stories">
                <a
                  className={`px-3 py-2 text-sm font-medium rounded-md hover-elevate active-elevate-2 transition-colors ${
                    location.startsWith("/stories") ? "bg-accent text-accent-foreground" : "text-foreground/80"
                  }`}
                  data-testid="link-nav-stories"
                >
                  Stories
                </a>
              </Link>

              <Link href="/community-plans">
                <a
                  className={`px-3 py-2 text-sm font-medium rounded-md hover-elevate active-elevate-2 transition-colors ${
                    location.startsWith("/community-plans") ? "bg-accent text-accent-foreground" : "text-foreground/80"
                  }`}
                  data-testid="link-nav-community"
                >
                  Community Plans
                </a>
              </Link>

              <Link href="/events">
                <a
                  className={`px-3 py-2 text-sm font-medium rounded-md hover-elevate active-elevate-2 transition-colors ${
                    location.startsWith("/events") ? "bg-accent text-accent-foreground" : "text-foreground/80"
                  }`}
                  data-testid="link-nav-events"
                >
                  Events
                </a>
              </Link>

              <Link href="/action-plans">
                <a
                  className={`px-3 py-2 text-sm font-medium rounded-md hover-elevate active-elevate-2 transition-colors ${
                    location.startsWith("/action-plans") ? "bg-accent text-accent-foreground" : "text-foreground/80"
                  }`}
                  data-testid="link-nav-action-plans"
                >
                  Action Plans
                </a>
              </Link>

              <Link href="/infographics">
                <a
                  className={`px-3 py-2 text-sm font-medium rounded-md hover-elevate active-elevate-2 transition-colors ${
                    location.startsWith("/infographics") ? "bg-accent text-accent-foreground" : "text-foreground/80"
                  }`}
                  data-testid="link-nav-infographics"
                >
                  Infographics
                </a>
              </Link>

              <Link href="/partners">
                <a
                  className={`px-3 py-2 text-sm font-medium rounded-md hover-elevate active-elevate-2 transition-colors ${
                    location === "/partners" ? "bg-accent text-accent-foreground" : "text-foreground/80"
                  }`}
                  data-testid="link-nav-partners"
                >
                  Partners
                </a>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4">
              <a
                href="https://facebook.com/greenengine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-facebook"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/greenengine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-instagram"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/greenengine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-youtube"
                aria-label="YouTube"
              >
                <FaYoutube className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/greenengine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-linkedin"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>

            <Link href="/login">
              <a>
                <Button variant="outline" size="sm" className="hidden sm:inline-flex" data-testid="button-login">
                  Login
                </Button>
              </a>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t" data-testid="mobile-menu">
            <div className="space-y-1">
              <Link href="/">
                <a className="block px-3 py-2 text-sm font-medium rounded-md hover-elevate" data-testid="link-mobile-home">
                  Home
                </a>
              </Link>

              <div className="space-y-1">
                <div className="px-3 py-2 text-sm font-semibold text-muted-foreground">About GREENENGINE</div>
                {aboutLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <a className="block px-5 py-2 text-sm rounded-md hover-elevate" data-testid={`link-mobile-${link.href.replace(/\//g, '-')}`}>
                      {link.title}
                    </a>
                  </Link>
                ))}
              </div>

              <div className="space-y-1">
                <div className="px-3 py-2 text-sm font-semibold text-muted-foreground">Intercultural Passport</div>
                {passportLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <a className="block px-5 py-2 text-sm rounded-md hover-elevate" data-testid={`link-mobile-${link.href.replace(/\//g, '-')}`}>
                      {link.title}
                    </a>
                  </Link>
                ))}
              </div>

              <Link href="/stories">
                <a className="block px-3 py-2 text-sm font-medium rounded-md hover-elevate" data-testid="link-mobile-stories">
                  Stories
                </a>
              </Link>

              <Link href="/community-plans">
                <a className="block px-3 py-2 text-sm font-medium rounded-md hover-elevate" data-testid="link-mobile-community">
                  Community Plans
                </a>
              </Link>

              <Link href="/events">
                <a className="block px-3 py-2 text-sm font-medium rounded-md hover-elevate" data-testid="link-mobile-events">
                  Events
                </a>
              </Link>

              <Link href="/action-plans">
                <a className="block px-3 py-2 text-sm font-medium rounded-md hover-elevate" data-testid="link-mobile-action-plans">
                  Action Plans
                </a>
              </Link>

              <Link href="/infographics">
                <a className="block px-3 py-2 text-sm font-medium rounded-md hover-elevate" data-testid="link-mobile-infographics">
                  Infographics
                </a>
              </Link>

              <Link href="/partners">
                <a className="block px-3 py-2 text-sm font-medium rounded-md hover-elevate" data-testid="link-mobile-partners">
                  Partners
                </a>
              </Link>

              <Link href="/login">
                <a className="block px-3 py-2 text-sm font-medium rounded-md hover-elevate" data-testid="link-mobile-login">
                  Admin Login
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

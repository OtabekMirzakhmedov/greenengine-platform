import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
import logoImage from "@assets/green-logo.png";
import erasmusLogo from "@assets/Eurasmus+ Co-funded logo HIGH QUALITY_1763433184665.jpg";

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
      className={`sticky top-0 z-50 w-full border-b bg-white transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto w-full max-w-[1780px] px-4 lg:px-6 xl:px-8">
        <div className="flex min-h-24 items-center gap-3 py-3 2xl:gap-6">
          <div className="flex shrink-0 items-center gap-3 xl:gap-4">
            <Link
              href="/"
              className="flex shrink-0 items-center rounded-md px-2 py-1 transition-colors hover-elevate active-elevate-2"
              data-testid="link-home"
            >
              <img
                src={logoImage}
                alt="GREENENGINE Logo"
                className="h-16 w-auto object-contain sm:h-20 lg:h-24"
              />
            </Link>

            <div className="hidden min-[1320px]:flex items-center border-l border-border/80 pl-3 2xl:pl-4">
              <img
                src={erasmusLogo}
                alt="Co-funded by the Erasmus+ Programme of the European Union"
                className="h-10 w-auto max-w-[180px] object-contain 2xl:h-12 2xl:max-w-[210px]"
              />
            </div>

          </div>

          <div className="hidden min-[1320px]:flex min-w-0 flex-1 justify-center px-4">
            <nav className="flex items-center gap-0.5 2xl:gap-1">
              <Link 
                href="/"
                className={`px-2 py-2 text-sm font-medium rounded-md hover-elevate active-elevate-2 transition-colors 2xl:px-3 ${
                  location === "/" ? "bg-accent text-accent-foreground" : "text-foreground/80"
                }`}
                data-testid="link-nav-home"
              >
                Home
              </Link>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-10 px-2 text-sm font-medium 2xl:px-3" data-testid="button-about-menu">
                      About GREENENGINE
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-64 p-2">
                        {aboutLinks.map((link) => (
                          <Link 
                            key={link.href} 
                            href={link.href}
                            className="block px-3 py-2 text-sm rounded-md hover-elevate active-elevate-2 transition-colors" 
                            data-testid={`link-${link.href.replace(/\//g, '-')}`}
                          >
                            {link.title}
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-10 px-2 text-sm font-medium 2xl:px-3" data-testid="button-passport-menu">
                      Intercultural Passport
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-64 p-2">
                        {passportLinks.map((link) => (
                          <Link 
                            key={link.href} 
                            href={link.href}
                            className="block px-3 py-2 text-sm rounded-md hover-elevate active-elevate-2 transition-colors" 
                            data-testid={`link-${link.href.replace(/\//g, '-')}`}
                          >
                            {link.title}
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Link 
                href="/stories"
                className={`px-2 py-2 text-sm font-medium rounded-md hover-elevate active-elevate-2 transition-colors 2xl:px-3 ${
                  location.startsWith("/stories") ? "bg-accent text-accent-foreground" : "text-foreground/80"
                }`}
                data-testid="link-nav-stories"
              >
                Stories
              </Link>

              <Link 
                href="/events"
                className={`px-2 py-2 text-sm font-medium rounded-md hover-elevate active-elevate-2 transition-colors 2xl:px-3 ${
                  location.startsWith("/events") ? "bg-accent text-accent-foreground" : "text-foreground/80"
                }`}
                data-testid="link-nav-events"
              >
                Events
              </Link>

              <Link 
                href="/action-plans"
                className={`px-2 py-2 text-sm font-medium rounded-md hover-elevate active-elevate-2 transition-colors 2xl:px-3 ${
                  location.startsWith("/action-plans") ? "bg-accent text-accent-foreground" : "text-foreground/80"
                }`}
                data-testid="link-nav-action-plans"
              >
                Action
              </Link>

              <Link 
                href="/infographics"
                className={`px-2 py-2 text-sm font-medium rounded-md hover-elevate active-elevate-2 transition-colors 2xl:px-3 ${
                  location.startsWith("/infographics") ? "bg-accent text-accent-foreground" : "text-foreground/80"
                }`}
                data-testid="link-nav-infographics"
              >
                Infographics
              </Link>

              <Link 
                href="/partners"
                className={`px-2 py-2 text-sm font-medium rounded-md hover-elevate active-elevate-2 transition-colors 2xl:px-3 ${
                  location === "/partners" ? "bg-accent text-accent-foreground" : "text-foreground/80"
                }`}
                data-testid="link-nav-partners"
              >
                Partners
              </Link>
            </nav>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-3 2xl:gap-4">
            <div className="hidden min-[1500px]:flex items-center gap-3 2xl:gap-4">
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

            <Link href="/login" className="hidden sm:inline-flex">
              <Button variant="outline" size="sm" data-testid="button-login">
                Login
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="min-[1320px]:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="min-[1320px]:hidden py-4 border-t" data-testid="mobile-menu">
            <div className="space-y-1">
              <Link href="/" className="block px-3 py-2 text-sm font-medium rounded-md hover-elevate" data-testid="link-mobile-home">
                Home
              </Link>

              <div className="space-y-1">
                <div className="px-3 py-2 text-sm font-semibold text-muted-foreground">About GREENENGINE</div>
                {aboutLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className="block px-5 py-2 text-sm rounded-md hover-elevate" 
                    data-testid={`link-mobile-${link.href.replace(/\//g, '-')}`}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              <div className="space-y-1">
                <div className="px-3 py-2 text-sm font-semibold text-muted-foreground">Intercultural Passport</div>
                {passportLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className="block px-5 py-2 text-sm rounded-md hover-elevate" 
                    data-testid={`link-mobile-${link.href.replace(/\//g, '-')}`}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              <Link href="/stories" className="block px-3 py-2 text-sm font-medium rounded-md hover-elevate" data-testid="link-mobile-stories">
                Stories
              </Link>

              <Link href="/events" className="block px-3 py-2 text-sm font-medium rounded-md hover-elevate" data-testid="link-mobile-events">
                Events
              </Link>

              <Link href="/action-plans" className="block px-3 py-2 text-sm font-medium rounded-md hover-elevate" data-testid="link-mobile-action-plans">
                Action
              </Link>

              <Link href="/infographics" className="block px-3 py-2 text-sm font-medium rounded-md hover-elevate" data-testid="link-mobile-infographics">
                Infographics
              </Link>

              <Link href="/partners" className="block px-3 py-2 text-sm font-medium rounded-md hover-elevate" data-testid="link-mobile-partners">
                Partners
              </Link>

              <Link href="/login" className="block px-3 py-2 text-sm font-medium rounded-md hover-elevate" data-testid="link-mobile-login">
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

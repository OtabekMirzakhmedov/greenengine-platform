import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import erasmusLogo from "@assets/Eurasmus+ Co-funded logo HIGH QUALITY_1763433184665.jpg";

const flagImageUrl = "/attached_assets/flag-collage.jpg";
const brandLogoUrl = "/attached_assets/greenengine-logo-new.jpg";

const aboutLinks = [
  { title: "About GREENENGINE", href: "/about" },
  { title: "Goals and Objectives", href: "/about/goals" },
  { title: "Management and Quality", href: "/about/management" },
];

const passportLinks = [
  { title: "Overview", href: "/passport" },
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

  const navLinkClass = (isActive: boolean) =>
    `inline-flex min-h-11 items-center rounded-full px-4 py-2 text-[15px] font-medium tracking-[-0.01em] transition-all duration-200 ${
      isActive
        ? "bg-secondary text-primary shadow-sm ring-1 ring-primary/10"
        : "text-foreground/78 hover:bg-secondary/70 hover:text-foreground"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-white transition-shadow ${
        scrolled ? "shadow-[0_12px_34px_rgba(15,23,42,0.08)]" : ""
      }`}
    >
      <div className="mx-auto w-full max-w-[1760px] px-4 lg:px-6 xl:px-8">
        <div className="flex min-h-[84px] items-center gap-4 py-3 xl:gap-6">
          <div className="flex shrink-0 items-center gap-4 xl:gap-5">
            <Link
              href="/"
              className="flex shrink-0 items-center rounded-2xl px-1 py-1 transition-colors hover-elevate active-elevate-2"
              data-testid="link-home"
            >
              <img
                src={brandLogoUrl}
                alt="GREENENGINE Logo"
                className="h-[3.7rem] w-auto max-w-[250px] object-contain sm:h-[4rem] sm:max-w-[300px] lg:h-[4.35rem] lg:max-w-[360px]"
              />
            </Link>

            <div className="hidden min-[1200px]:flex items-center self-center border-l border-border/80 pl-4 xl:pl-5">
              <img
                src={erasmusLogo}
                alt="Co-funded by the Erasmus+ Programme of the European Union"
                className="block h-[3.35rem] w-auto max-w-[230px] object-contain xl:h-[3.6rem] xl:max-w-[255px]"
              />
            </div>
          </div>

          <div className="hidden min-[1280px]:flex min-w-0 flex-1 justify-center px-4">
            <nav className="flex items-center gap-1.5 2xl:gap-2.5">
              <Link 
                href="/"
                className={navLinkClass(location === "/")}
                data-testid="link-nav-home"
              >
                Home
              </Link>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="min-h-11 rounded-full bg-transparent px-4 text-[15px] font-medium tracking-[-0.01em] text-foreground/78 hover:bg-secondary/70 hover:text-foreground focus:bg-secondary/70 data-[state=open]:bg-secondary data-[state=open]:text-primary [&_svg]:ml-1.5 [&_svg]:h-3.5 [&_svg]:w-3.5 [&_svg]:text-primary/75" data-testid="button-about-menu">
                      About GREENENGINE
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-72 rounded-2xl p-2">
                        {aboutLinks.map((link) => (
                          <Link 
                            key={link.href} 
                            href={link.href}
                            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary/70 hover:text-foreground" 
                            data-testid={`link-${link.href.replace(/\//g, '-')}`}
                          >
                            {link.title}
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="min-h-11 rounded-full bg-transparent px-4 text-[15px] font-medium tracking-[-0.01em] text-foreground/78 hover:bg-secondary/70 hover:text-foreground focus:bg-secondary/70 data-[state=open]:bg-secondary data-[state=open]:text-primary [&_svg]:ml-1.5 [&_svg]:h-3.5 [&_svg]:w-3.5 [&_svg]:text-primary/75" data-testid="button-passport-menu">
                      Intercultural Passport
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-72 rounded-2xl p-2">
                        {passportLinks.map((link) => (
                          <Link 
                            key={link.href} 
                            href={link.href}
                            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary/70 hover:text-foreground" 
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
                href="/activities"
                className={navLinkClass(location.startsWith("/activities") || location.startsWith("/about/activities"))}
                data-testid="link-nav-activities"
              >
                Activities
              </Link>

              <Link 
                href="/news"
                className={navLinkClass(location.startsWith("/news"))}
                data-testid="link-nav-news"
              >
                News
              </Link>

              <Link 
                href="/events"
                className={navLinkClass(location.startsWith("/events"))}
                data-testid="link-nav-events"
              >
                Events
              </Link>

              <Link 
                href="/tenders"
                className={navLinkClass(location.startsWith("/tenders"))}
                data-testid="link-nav-tenders"
              >
                Tenders
              </Link>

              <Link 
                href="/action-plans"
                className={navLinkClass(location.startsWith("/action-plans"))}
                data-testid="link-nav-action-plans"
              >
                Action
              </Link>

              <Link 
                href="/partners"
                className={navLinkClass(location === "/partners")}
                data-testid="link-nav-partners"
              >
                Partners
              </Link>
            </nav>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-3 xl:gap-4">
            <div className="hidden items-center self-center min-[1100px]:flex min-[1200px]:hidden">
              <img
                src={erasmusLogo}
                alt="Co-funded by the Erasmus+ Programme of the European Union"
                className="block h-[2.9rem] w-auto max-w-[185px] object-contain"
              />
            </div>

            <div className="hidden items-center self-center pl-1 min-[1100px]:flex">
              <img
                src={flagImageUrl}
                alt="Partner country and EU flags"
                className="h-[3.15rem] w-auto rounded-xl object-cover shadow-sm"
              />
            </div>

            <Link href="/login" className="hidden sm:inline-flex">
              <Button variant="outline" className="min-h-11 rounded-full border-primary/15 bg-white px-5 text-sm font-semibold text-primary shadow-[0_12px_30px_rgba(34,76,48,0.05)] transition-all hover:bg-primary hover:text-primary-foreground" data-testid="button-login">
                Login
              </Button>
            </Link>

            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 rounded-full border-primary/15 bg-white text-primary min-[1280px]:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="min-[1280px]:hidden border-t border-primary/10 py-4" data-testid="mobile-menu">
            <div className="space-y-1 rounded-3xl bg-white/95 p-2 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-muted/35 px-3 py-3 min-[540px]:hidden">
                <img
                  src={erasmusLogo}
                  alt="Co-funded by the European Union"
                  className="h-10 w-auto max-w-[160px] object-contain"
                />
                <img
                  src={flagImageUrl}
                  alt="Partner country and EU flags"
                  className="h-10 w-auto rounded-xl object-cover shadow-sm"
                />
              </div>
              <Link href="/" className="block rounded-2xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary/70 hover:text-foreground" data-testid="link-mobile-home">
                Home
              </Link>

              <div className="space-y-1 rounded-2xl bg-muted/35 p-2">
                <div className="px-2 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">About GREENENGINE</div>
                {aboutLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className="block rounded-xl px-4 py-2.5 text-sm font-medium text-foreground/78 hover:bg-white hover:text-foreground" 
                    data-testid={`link-mobile-${link.href.replace(/\//g, '-')}`}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              <div className="space-y-1 rounded-2xl bg-muted/35 p-2">
                <div className="px-2 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Intercultural Passport</div>
                {passportLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className="block rounded-xl px-4 py-2.5 text-sm font-medium text-foreground/78 hover:bg-white hover:text-foreground" 
                    data-testid={`link-mobile-${link.href.replace(/\//g, '-')}`}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              <Link href="/activities" className="block rounded-2xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary/70 hover:text-foreground" data-testid="link-mobile-activities">
                Activities
              </Link>

              <Link href="/news" className="block rounded-2xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary/70 hover:text-foreground" data-testid="link-mobile-news">
                News
              </Link>

              <Link href="/events" className="block rounded-2xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary/70 hover:text-foreground" data-testid="link-mobile-events">
                Events
              </Link>

              <Link href="/tenders" className="block rounded-2xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary/70 hover:text-foreground" data-testid="link-mobile-tenders">
                Tenders
              </Link>

              <Link href="/action-plans" className="block rounded-2xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary/70 hover:text-foreground" data-testid="link-mobile-action-plans">
                Action
              </Link>

              <Link href="/partners" className="block rounded-2xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary/70 hover:text-foreground" data-testid="link-mobile-partners">
                Partners
              </Link>

              <div className="pt-2">
                <Link href="/login" className="block">
                  <span className="flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_14px_34px_rgba(34,76,48,0.16)]">
                    Admin Login
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

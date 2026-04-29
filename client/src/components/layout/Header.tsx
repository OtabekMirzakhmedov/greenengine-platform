import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PassportSection } from "@shared/schema";
import { getPassportSectionHref, resolvePassportSection } from "@/lib/passportContent";
import erasmusLogo from "@assets/Eurasmus+ Co-funded logo HIGH QUALITY_1763433184665.jpg";

const flagImageUrl = "/attached_assets/flag-collage.jpg";
const brandLogoUrl = "/attached_assets/greenengine-navbar-logo-transparent.png";

const aboutLinks = [
  { title: "About GREENENGINE", href: "/about" },
  { title: "Goals and Objectives", href: "/about/goals" },
  { title: "Management and Quality", href: "/about/management" },
];

const fallbackPassportLinks = [
  { title: "Overview", href: "/passport" },
  { title: "Digital Storytelling", href: "/passport/digital-storytelling" },
];

type DesktopMenuKey = "about" | "passport" | null;

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState<DesktopMenuKey>(null);
  const desktopMenuRef = useRef<HTMLDivElement | null>(null);
  const { data: passportMenuSections } = useQuery<PassportSection[]>({
    queryKey: ["/api/passport-sections/menu"],
  });
  const { data: passportLandingSection } = useQuery<PassportSection>({
    queryKey: ["/api/passport-sections/landing"],
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDesktopMenuOpen(null);
  }, [location]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!desktopMenuRef.current?.contains(event.target as Node)) {
        setDesktopMenuOpen(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const navLinkClass = (isActive: boolean) =>
    `inline-flex min-h-10 items-center rounded-full px-3.5 py-1.5 text-[15px] font-medium tracking-[-0.01em] transition-all duration-200 ${
      isActive
        ? "bg-[#8ca11f] text-[#f8fbe9] shadow-[0_10px_22px_rgba(78,96,16,0.24)] ring-1 ring-[#6e7f18]/25"
        : "text-[#263108] hover:bg-[#b4c524] hover:text-[#1b2405]"
    }`;

  const erasmusLogoClass =
    "block w-auto object-contain mix-blend-multiply [filter:saturate(1.02)_contrast(1.04)]";
  const resolvedPassportLanding = passportLandingSection ? resolvePassportSection(passportLandingSection) : null;
  const passportTriggerLabel = resolvedPassportLanding?.navLabel || resolvedPassportLanding?.title || "Intercultural Passport";
  const resolvedPassportLinks =
    passportMenuSections?.map((section) => {
      const resolvedSection = resolvePassportSection(section);
      return {
        title: resolvedSection.navLabel,
        href: getPassportSectionHref(resolvedSection),
      };
    }) ?? [];
  const passportLinks = resolvedPassportLinks.length > 0 ? resolvedPassportLinks : fallbackPassportLinks;

  const renderDesktopDropdown = (
    menuKey: Exclude<DesktopMenuKey, null>,
    label: string,
    links: Array<{ title: string; href: string }>,
  ) => {
    const isOpen = desktopMenuOpen === menuKey;

    return (
      <div
        className="relative"
        onMouseEnter={() => setDesktopMenuOpen(menuKey)}
        onMouseLeave={() => setDesktopMenuOpen((current) => (current === menuKey ? null : current))}
      >
        <button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className={`inline-flex min-h-10 items-center rounded-full px-3.5 py-1.5 text-[15px] font-medium tracking-[-0.01em] transition-all duration-200 ${
            isOpen
              ? "bg-[#8ca11f] text-[#f8fbe9] shadow-[0_10px_22px_rgba(78,96,16,0.24)] ring-1 ring-[#6e7f18]/25"
              : "text-[#263108] hover:bg-[#b4c524] hover:text-[#1b2405]"
          }`}
          data-testid={`button-${menuKey}-menu`}
          onClick={() => setDesktopMenuOpen((current) => (current === menuKey ? null : menuKey))}
          onFocus={() => setDesktopMenuOpen(menuKey)}
        >
          {label}
          <ChevronDown
            className={`ml-1.5 h-3.5 w-3.5 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#eef5cc]" : "text-[#5a6a14]"
            }`}
            aria-hidden="true"
          />
        </button>

        <div
          className={`absolute left-1/2 top-full z-[80] w-72 -translate-x-1/2 pt-1 transition-all duration-150 ${
            isOpen ? "pointer-events-auto visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-1 opacity-0"
          }`}
        >
          <div className="absolute inset-x-0 -top-3 h-3" aria-hidden="true" />
          <div className="overflow-hidden rounded-2xl border border-[#dbe49f] bg-[#f9fbe9] p-2 shadow-[0_18px_38px_rgba(62,78,11,0.16)]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#34420d] transition-colors hover:bg-[#e8efbf] hover:text-[#1f2906]"
                data-testid={`link-${link.href.replace(/\//g, "-")}`}
                onClick={() => setDesktopMenuOpen(null)}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-[#9aac25] bg-[#c6d309] transition-shadow ${
        scrolled ? "shadow-[0_14px_34px_rgba(62,78,11,0.18)]" : "shadow-[0_1px_0_rgba(110,127,24,0.18)]"
      }`}
    >
      <div className="mx-auto w-full max-w-[1760px] px-3 lg:px-4 xl:px-6">
        <div className="flex min-h-[70px] items-center gap-2 py-1 xl:gap-3">
          <div className="flex min-w-0 shrink-0 items-center gap-2 xl:gap-3">
            <Link
              href="/"
              aria-label="GREEN ENGINE home"
              className="flex h-[3.65rem] w-[10.75rem] shrink-0 items-center justify-start overflow-hidden bg-[#c6d309] p-0 transition-[filter] duration-200 hover:[filter:brightness(0.95)] sm:w-[11.75rem] lg:w-[12.75rem] xl:h-[3.75rem] xl:w-[13.75rem]"
              data-testid="link-home"
            >
              <img
                src={brandLogoUrl}
                alt="GREEN ENGINE Logo"
                className="h-full w-full object-contain object-left [filter:saturate(1.04)_contrast(1.04)]"
              />
            </Link>

            <div className="hidden items-center self-center border-l border-[#a8ba29] pl-2.5 min-[1536px]:flex xl:pl-3">
              <img
                src={erasmusLogo}
                alt="Co-funded by the Erasmus+ Programme of the European Union"
                className={`${erasmusLogoClass} h-[2.75rem] max-w-[198px] xl:h-[2.95rem] xl:max-w-[218px]`}
              />
            </div>
          </div>

          <div ref={desktopMenuRef} className="hidden min-[1280px]:flex min-w-0 flex-1 justify-center px-1">
            <nav className="flex items-center gap-0.5 2xl:gap-1.5">
              <Link 
                href="/"
                className={navLinkClass(location === "/")}
                data-testid="link-nav-home"
              >
                Home
              </Link>

              {renderDesktopDropdown("about", "About GREENENGINE", aboutLinks)}
              {renderDesktopDropdown("passport", passportTriggerLabel, passportLinks)}

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
                href="/partners"
                className={navLinkClass(location === "/partners")}
                data-testid="link-nav-partners"
              >
                Partners
              </Link>
            </nav>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 xl:gap-2.5">
            <div className="hidden items-center self-center min-[1100px]:flex min-[1280px]:hidden">
              <img
                src={erasmusLogo}
                alt="Co-funded by the Erasmus+ Programme of the European Union"
                className={`${erasmusLogoClass} h-[2.5rem] max-w-[162px]`}
              />
            </div>

            <div className="hidden items-center self-center pl-1 min-[1100px]:flex min-[1280px]:hidden min-[1536px]:flex">
              <img
                src={flagImageUrl}
                alt="Partner country and EU flags"
                className="h-[2.65rem] w-auto rounded-xl object-cover shadow-sm"
              />
            </div>

            <Link href="/login" className="hidden sm:inline-flex">
              <Button variant="outline" className="min-h-10 rounded-full border-[#8ea01f] bg-[#f8fbe9] px-4 text-sm font-semibold text-[#30400d] shadow-[0_10px_24px_rgba(73,90,14,0.10)] transition-all hover:border-[#708117] hover:bg-[#8ca11f] hover:text-[#f8fbe9]" data-testid="button-login">
                Login
              </Button>
            </Link>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-[#8ea01f] bg-[#f8fbe9] text-[#30400d] min-[1280px]:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="min-[1280px]:hidden border-t border-[#9aac25] py-4" data-testid="mobile-menu">
            <div className="space-y-1 rounded-3xl bg-[#d6df52]/95 p-2 shadow-[0_16px_40px_rgba(62,78,11,0.18)]">
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#edf2c6] px-3 py-3 min-[540px]:hidden">
                <img
                  src={erasmusLogo}
                  alt="Co-funded by the European Union"
                  className={`${erasmusLogoClass} h-10 max-w-[160px]`}
                />
                <img
                  src={flagImageUrl}
                  alt="Partner country and EU flags"
                  className="h-10 w-auto rounded-xl object-cover shadow-sm"
                />
              </div>
              <Link href="/" className="block rounded-2xl px-4 py-3 text-sm font-medium text-[#263108] hover:bg-[#edf2c6] hover:text-[#1b2405]" data-testid="link-mobile-home">
                Home
              </Link>

              <div className="space-y-1 rounded-2xl bg-[#edf2c6] p-2">
                <div className="px-2 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6d17]">About GREENENGINE</div>
                {aboutLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#2f3a0c] hover:bg-white hover:text-[#1b2405]" 
                    data-testid={`link-mobile-${link.href.replace(/\//g, '-')}`}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              <div className="space-y-1 rounded-2xl bg-[#edf2c6] p-2">
                <div className="px-2 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6d17]">{passportTriggerLabel}</div>
                {passportLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#2f3a0c] hover:bg-white hover:text-[#1b2405]" 
                    data-testid={`link-mobile-${link.href.replace(/\//g, '-')}`}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              <Link href="/activities" className="block rounded-2xl px-4 py-3 text-sm font-medium text-[#263108] hover:bg-[#edf2c6] hover:text-[#1b2405]" data-testid="link-mobile-activities">
                Activities
              </Link>

              <Link href="/news" className="block rounded-2xl px-4 py-3 text-sm font-medium text-[#263108] hover:bg-[#edf2c6] hover:text-[#1b2405]" data-testid="link-mobile-news">
                News
              </Link>

              <Link href="/events" className="block rounded-2xl px-4 py-3 text-sm font-medium text-[#263108] hover:bg-[#edf2c6] hover:text-[#1b2405]" data-testid="link-mobile-events">
                Events
              </Link>

              <Link href="/tenders" className="block rounded-2xl px-4 py-3 text-sm font-medium text-[#263108] hover:bg-[#edf2c6] hover:text-[#1b2405]" data-testid="link-mobile-tenders">
                Tenders
              </Link>

              <Link href="/partners" className="block rounded-2xl px-4 py-3 text-sm font-medium text-[#263108] hover:bg-[#edf2c6] hover:text-[#1b2405]" data-testid="link-mobile-partners">
                Partners
              </Link>

              <div className="pt-2">
                <Link href="/login" className="block">
                  <span className="flex min-h-11 items-center justify-center rounded-full bg-[#8ca11f] px-5 text-sm font-semibold text-[#f8fbe9] shadow-[0_14px_34px_rgba(62,78,11,0.20)]">
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

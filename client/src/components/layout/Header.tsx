import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PassportSection } from "@shared/schema";
import { getPassportSectionHref, resolvePassportSection } from "@/lib/passportContent";
import erasmusLogo from "@assets/Eurasmus+ Co-funded logo HIGH QUALITY_1763433184665.jpg";

const flagImageUrl = "/attached_assets/flag-collage.jpg";
const brandLogoUrl = "/attached_assets/greenengine-navbar-logo-official.png";

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
        ? "bg-[#1f7a3a] text-white shadow-[0_10px_22px_rgba(31,122,58,0.18)] ring-1 ring-[#16592b]/15"
        : "text-[#23452b] hover:bg-[#eef7ed] hover:text-[#14572a]"
    }`;

  const erasmusLogoClass = "block w-auto object-contain";
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
              ? "bg-[#1f7a3a] text-white shadow-[0_10px_22px_rgba(31,122,58,0.18)] ring-1 ring-[#16592b]/15"
              : "text-[#23452b] hover:bg-[#eef7ed] hover:text-[#14572a]"
          }`}
          data-testid={`button-${menuKey}-menu`}
          onClick={() => setDesktopMenuOpen((current) => (current === menuKey ? null : menuKey))}
          onFocus={() => setDesktopMenuOpen(menuKey)}
        >
          {label}
          <ChevronDown
            className={`ml-1.5 h-3.5 w-3.5 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-white" : "text-[#4d7555]"
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
          <div className="overflow-hidden rounded-2xl border border-[#dfe9df] bg-white p-2 shadow-[0_18px_38px_rgba(22,89,43,0.12)]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#23452b] transition-colors hover:bg-[#eef7ed] hover:text-[#14572a]"
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
      className={`sticky top-0 z-50 w-full border-b border-[#e1e9df] bg-white transition-shadow ${
        scrolled ? "shadow-[0_14px_34px_rgba(22,89,43,0.10)]" : "shadow-[0_1px_0_rgba(22,89,43,0.08)]"
      }`}
    >
      <div className="mx-auto w-full max-w-[1760px] px-3 lg:px-4 xl:px-6">
        <div className="flex min-h-[70px] items-center gap-2 py-1 xl:gap-3">
          <div className="flex min-w-0 shrink-0 items-center gap-2 xl:gap-3">
            <Link
              href="/"
              aria-label="GREEN ENGINE home"
              className="flex h-[3.65rem] w-[12.25rem] shrink-0 items-center justify-start overflow-hidden bg-white p-0 sm:w-[14.25rem] lg:w-[15rem] xl:h-[3.75rem] xl:w-[16rem]"
              data-testid="link-home"
            >
              <img
                src={brandLogoUrl}
                alt="GREEN ENGINE Logo"
                className="h-full w-full object-contain object-left"
              />
            </Link>

            <div className="hidden items-center self-center border-l border-[#dfe9df] pl-2.5 min-[1536px]:flex xl:pl-3">
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
                className="h-[2.65rem] w-auto object-contain"
              />
            </div>

            <Link href="/login" className="hidden sm:inline-flex">
              <Button variant="outline" className="min-h-10 rounded-full border-[#cfe0cf] bg-white px-4 text-sm font-semibold text-[#23452b] shadow-[0_8px_20px_rgba(22,89,43,0.08)] transition-all hover:border-[#1f7a3a] hover:bg-[#1f7a3a] hover:text-white" data-testid="button-login">
                Login
              </Button>
            </Link>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full border-[#cfe0cf] bg-white text-[#23452b] shadow-[0_8px_20px_rgba(22,89,43,0.08)] min-[1280px]:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="min-[1280px]:hidden border-t border-[#e1e9df] py-4" data-testid="mobile-menu">
            <div className="space-y-1 rounded-3xl border border-[#e1e9df] bg-white p-2 shadow-[0_16px_40px_rgba(22,89,43,0.12)]">
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#f6faf5] px-3 py-3 min-[540px]:hidden">
                <img
                  src={erasmusLogo}
                  alt="Co-funded by the European Union"
                  className={`${erasmusLogoClass} h-10 max-w-[160px]`}
                />
                <img
                  src={flagImageUrl}
                  alt="Partner country and EU flags"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <Link href="/" className="block rounded-2xl px-4 py-3 text-sm font-medium text-[#23452b] hover:bg-[#eef7ed] hover:text-[#14572a]" data-testid="link-mobile-home">
                Home
              </Link>

              <div className="space-y-1 rounded-2xl bg-[#f6faf5] p-2">
                <div className="px-2 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#4d7555]">About GREENENGINE</div>
                {aboutLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#23452b] hover:bg-white hover:text-[#14572a]"
                    data-testid={`link-mobile-${link.href.replace(/\//g, '-')}`}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              <div className="space-y-1 rounded-2xl bg-[#f6faf5] p-2">
                <div className="px-2 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#4d7555]">{passportTriggerLabel}</div>
                {passportLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#23452b] hover:bg-white hover:text-[#14572a]"
                    data-testid={`link-mobile-${link.href.replace(/\//g, '-')}`}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              <Link href="/activities" className="block rounded-2xl px-4 py-3 text-sm font-medium text-[#23452b] hover:bg-[#eef7ed] hover:text-[#14572a]" data-testid="link-mobile-activities">
                Activities
              </Link>

              <Link href="/news" className="block rounded-2xl px-4 py-3 text-sm font-medium text-[#23452b] hover:bg-[#eef7ed] hover:text-[#14572a]" data-testid="link-mobile-news">
                News
              </Link>

              <Link href="/events" className="block rounded-2xl px-4 py-3 text-sm font-medium text-[#23452b] hover:bg-[#eef7ed] hover:text-[#14572a]" data-testid="link-mobile-events">
                Events
              </Link>

              <Link href="/tenders" className="block rounded-2xl px-4 py-3 text-sm font-medium text-[#23452b] hover:bg-[#eef7ed] hover:text-[#14572a]" data-testid="link-mobile-tenders">
                Tenders
              </Link>

              <Link href="/partners" className="block rounded-2xl px-4 py-3 text-sm font-medium text-[#23452b] hover:bg-[#eef7ed] hover:text-[#14572a]" data-testid="link-mobile-partners">
                Partners
              </Link>

              <div className="pt-2">
                <Link href="/login" className="block">
                  <span className="flex min-h-11 items-center justify-center rounded-full bg-[#1f7a3a] px-5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(31,122,58,0.18)]">
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

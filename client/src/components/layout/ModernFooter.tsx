import { Link } from "wouter";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { ArrowRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import erasmusLogo from "@assets/Eurasmus+ Co-funded logo HIGH QUALITY_1763433184665.jpg";

const brandLogoUrl = "/attached_assets/greenengine-logo-new.jpg";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/passport", label: "Intercultural Passport" },
  { href: "/activities", label: "Activities" },
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/tenders", label: "Tenders" },
  { href: "/action-plans", label: "Action Plans" },
  { href: "/partners", label: "Partners" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=61586359144401",
    label: "Facebook",
    icon: FaFacebook,
    testId: "link-footer-facebook",
  },
  {
    href: "https://www.instagram.com/greenengine26?igsh=cnF5NzUzcXY3ZXY%3D&utm_source=qr",
    label: "Instagram",
    icon: FaInstagram,
    testId: "link-footer-instagram",
  },
  {
    href: "https://www.linkedin.com/company/greenengine-cbhe",
    label: "LinkedIn",
    icon: FaLinkedin,
    testId: "link-footer-linkedin",
  },
];

export default function ModernFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-primary/10 bg-[linear-gradient(180deg,#0f2d1a_0%,#133b22_42%,#f7fbf7_42%,#ffffff_100%)]">
      <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,rgba(190,242,100,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(187,247,208,0.14),transparent_32%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 py-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end">
          <div className="space-y-6 text-white">
            <div className="inline-flex items-center rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/75 backdrop-blur-sm">
              International Educational Initiative
            </div>
            <div className="max-w-3xl space-y-4">
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                Building greener engineering education through collaboration, innovation, and intercultural learning.
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-white/78 md:text-base">
                GREEN ENGINE connects institutions across Central Asia and Europe to support sustainability, strengthen engineering education, and create practical impact through shared research, mobility, and modern learning approaches.
              </p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 text-white shadow-[0_24px_60px_rgba(0,0,0,0.16)] backdrop-blur-md">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">Admin Access</p>
                <p className="text-sm leading-6 text-white/78">
                  Sign in to manage homepage content, activities, events, news, tenders, and partner information.
                </p>
              </div>
              <Button
                asChild
                className="h-12 rounded-full bg-white px-6 text-primary shadow-[0_14px_30px_rgba(255,255,255,0.18)] hover:bg-lime-50"
                data-testid="button-footer-admin"
              >
                <Link href="/login">
                  Admin Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="relative -mt-2 rounded-[2rem] border border-primary/10 bg-white/96 p-8 shadow-[0_32px_90px_rgba(16,53,31,0.14)] backdrop-blur-xl md:p-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)_minmax(0,0.95fr)_minmax(0,0.85fr)]">
            <div className="space-y-6">
              <Link href="/" data-testid="link-footer-home">
                <img
                  src={brandLogoUrl}
                  alt="GREENENGINE Logo"
                  className="h-20 w-auto max-w-[320px] object-contain sm:h-24 sm:max-w-[360px]"
                />
              </Link>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">About Green Engine</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    GREEN ENGINE is an international educational and innovation initiative focused on sustainable solutions, intercultural competence, and green transformation in higher education.
                  </p>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  The project brings together partners from Central Asia and Europe to improve education quality, support collaborative research, and introduce modern technologies in engineering and environmental fields.
                </p>
              </div>

              <div className="rounded-2xl border border-primary/10 bg-secondary/35 p-4">
                <img
                  src={erasmusLogo}
                  alt="Co-funded by the European Union"
                  className="h-16 w-auto max-w-full object-contain"
                />
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
              <nav className="grid gap-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-foreground">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Email</p>
                    <a
                      href="mailto:info@greenengine.uz"
                      className="mt-1 block text-sm text-foreground transition-colors hover:text-primary"
                      data-testid="link-footer-email"
                    >
                      info@greenengine.uz
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Phone</p>
                    <a href="tel:+998781294040" className="mt-1 block text-sm text-foreground transition-colors hover:text-primary">
                      +998 78 129 4040
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Location</p>
                    <p className="mt-1 text-sm text-foreground">Central Asia & Europe</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Working Hours</p>
                    <p className="mt-1 text-sm text-foreground">Mon - Fri, 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-foreground">Connect</h3>
              <p className="text-sm leading-7 text-muted-foreground">
                Follow GREEN ENGINE for project updates, publications, and partnership highlights.
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      data-testid={social.testId}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/12 bg-secondary/45 text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-primary hover:text-primary-foreground"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
              <div className="rounded-2xl border border-dashed border-primary/15 bg-secondary/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">Project Focus</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Sustainability, engineering innovation, intercultural learning, and international academic collaboration.
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                (c) {new Date().getFullYear()} GREENENGINE Project. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground">
                Co-funded by the European Union. Views and opinions expressed are those of the authors.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5 md:justify-end">
              <Link href="/about" className="text-xs text-muted-foreground transition-colors hover:text-primary">
                Project Overview
              </Link>
              <Link href="/news" className="text-xs text-muted-foreground transition-colors hover:text-primary">
                Newsroom
              </Link>
              <Link href="/login" className="text-xs text-muted-foreground transition-colors hover:text-primary">
                Admin Access
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

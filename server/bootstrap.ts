import { eq } from "drizzle-orm";
import { db } from "./db";
import { passportSections, type InsertPassportSection, type PassportSection } from "@shared/schema";
import { log } from "./vite";

export const baselinePassportSections: InsertPassportSection[] = [
  {
    title: "Intercultural Passport",
    navLabel: "Intercultural Passport",
    slug: "overview",
    summary:
      "Developing global competencies through innovative learning experiences, creative reflection, and cross-cultural dialogue.",
    content:
      "<p>The Intercultural Passport is a guided Erasmus+ learning space where students reflect on cultural encounters, communication, inclusion, mobility, and identity.</p><p>It helps learners document meaningful experiences, connect them with intercultural competences, and build a visible record of personal and academic growth.</p>",
    imageUrl: null,
    mediaUrl: null,
    links: [{ label: "Open Digital Storytelling", url: "/passport/digital-storytelling" }],
    translations: {},
    order: 0,
    isVisible: true,
    showInMenu: true,
    isLanding: true,
  },
  {
    title: "Digital Storytelling",
    navLabel: "Digital Storytelling",
    slug: "digital-storytelling",
    summary:
      "Sharing cultural experiences through multimedia narratives, reflection, and student-led storytelling practices.",
    content:
      "<p>Digital Storytelling helps students transform intercultural experiences into reflective multimedia narratives. Through writing, images, voice, video, and personal perspective, learners connect mobility, identity, dialogue, inclusion, and sustainability with their own lived experience.</p>",
    imageUrl: "/attached_assets/passport-stories/image1.png",
    mediaUrl: null,
    links: [{ label: "Back to Passport Overview", url: "/passport" }],
    translations: {},
    order: 1,
    isVisible: true,
    showInMenu: true,
    isLanding: false,
  },
];

export const fallbackPassportSections: PassportSection[] = baselinePassportSections.map((section) => ({
  id: `baseline-${section.slug}`,
  title: section.title,
  navLabel: section.navLabel,
  slug: section.slug,
  summary: section.summary ?? null,
  content: section.content ?? null,
  imageUrl: section.imageUrl ?? null,
  mediaUrl: section.mediaUrl ?? null,
  links: section.links ?? [],
  translations: section.translations ?? {},
  order: section.order ?? 0,
  isVisible: section.isVisible ?? true,
  showInMenu: section.showInMenu ?? true,
  isLanding: section.isLanding ?? false,
  updatedAt: new Date(0),
}));

export const getFallbackPassportSectionBySlug = (slug: string) =>
  fallbackPassportSections.find((section) => section.slug === slug);

export const getFallbackPassportLandingSection = () =>
  fallbackPassportSections.find((section) => section.isLanding) ?? fallbackPassportSections[0];

export const getFallbackPassportMenuSections = () =>
  fallbackPassportSections.filter((section) => section.isVisible && section.showInMenu);

export async function ensurePassportBaselineData() {
  for (const section of baselinePassportSections) {
    const existing = await db
      .select({ id: passportSections.id })
      .from(passportSections)
      .where(eq(passportSections.slug, section.slug))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(passportSections).values(section);
      log(`bootstrapped passport section "${section.slug}"`, "bootstrap");
    } else {
      await db
        .update(passportSections)
        .set({
          ...section,
          updatedAt: new Date(),
        })
        .where(eq(passportSections.slug, section.slug));
      log(`repaired passport section "${section.slug}"`, "bootstrap");
    }
  }
}

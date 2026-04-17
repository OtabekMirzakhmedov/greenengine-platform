import { eq } from "drizzle-orm";
import { db } from "./db";
import { passportSections } from "@shared/schema";
import { log } from "./vite";

const baselinePassportSections = [
  {
    title: "Intercultural Passport",
    navLabel: "Intercultural Passport",
    slug: "overview",
    summary:
      "Developing global competencies through innovative learning experiences, creative reflection, and cross-cultural dialogue.",
    content:
      "<p>The Intercultural Passport is an evolving educational framework designed to help students and educators strengthen intercultural awareness, communication, and collaborative problem-solving across diverse academic environments.</p><p>This module can now be managed entirely from the admin panel, including submenu labels, content ordering, visibility, media, and multilingual content variants.</p>",
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
      "<p>Digital Storytelling combines personal narrative, cultural reflection, and accessible media tools to help participants express intercultural experiences in meaningful ways.</p><p>This page now highlights real stories curated through the admin panel, complete with professional card layouts, media, and multilingual detail pages.</p>",
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
      log(`passport section "${section.slug}" already exists`, "bootstrap");
    }
  }
}

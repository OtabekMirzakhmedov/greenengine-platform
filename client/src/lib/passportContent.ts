import type { PassportSection, PassportStory } from "@shared/schema";

export interface ResolvedPassportSection extends PassportSection {
  title: string;
  navLabel: string;
  summary: string | null;
  content: string | null;
  imageUrl: string | null;
  mediaUrl: string | null;
  links: Array<{ label: string; url: string }>;
}

export interface ResolvedPassportStory extends PassportStory {
  title: string;
  excerpt: string | null;
  content: string | null;
  imageUrl: string | null;
  mediaUrl: string | null;
  author: string | null;
  gallery: string[];
  attachments: Array<{ name: string; url: string; size: string }>;
}

export const detectPassportLocale = () => {
  if (typeof navigator === "undefined") {
    return "en";
  }

  return navigator.language.split("-")[0].toLowerCase();
};

export const resolvePassportSection = (
  section: PassportSection,
  locale = detectPassportLocale(),
): ResolvedPassportSection => {
  const translation = section.translations?.[locale];

  return {
    ...section,
    title: translation?.title || section.title,
    navLabel: translation?.navLabel || section.navLabel || section.title,
    summary: translation?.summary || section.summary || null,
    content: translation?.content || section.content || null,
    imageUrl: translation?.imageUrl || section.imageUrl || null,
    mediaUrl: translation?.mediaUrl || section.mediaUrl || null,
    links: translation?.links || section.links || [],
  };
};

export const resolvePassportStory = (
  story: PassportStory,
  locale = detectPassportLocale(),
): ResolvedPassportStory => {
  const translation = story.translations?.[locale];

  return {
    ...story,
    title: translation?.title || story.title,
    excerpt: translation?.excerpt || story.excerpt || null,
    content: translation?.content || story.content || null,
    imageUrl: translation?.imageUrl || story.imageUrl || null,
    mediaUrl: translation?.mediaUrl || story.mediaUrl || null,
    author: translation?.author || story.author || null,
    gallery: translation?.gallery || story.gallery || [],
    attachments: translation?.attachments || story.attachments || [],
  };
};

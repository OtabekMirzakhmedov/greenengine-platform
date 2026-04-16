import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: integer("created_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const pages = sqliteTable("pages", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  content: text("content"),
  published: integer("published").notNull().default(1),
  updatedAt: integer("updated_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const heroSections = sqliteTable("hero_sections", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  imageUrl: text("image_url").notNull(),
  order: integer("order").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const homeActivityCards = sqliteTable("home_activity_cards", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  ctaText: text("cta_text").notNull(),
  ctaLink: text("cta_link").notNull(),
  order: integer("order").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const passportSections = sqliteTable("passport_sections", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  navLabel: text("nav_label").notNull(),
  slug: text("slug").notNull().unique(),
  summary: text("summary"),
  content: text("content"),
  imageUrl: text("image_url"),
  mediaUrl: text("media_url"),
  links: text("links", { mode: "json" })
    .$type<Array<{ label: string; url: string }>>()
    .default(sql`'[]'`),
  translations: text("translations", { mode: "json" })
    .$type<Record<string, {
      title?: string;
      navLabel?: string;
      summary?: string;
      content?: string;
      imageUrl?: string;
      mediaUrl?: string;
      links?: Array<{ label: string; url: string }>;
    }>>()
    .default(sql`'{}'`),
  order: integer("order").notNull().default(0),
  isVisible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
  showInMenu: integer("show_in_menu", { mode: "boolean" }).notNull().default(true),
  isLanding: integer("is_landing", { mode: "boolean" }).notNull().default(false),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const passportStories = sqliteTable("passport_stories", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  sectionId: text("section_id").notNull().references(() => passportSections.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  imageUrl: text("image_url"),
  gallery: text("gallery", { mode: "json" }).$type<string[]>().default(sql`'[]'`),
  mediaUrl: text("media_url"),
  attachments: text("attachments", { mode: "json" })
    .$type<Array<{ name: string; url: string; size: string }>>()
    .default(sql`'[]'`),
  author: text("author"),
  order: integer("order").notNull().default(0),
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(true),
  publishedAt: integer("published_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  translations: text("translations", { mode: "json" })
    .$type<Record<string, {
      title?: string;
      excerpt?: string;
      content?: string;
      imageUrl?: string;
      mediaUrl?: string;
      author?: string;
      gallery?: string[];
      attachments?: Array<{ name: string; url: string; size: string }>;
    }>>()
    .default(sql`'{}'`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const activities = sqliteTable("activities", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  content: text("content"),
  imageUrl: text("image_url").notNull(),
  gallery: text("gallery", { mode: "json" }).$type<string[]>().default(sql`'[]'`),
  attachments: text("attachments", { mode: "json" }).$type<Array<{ name: string; url: string; size: string }>>().default(sql`'[]'`),
  author: text("author"),
  ctaText: text("cta_text").notNull().default("Read Activity"),
  ctaLink: text("cta_link"),
  order: integer("order").notNull().default(0),
  publishedAt: integer("published_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const storyGalleries = sqliteTable("story_galleries", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  images: text("images", { mode: "json" }).$type<string[]>().default(sql`'[]'`),
  order: integer("order").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const institutions = sqliteTable("institutions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  country: text("country").notNull(),
  description: text("description"),
  story: text("story"),
  achievements: text("achievements"),
  logoUrl: text("logo_url"),
  heroImageUrl: text("hero_image_url"),
  gallery: text("gallery", { mode: 'json' }).$type<string[]>().default(sql`'[]'`),
  videoUrl: text("video_url"),
  attachments: text("attachments", { mode: 'json' }).$type<Array<{ name: string; url: string; size: string }>>().default(sql`'[]'`),
  order: integer("order").notNull().default(0),
  updatedAt: integer("updated_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const events = sqliteTable("events", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  date: integer("date", { mode: 'timestamp' }).notNull(),
  location: text("location"),
  venue: text("venue"),
  overview: text("overview"),
  agenda: text("agenda"),
  agendaPdfUrl: text("agenda_pdf_url"),
  photoCount: integer("photo_count").default(0),
  gallery: text("gallery", { mode: 'json' }).$type<string[]>().default(sql`'[]'`),
  documents: text("documents", { mode: 'json' }).$type<Array<{ name: string; url: string; size: string }>>().default(sql`'[]'`),
  attendeeCount: integer("attendee_count"),
  updatedAt: integer("updated_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const actionPlans = sqliteTable("action_plans", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  fileUrl: text("file_url"),
  fileSize: text("file_size"),
  order: integer("order").notNull().default(0),
  updatedAt: integer("updated_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const infographics = sqliteTable("infographics", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  pdfUrl: text("pdf_url"),
  pdfSize: text("pdf_size"),
  order: integer("order").notNull().default(0),
  updatedAt: integer("updated_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const communityPlans = sqliteTable("community_plans", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  fileUrl: text("file_url"),
  fileSize: text("file_size"),
  order: integer("order").notNull().default(0),
  updatedAt: integer("updated_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const partners = sqliteTable("partners", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  country: text("country"),
  established: text("established"),
  description: text("description"),
  roleInProject: text("role_in_project"),
  pic: text("pic"),
  address: text("address"),
  phone: text("phone"),
  email: text("email"),
  logoUrl: text("logo_url"),
  websiteUrl: text("website_url"),
  order: integer("order").notNull().default(0),
});

export const news = sqliteTable("news", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  imageUrl: text("image_url"),
  attachments: text("attachments", { mode: "json" }).$type<Array<{ name: string; url: string; size: string }>>().default(sql`'[]'`),
  status: text("status").notNull().default("published"),
  publishedAt: integer("published_at", { mode: 'timestamp' }).notNull(),
  order: integer("order").notNull().default(0),
  updatedAt: integer("updated_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const tenders = sqliteTable("tenders", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  imageUrl: text("image_url"),
  attachments: text("attachments", { mode: "json" }).$type<Array<{ name: string; url: string; size: string }>>().default(sql`'[]'`),
  status: text("status").notNull().default("draft"),
  publishedAt: integer("published_at", { mode: "timestamp" }).notNull(),
  order: integer("order").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertPageSchema = createInsertSchema(pages).omit({ id: true, updatedAt: true });
export const insertHeroSectionSchema = createInsertSchema(heroSections).omit({ id: true, updatedAt: true });
export const insertHomeActivityCardSchema = createInsertSchema(homeActivityCards).omit({ id: true, updatedAt: true });
const passportLinkSchema = z.object({
  label: z.string().min(1, "Link label is required"),
  url: z.string().min(1, "Link URL is required"),
});
const passportTranslationSchema = z.object({
  title: z.string().optional(),
  navLabel: z.string().optional(),
  summary: z.string().optional(),
  content: z.string().optional(),
  imageUrl: z.string().optional(),
  mediaUrl: z.string().optional(),
  links: z.array(passportLinkSchema).optional(),
});
export const insertPassportSectionSchema = createInsertSchema(passportSections)
  .omit({ id: true, updatedAt: true })
  .extend({
    links: z.array(passportLinkSchema).default([]),
    translations: z.record(z.string(), passportTranslationSchema).default({}),
  });
const uploadedAttachmentSchema = z.object({
  name: z.string().min(1, "Attachment name is required"),
  url: z.string().min(1, "Attachment URL is required"),
  size: z.string().optional().default(""),
});
const passportStoryTranslationSchema = z.object({
  title: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  imageUrl: z.string().optional(),
  mediaUrl: z.string().optional(),
  author: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  attachments: z.array(uploadedAttachmentSchema).optional(),
});
export const insertPassportStorySchema = createInsertSchema(passportStories)
  .omit({ id: true, updatedAt: true })
  .extend({
    gallery: z.array(z.string()).default([]),
    attachments: z.array(uploadedAttachmentSchema).default([]),
    publishedAt: z.coerce.date().optional(),
    translations: z.record(z.string(), passportStoryTranslationSchema).default({}),
  });
export const updatePassportStorySchema = insertPassportStorySchema.partial().superRefine((data, ctx) => {
  if (Object.keys(data).length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least one field must be provided for update",
    });
  }
});
export const updatePassportSectionSchema = insertPassportSectionSchema.partial().superRefine((data, ctx) => {
  if (Object.keys(data).length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least one field must be provided for update",
    });
  }
});
export const updateHomeActivityCardSchema = insertHomeActivityCardSchema.partial().superRefine((data, ctx) => {
  if (Object.keys(data).length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least one field must be provided for update",
    });
  }
});
export const insertActivitySchema = createInsertSchema(activities).omit({ id: true, updatedAt: true }).extend({
  publishedAt: z.coerce.date(),
});
export const updateActivitySchema = insertActivitySchema.partial().superRefine((data, ctx) => {
  if (Object.keys(data).length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least one field must be provided for update",
    });
  }
});
export const insertStoryGallerySchema = createInsertSchema(storyGalleries).omit({ id: true, updatedAt: true });
export const updateStoryGallerySchema = insertStoryGallerySchema.partial().superRefine((data, ctx) => {
  if (Object.keys(data).length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least one field must be provided for update",
    });
  }
});
export const insertInstitutionSchema = createInsertSchema(institutions).omit({ id: true, updatedAt: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true, updatedAt: true }).extend({
  date: z.coerce.date(),
});
export const updateEventSchema = insertEventSchema.partial().superRefine((data, ctx) => {
  if (Object.keys(data).length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least one field must be provided for update",
    });
  }
});
export const insertActionPlanSchema = createInsertSchema(actionPlans).omit({ id: true, updatedAt: true });
export const updateActionPlanSchema = insertActionPlanSchema.partial().superRefine((data, ctx) => {
  if (Object.keys(data).length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least one field must be provided for update",
    });
  }
});
export const insertInfographicSchema = createInsertSchema(infographics).omit({ id: true, updatedAt: true });
export const insertCommunityPlanSchema = createInsertSchema(communityPlans).omit({ id: true, updatedAt: true });
export const insertPartnerSchema = createInsertSchema(partners).omit({ id: true });
export const updatePartnerSchema = insertPartnerSchema.partial().superRefine((data, ctx) => {
  if (Object.keys(data).length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least one field must be provided for update",
    });
  }
});
export const insertNewsSchema = createInsertSchema(news).omit({ id: true, updatedAt: true }).extend({
  publishedAt: z.coerce.date(),
});
export const updateNewsSchema = insertNewsSchema.partial().superRefine((data, ctx) => {
  if (Object.keys(data).length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least one field must be provided for update"
    });
  }
});
export const insertTenderSchema = createInsertSchema(tenders).omit({ id: true, updatedAt: true }).extend({
  publishedAt: z.coerce.date(),
});
export const updateTenderSchema = insertTenderSchema.partial().superRefine((data, ctx) => {
  if (Object.keys(data).length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "At least one field must be provided for update"
    });
  }
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;
export type InsertHeroSection = z.infer<typeof insertHeroSectionSchema>;
export type HeroSection = typeof heroSections.$inferSelect;
export type InsertHomeActivityCard = z.infer<typeof insertHomeActivityCardSchema>;
export type HomeActivityCard = typeof homeActivityCards.$inferSelect;
export type InsertPassportSection = z.infer<typeof insertPassportSectionSchema>;
export type PassportSection = typeof passportSections.$inferSelect;
export type InsertPassportStory = z.infer<typeof insertPassportStorySchema>;
export type PassportStory = typeof passportStories.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;
export type InsertStoryGallery = z.infer<typeof insertStoryGallerySchema>;
export type StoryGallery = typeof storyGalleries.$inferSelect;
export type InsertInstitution = z.infer<typeof insertInstitutionSchema>;
export type Institution = typeof institutions.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;
export type InsertActionPlan = z.infer<typeof insertActionPlanSchema>;
export type ActionPlan = typeof actionPlans.$inferSelect;
export type InsertInfographic = z.infer<typeof insertInfographicSchema>;
export type Infographic = typeof infographics.$inferSelect;
export type InsertCommunityPlan = z.infer<typeof insertCommunityPlanSchema>;
export type CommunityPlan = typeof communityPlans.$inferSelect;
export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type Partner = typeof partners.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;
export type InsertTender = z.infer<typeof insertTenderSchema>;
export type Tender = typeof tenders.$inferSelect;

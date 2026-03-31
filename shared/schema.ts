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
  publishedAt: integer("published_at", { mode: 'timestamp' }).notNull(),
  order: integer("order").notNull().default(0),
  updatedAt: integer("updated_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertPageSchema = createInsertSchema(pages).omit({ id: true, updatedAt: true });
export const insertHeroSectionSchema = createInsertSchema(heroSections).omit({ id: true, updatedAt: true });
export const insertInstitutionSchema = createInsertSchema(institutions).omit({ id: true, updatedAt: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true, updatedAt: true });
export const insertActionPlanSchema = createInsertSchema(actionPlans).omit({ id: true, updatedAt: true });
export const insertInfographicSchema = createInsertSchema(infographics).omit({ id: true, updatedAt: true });
export const insertCommunityPlanSchema = createInsertSchema(communityPlans).omit({ id: true, updatedAt: true });
export const insertPartnerSchema = createInsertSchema(partners).omit({ id: true });
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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;
export type InsertHeroSection = z.infer<typeof insertHeroSectionSchema>;
export type HeroSection = typeof heroSections.$inferSelect;
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

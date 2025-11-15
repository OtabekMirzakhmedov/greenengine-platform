import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pages = pgTable("pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  content: text("content"),
  published: integer("published").notNull().default(1),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const institutions = pgTable("institutions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  country: text("country").notNull(),
  description: text("description"),
  story: text("story"),
  achievements: text("achievements"),
  logoUrl: text("logo_url"),
  heroImageUrl: text("hero_image_url"),
  gallery: jsonb("gallery").$type<string[]>().default([]),
  videoUrl: text("video_url"),
  attachments: jsonb("attachments").$type<Array<{ name: string; url: string; size: string }>>().default([]),
  order: integer("order").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  date: timestamp("date").notNull(),
  location: text("location"),
  venue: text("venue"),
  overview: text("overview"),
  agenda: text("agenda"),
  agendaPdfUrl: text("agenda_pdf_url"),
  photoCount: integer("photo_count").default(0),
  gallery: jsonb("gallery").$type<string[]>().default([]),
  documents: jsonb("documents").$type<Array<{ name: string; url: string; size: string }>>().default([]),
  attendeeCount: integer("attendee_count"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const actionPlans = pgTable("action_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  fileUrl: text("file_url"),
  fileSize: text("file_size"),
  order: integer("order").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const infographics = pgTable("infographics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  pdfUrl: text("pdf_url"),
  pdfSize: text("pdf_size"),
  order: integer("order").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const communityPlans = pgTable("community_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  fileUrl: text("file_url"),
  fileSize: text("file_size"),
  order: integer("order").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const partners = pgTable("partners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  logoUrl: text("logo_url"),
  websiteUrl: text("website_url"),
  contactEmail: text("contact_email"),
  order: integer("order").notNull().default(0),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertPageSchema = createInsertSchema(pages).omit({ id: true, updatedAt: true });
export const insertInstitutionSchema = createInsertSchema(institutions).omit({ id: true, updatedAt: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true, updatedAt: true });
export const insertActionPlanSchema = createInsertSchema(actionPlans).omit({ id: true, updatedAt: true });
export const insertInfographicSchema = createInsertSchema(infographics).omit({ id: true, updatedAt: true });
export const insertCommunityPlanSchema = createInsertSchema(communityPlans).omit({ id: true, updatedAt: true });
export const insertPartnerSchema = createInsertSchema(partners).omit({ id: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;
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

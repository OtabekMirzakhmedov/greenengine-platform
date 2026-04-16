import { 
  users, institutions, events, actionPlans, infographics, communityPlans, partners, pages, news, tenders, heroSections, homeActivityCards, passportSections, passportStories, activities, storyGalleries,
  type User, type InsertUser,
  type Institution, type InsertInstitution,
  type Event, type InsertEvent,
  type ActionPlan, type InsertActionPlan,
  type Infographic, type InsertInfographic,
  type CommunityPlan, type InsertCommunityPlan,
  type Partner, type InsertPartner,
  type Page, type InsertPage,
  type News, type InsertNews,
  type Tender, type InsertTender,
  type HeroSection, type InsertHeroSection,
  type HomeActivityCard, type InsertHomeActivityCard,
  type PassportSection, type InsertPassportSection,
  type PassportStory, type InsertPassportStory,
  type Activity, type InsertActivity,
  type StoryGallery, type InsertStoryGallery,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, and, or } from "drizzle-orm";

type InstitutionRow = typeof institutions.$inferInsert;
type EventRow = typeof events.$inferInsert;
type ActivityRow = typeof activities.$inferInsert;
type StoryGalleryRow = typeof storyGalleries.$inferInsert;
type NewsRow = typeof news.$inferInsert;
type TenderRow = typeof tenders.$inferInsert;
type PassportSectionRow = typeof passportSections.$inferInsert;
type PassportStoryRow = typeof passportStories.$inferInsert;
type UploadedAttachment = { name: string; url: string; size: string };

const normalizeAttachmentUrl = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }

  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/")) {
    return value;
  }

  return value.startsWith("uploads/") ? `/${value}` : `/uploads/${value}`;
};

const normalizeAttachments = (value: unknown): UploadedAttachment[] => {
  const parsedValue =
    typeof value === "string"
      ? (() => {
          try {
            return JSON.parse(value);
          } catch {
            return [];
          }
        })()
      : value;

  if (!Array.isArray(parsedValue)) {
    return [];
  }

  return parsedValue
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const record = item as Record<string, unknown>;
      const url = normalizeAttachmentUrl(
        record.url ?? record.path ?? record.fileUrl ?? record.file_url ?? record.href
      );
      const nameSource =
        record.name ?? record.filename ?? record.fileName ?? record.originalname ?? record.title;
      const sizeSource = record.size ?? record.fileSize ?? record.file_size ?? "";

      if (!url) {
        return null;
      }

      return {
        name: typeof nameSource === "string" && nameSource.trim().length > 0 ? nameSource : "Tender file",
        url,
        size: typeof sizeSource === "string" ? sizeSource : String(sizeSource || ""),
      };
    })
    .filter((item): item is UploadedAttachment => Boolean(item));
};

const normalizeTenderStatus = (value: unknown): "published" | "draft" => {
  if (typeof value !== "string") {
    return "draft";
  }

  return ["published", "active", "visible", "public"].includes(value.toLowerCase()) ? "published" : "draft";
};

const normalizeTender = (item: Tender): Tender => ({
  ...item,
  attachments: normalizeAttachments(item.attachments),
  status: normalizeTenderStatus(item.status),
});

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getPages(): Promise<Page[]>;
  getPageBySlug(slug: string): Promise<Page | undefined>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: string, page: Partial<InsertPage>): Promise<Page>;
  deletePage(id: string): Promise<void>;

  getHeroSections(): Promise<HeroSection[]>;
  createHeroSection(heroSection: InsertHeroSection): Promise<HeroSection>;
  updateHeroSection(id: string, heroSection: Partial<InsertHeroSection>): Promise<HeroSection>;
  deleteHeroSection(id: string): Promise<void>;

  getHomeActivityCards(): Promise<HomeActivityCard[]>;
  createHomeActivityCard(card: InsertHomeActivityCard): Promise<HomeActivityCard>;
  updateHomeActivityCard(id: string, card: Partial<InsertHomeActivityCard>): Promise<HomeActivityCard>;
  deleteHomeActivityCard(id: string): Promise<void>;

  getPassportSections(): Promise<PassportSection[]>;
  getVisiblePassportSections(): Promise<PassportSection[]>;
  getPassportMenuSections(): Promise<PassportSection[]>;
  getPassportLandingSection(): Promise<PassportSection | undefined>;
  getPassportSectionBySlug(slug: string): Promise<PassportSection | undefined>;
  createPassportSection(section: InsertPassportSection): Promise<PassportSection>;
  updatePassportSection(id: string, section: Partial<InsertPassportSection>): Promise<PassportSection>;
  deletePassportSection(id: string): Promise<void>;
  getPassportStories(): Promise<PassportStory[]>;
  getPublishedPassportStoriesBySection(sectionId: string): Promise<PassportStory[]>;
  getPassportStoryBySlug(slug: string): Promise<PassportStory | undefined>;
  getPublishedPassportStoryBySectionAndSlug(sectionId: string, slug: string): Promise<PassportStory | undefined>;
  createPassportStory(story: InsertPassportStory): Promise<PassportStory>;
  updatePassportStory(id: string, story: Partial<InsertPassportStory>): Promise<PassportStory>;
  deletePassportStory(id: string): Promise<void>;

  getActivities(): Promise<Activity[]>;
  getActivityBySlug(slug: string): Promise<Activity | undefined>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  updateActivity(id: string, activity: Partial<InsertActivity>): Promise<Activity>;
  deleteActivity(id: string): Promise<void>;

  getStoryGalleries(): Promise<StoryGallery[]>;
  getStoryGalleryBySlug(slug: string): Promise<StoryGallery | undefined>;
  createStoryGallery(gallery: InsertStoryGallery): Promise<StoryGallery>;
  updateStoryGallery(id: string, gallery: Partial<InsertStoryGallery>): Promise<StoryGallery>;
  deleteStoryGallery(id: string): Promise<void>;

  getInstitutions(): Promise<Institution[]>;
  getInstitutionBySlug(slug: string): Promise<Institution | undefined>;
  createInstitution(institution: InsertInstitution): Promise<Institution>;
  updateInstitution(id: string, institution: Partial<InsertInstitution>): Promise<Institution>;
  deleteInstitution(id: string): Promise<void>;

  getEvents(): Promise<Event[]>;
  getEventBySlug(slug: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event>;
  deleteEvent(id: string): Promise<void>;

  getActionPlans(): Promise<ActionPlan[]>;
  createActionPlan(plan: InsertActionPlan): Promise<ActionPlan>;
  updateActionPlan(id: string, plan: Partial<InsertActionPlan>): Promise<ActionPlan>;
  deleteActionPlan(id: string): Promise<void>;

  getInfographics(): Promise<Infographic[]>;
  createInfographic(infographic: InsertInfographic): Promise<Infographic>;
  updateInfographic(id: string, infographic: Partial<InsertInfographic>): Promise<Infographic>;
  deleteInfographic(id: string): Promise<void>;

  getCommunityPlans(): Promise<CommunityPlan[]>;
  createCommunityPlan(plan: InsertCommunityPlan): Promise<CommunityPlan>;
  updateCommunityPlan(id: string, plan: Partial<InsertCommunityPlan>): Promise<CommunityPlan>;
  deleteCommunityPlan(id: string): Promise<void>;

  getPartners(): Promise<Partner[]>;
  createPartner(partner: InsertPartner): Promise<Partner>;
  updatePartner(id: string, partner: Partial<InsertPartner>): Promise<Partner>;
  deletePartner(id: string): Promise<void>;

  getNews(): Promise<News[]>;
  getPublishedNews(): Promise<News[]>;
  getPublishedNewsBySlug(slug: string): Promise<News | undefined>;
  createNews(newsItem: InsertNews): Promise<News>;
  updateNews(id: string, newsItem: Partial<InsertNews>): Promise<News>;
  deleteNews(id: string): Promise<void>;

  getTenders(): Promise<Tender[]>;
  getPublishedTenders(): Promise<Tender[]>;
  getPublishedTenderBySlug(slug: string): Promise<Tender | undefined>;
  createTender(tender: InsertTender): Promise<Tender>;
  updateTender(id: string, tender: Partial<InsertTender>): Promise<Tender>;
  deleteTender(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getPages(): Promise<Page[]> {
    return await db.select().from(pages);
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.slug, slug));
    return page || undefined;
  }

  async createPage(page: InsertPage): Promise<Page> {
    const [created] = await db.insert(pages).values(page).returning();
    return created;
  }

  async updatePage(id: string, page: Partial<InsertPage>): Promise<Page> {
    const [updated] = await db.update(pages).set(page).where(eq(pages.id, id)).returning();
    return updated;
  }

  async deletePage(id: string): Promise<void> {
    await db.delete(pages).where(eq(pages.id, id));
  }

  async getHeroSections(): Promise<HeroSection[]> {
    return await db.select().from(heroSections).orderBy(heroSections.order, heroSections.updatedAt);
  }

  async createHeroSection(heroSection: InsertHeroSection): Promise<HeroSection> {
    const [created] = await db.insert(heroSections).values(heroSection).returning();
    return created;
  }

  async updateHeroSection(id: string, heroSection: Partial<InsertHeroSection>): Promise<HeroSection> {
    const [updated] = await db
      .update(heroSections)
      .set(heroSection)
      .where(eq(heroSections.id, id))
      .returning();
    return updated;
  }

  async deleteHeroSection(id: string): Promise<void> {
    await db.delete(heroSections).where(eq(heroSections.id, id));
  }

  async getHomeActivityCards(): Promise<HomeActivityCard[]> {
    return await db.select().from(homeActivityCards).orderBy(homeActivityCards.order, homeActivityCards.updatedAt);
  }

  async createHomeActivityCard(card: InsertHomeActivityCard): Promise<HomeActivityCard> {
    const [created] = await db.insert(homeActivityCards).values(card).returning();
    return created;
  }

  async updateHomeActivityCard(id: string, card: Partial<InsertHomeActivityCard>): Promise<HomeActivityCard> {
    const [updated] = await db
      .update(homeActivityCards)
      .set(card)
      .where(eq(homeActivityCards.id, id))
      .returning();
    return updated;
  }

  async deleteHomeActivityCard(id: string): Promise<void> {
    await db.delete(homeActivityCards).where(eq(homeActivityCards.id, id));
  }

  async getPassportSections(): Promise<PassportSection[]> {
    return await db
      .select()
      .from(passportSections)
      .orderBy(desc(passportSections.isLanding), asc(passportSections.order), desc(passportSections.updatedAt));
  }

  async getVisiblePassportSections(): Promise<PassportSection[]> {
    return await db
      .select()
      .from(passportSections)
      .where(eq(passportSections.isVisible, true))
      .orderBy(desc(passportSections.isLanding), asc(passportSections.order), desc(passportSections.updatedAt));
  }

  async getPassportMenuSections(): Promise<PassportSection[]> {
    return await db
      .select()
      .from(passportSections)
      .where(and(eq(passportSections.isVisible, true), eq(passportSections.showInMenu, true)))
      .orderBy(desc(passportSections.isLanding), asc(passportSections.order), desc(passportSections.updatedAt));
  }

  async getPassportLandingSection(): Promise<PassportSection | undefined> {
    const [landing] = await db
      .select()
      .from(passportSections)
      .where(and(eq(passportSections.isVisible, true), eq(passportSections.isLanding, true)))
      .orderBy(asc(passportSections.order), desc(passportSections.updatedAt));

    if (landing) {
      return landing;
    }

    const [fallback] = await db
      .select()
      .from(passportSections)
      .where(eq(passportSections.isVisible, true))
      .orderBy(desc(passportSections.isLanding), asc(passportSections.order), desc(passportSections.updatedAt));

    return fallback || undefined;
  }

  async getPassportSectionBySlug(slug: string): Promise<PassportSection | undefined> {
    const [section] = await db
      .select()
      .from(passportSections)
      .where(and(eq(passportSections.slug, slug), eq(passportSections.isVisible, true)));
    return section || undefined;
  }

  async createPassportSection(section: InsertPassportSection): Promise<PassportSection> {
    const [created] = await db.insert(passportSections).values(section as PassportSectionRow).returning();
    return created;
  }

  async updatePassportSection(id: string, section: Partial<InsertPassportSection>): Promise<PassportSection> {
    const [updated] = await db
      .update(passportSections)
      .set(section as Partial<PassportSectionRow>)
      .where(eq(passportSections.id, id))
      .returning();
    return updated;
  }

  async deletePassportSection(id: string): Promise<void> {
    await db.delete(passportSections).where(eq(passportSections.id, id));
  }

  async getPassportStories(): Promise<PassportStory[]> {
    return await db
      .select()
      .from(passportStories)
      .orderBy(desc(passportStories.isPublished), asc(passportStories.order), desc(passportStories.publishedAt), desc(passportStories.updatedAt));
  }

  async getPublishedPassportStoriesBySection(sectionId: string): Promise<PassportStory[]> {
    return await db
      .select()
      .from(passportStories)
      .where(and(eq(passportStories.sectionId, sectionId), eq(passportStories.isPublished, true)))
      .orderBy(asc(passportStories.order), desc(passportStories.publishedAt), desc(passportStories.updatedAt));
  }

  async getPassportStoryBySlug(slug: string): Promise<PassportStory | undefined> {
    const [story] = await db.select().from(passportStories).where(eq(passportStories.slug, slug));
    return story || undefined;
  }

  async getPublishedPassportStoryBySectionAndSlug(sectionId: string, slug: string): Promise<PassportStory | undefined> {
    const [story] = await db
      .select()
      .from(passportStories)
      .where(and(eq(passportStories.sectionId, sectionId), eq(passportStories.slug, slug), eq(passportStories.isPublished, true)));
    return story || undefined;
  }

  async createPassportStory(story: InsertPassportStory): Promise<PassportStory> {
    const [created] = await db.insert(passportStories).values(story as PassportStoryRow).returning();
    return created;
  }

  async updatePassportStory(id: string, story: Partial<InsertPassportStory>): Promise<PassportStory> {
    const [updated] = await db
      .update(passportStories)
      .set(story as Partial<PassportStoryRow>)
      .where(eq(passportStories.id, id))
      .returning();
    return updated;
  }

  async deletePassportStory(id: string): Promise<void> {
    await db.delete(passportStories).where(eq(passportStories.id, id));
  }

  async getActivities(): Promise<Activity[]> {
    return await db.select().from(activities).orderBy(activities.order, activities.publishedAt, activities.updatedAt);
  }

  async getActivityBySlug(slug: string): Promise<Activity | undefined> {
    const [activity] = await db.select().from(activities).where(eq(activities.slug, slug));
    return activity || undefined;
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const [created] = await db
      .insert(activities)
      .values(activity as ActivityRow)
      .returning();
    return created;
  }

  async updateActivity(id: string, activity: Partial<InsertActivity>): Promise<Activity> {
    const [updated] = await db
      .update(activities)
      .set(activity as Partial<ActivityRow>)
      .where(eq(activities.id, id))
      .returning();
    return updated;
  }

  async deleteActivity(id: string): Promise<void> {
    await db.delete(activities).where(eq(activities.id, id));
  }

  async getStoryGalleries(): Promise<StoryGallery[]> {
    return await db.select().from(storyGalleries).orderBy(storyGalleries.order, storyGalleries.updatedAt);
  }

  async getStoryGalleryBySlug(slug: string): Promise<StoryGallery | undefined> {
    const [gallery] = await db.select().from(storyGalleries).where(eq(storyGalleries.slug, slug));
    return gallery || undefined;
  }

  async createStoryGallery(gallery: InsertStoryGallery): Promise<StoryGallery> {
    const [created] = await db
      .insert(storyGalleries)
      .values(gallery as StoryGalleryRow)
      .returning();
    return created;
  }

  async updateStoryGallery(id: string, gallery: Partial<InsertStoryGallery>): Promise<StoryGallery> {
    const [updated] = await db
      .update(storyGalleries)
      .set(gallery as Partial<StoryGalleryRow>)
      .where(eq(storyGalleries.id, id))
      .returning();
    return updated;
  }

  async deleteStoryGallery(id: string): Promise<void> {
    await db.delete(storyGalleries).where(eq(storyGalleries.id, id));
  }

  async getInstitutions(): Promise<Institution[]> {
    return await db.select().from(institutions).orderBy(institutions.order);
  }

  async getInstitutionBySlug(slug: string): Promise<Institution | undefined> {
    const [institution] = await db.select().from(institutions).where(eq(institutions.slug, slug));
    return institution || undefined;
  }

  async createInstitution(institution: InsertInstitution): Promise<Institution> {
    const [created] = await db
      .insert(institutions)
      .values(institution as InstitutionRow)
      .returning();
    return created;
  }

  async updateInstitution(id: string, institution: Partial<InsertInstitution>): Promise<Institution> {
    const [updated] = await db
      .update(institutions)
      .set(institution as Partial<InstitutionRow>)
      .where(eq(institutions.id, id))
      .returning();
    return updated;
  }

  async deleteInstitution(id: string): Promise<void> {
    await db.delete(institutions).where(eq(institutions.id, id));
  }

  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  async getEventBySlug(slug: string): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.slug, slug));
    return event || undefined;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [created] = await db.insert(events).values(event as EventRow).returning();
    return created;
  }

  async updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event> {
    const [updated] = await db
      .update(events)
      .set(event as Partial<EventRow>)
      .where(eq(events.id, id))
      .returning();
    return updated;
  }

  async deleteEvent(id: string): Promise<void> {
    await db.delete(events).where(eq(events.id, id));
  }

  async getActionPlans(): Promise<ActionPlan[]> {
    return await db.select().from(actionPlans).orderBy(actionPlans.order);
  }

  async createActionPlan(plan: InsertActionPlan): Promise<ActionPlan> {
    const [created] = await db.insert(actionPlans).values(plan).returning();
    return created;
  }

  async updateActionPlan(id: string, plan: Partial<InsertActionPlan>): Promise<ActionPlan> {
    const [updated] = await db.update(actionPlans).set(plan).where(eq(actionPlans.id, id)).returning();
    return updated;
  }

  async deleteActionPlan(id: string): Promise<void> {
    await db.delete(actionPlans).where(eq(actionPlans.id, id));
  }

  async getInfographics(): Promise<Infographic[]> {
    return await db.select().from(infographics).orderBy(infographics.order);
  }

  async createInfographic(infographic: InsertInfographic): Promise<Infographic> {
    const [created] = await db.insert(infographics).values(infographic).returning();
    return created;
  }

  async updateInfographic(id: string, infographic: Partial<InsertInfographic>): Promise<Infographic> {
    const [updated] = await db.update(infographics).set(infographic).where(eq(infographics.id, id)).returning();
    return updated;
  }

  async deleteInfographic(id: string): Promise<void> {
    await db.delete(infographics).where(eq(infographics.id, id));
  }

  async getCommunityPlans(): Promise<CommunityPlan[]> {
    return await db.select().from(communityPlans).orderBy(communityPlans.order);
  }

  async createCommunityPlan(plan: InsertCommunityPlan): Promise<CommunityPlan> {
    const [created] = await db.insert(communityPlans).values(plan).returning();
    return created;
  }

  async updateCommunityPlan(id: string, plan: Partial<InsertCommunityPlan>): Promise<CommunityPlan> {
    const [updated] = await db.update(communityPlans).set(plan).where(eq(communityPlans.id, id)).returning();
    return updated;
  }

  async deleteCommunityPlan(id: string): Promise<void> {
    await db.delete(communityPlans).where(eq(communityPlans.id, id));
  }

  async getPartners(): Promise<Partner[]> {
    return await db.select().from(partners).orderBy(partners.order);
  }

  async createPartner(partner: InsertPartner): Promise<Partner> {
    const [created] = await db.insert(partners).values(partner).returning();
    return created;
  }

  async updatePartner(id: string, partner: Partial<InsertPartner>): Promise<Partner> {
    const [updated] = await db.update(partners).set(partner).where(eq(partners.id, id)).returning();
    return updated;
  }

  async deletePartner(id: string): Promise<void> {
    await db.delete(partners).where(eq(partners.id, id));
  }

  async getNews(): Promise<News[]> {
    return await db.select().from(news).orderBy(asc(news.order), desc(news.publishedAt), desc(news.updatedAt));
  }

  async getPublishedNews(): Promise<News[]> {
    return await db
      .select()
      .from(news)
      .where(eq(news.status, "published"))
      .orderBy(asc(news.order), desc(news.publishedAt), desc(news.updatedAt));
  }

  async getPublishedNewsBySlug(slug: string): Promise<News | undefined> {
    const [item] = await db
      .select()
      .from(news)
      .where(and(eq(news.slug, slug), eq(news.status, "published")));
    return item || undefined;
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const [created] = await db.insert(news).values(newsItem as NewsRow).returning();
    return created;
  }

  async updateNews(id: string, newsItem: Partial<InsertNews>): Promise<News> {
    const [updated] = await db.update(news).set(newsItem as Partial<NewsRow>).where(eq(news.id, id)).returning();
    return updated;
  }

  async deleteNews(id: string): Promise<void> {
    await db.delete(news).where(eq(news.id, id));
  }

  async getTenders(): Promise<Tender[]> {
    const rows = await db
      .select()
      .from(tenders)
      .orderBy(desc(tenders.publishedAt), desc(tenders.updatedAt), asc(tenders.order));

    return rows.map(normalizeTender);
  }

  async getPublishedTenders(): Promise<Tender[]> {
    const rows = await db
      .select()
      .from(tenders)
      .where(or(eq(tenders.status, "published"), eq(tenders.status, "active")))
      .orderBy(desc(tenders.publishedAt), desc(tenders.updatedAt), asc(tenders.order));

    return rows.map(normalizeTender);
  }

  async getPublishedTenderBySlug(slug: string): Promise<Tender | undefined> {
    const [item] = await db
      .select()
      .from(tenders)
      .where(and(eq(tenders.slug, slug), or(eq(tenders.status, "published"), eq(tenders.status, "active"))));
    return item ? normalizeTender(item) : undefined;
  }

  async createTender(tender: InsertTender): Promise<Tender> {
    const [created] = await db.insert(tenders).values(tender as TenderRow).returning();
    return normalizeTender(created);
  }

  async updateTender(id: string, tender: Partial<InsertTender>): Promise<Tender> {
    const [updated] = await db.update(tenders).set(tender as Partial<TenderRow>).where(eq(tenders.id, id)).returning();
    return normalizeTender(updated);
  }

  async deleteTender(id: string): Promise<void> {
    await db.delete(tenders).where(eq(tenders.id, id));
  }
}

export const storage = new DatabaseStorage();

import { 
  users, institutions, events, actionPlans, infographics, communityPlans, partners, pages, news,
  type User, type InsertUser,
  type Institution, type InsertInstitution,
  type Event, type InsertEvent,
  type ActionPlan, type InsertActionPlan,
  type Infographic, type InsertInfographic,
  type CommunityPlan, type InsertCommunityPlan,
  type Partner, type InsertPartner,
  type Page, type InsertPage,
  type News, type InsertNews,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getPages(): Promise<Page[]>;
  getPageBySlug(slug: string): Promise<Page | undefined>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: string, page: Partial<InsertPage>): Promise<Page>;
  deletePage(id: string): Promise<void>;

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
  createNews(newsItem: InsertNews): Promise<News>;
  updateNews(id: string, newsItem: Partial<InsertNews>): Promise<News>;
  deleteNews(id: string): Promise<void>;
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

  async getInstitutions(): Promise<Institution[]> {
    return await db.select().from(institutions).orderBy(institutions.order);
  }

  async getInstitutionBySlug(slug: string): Promise<Institution | undefined> {
    const [institution] = await db.select().from(institutions).where(eq(institutions.slug, slug));
    return institution || undefined;
  }

  async createInstitution(institution: InsertInstitution): Promise<Institution> {
    const [created] = await db.insert(institutions).values(institution).returning();
    return created;
  }

  async updateInstitution(id: string, institution: Partial<InsertInstitution>): Promise<Institution> {
    const [updated] = await db.update(institutions).set(institution).where(eq(institutions.id, id)).returning();
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
    const [created] = await db.insert(events).values(event).returning();
    return created;
  }

  async updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event> {
    const [updated] = await db.update(events).set(event).where(eq(events.id, id)).returning();
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
    return await db.select().from(news).orderBy(desc(news.publishedAt));
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const [created] = await db.insert(news).values(newsItem).returning();
    return created;
  }

  async updateNews(id: string, newsItem: Partial<InsertNews>): Promise<News> {
    const [updated] = await db.update(news).set(newsItem).where(eq(news.id, id)).returning();
    return updated;
  }

  async deleteNews(id: string): Promise<void> {
    await db.delete(news).where(eq(news.id, id));
  }
}

export const storage = new DatabaseStorage();

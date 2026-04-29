import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@shared/schema";

const databaseUrl = process.env.DATABASE_URL || "./local.db";

export const sqlite = new Database(databaseUrl);
sqlite.pragma("journal_mode = TRUNCATE");
sqlite.pragma("busy_timeout = 5000");

export const db = drizzle(sqlite, { schema });

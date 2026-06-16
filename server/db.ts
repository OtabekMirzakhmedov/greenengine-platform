import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { randomUUID } from "crypto";
import * as schema from "@shared/schema";

const databaseUrl = process.env.DATABASE_URL || "./local.db";

export const sqlite = new Database(databaseUrl);
sqlite.pragma("journal_mode = TRUNCATE");
sqlite.pragma("busy_timeout = 5000");

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS goal_objectives (
    id TEXT PRIMARY KEY,
    item_type TEXT NOT NULL DEFAULT 'objective',
    title TEXT NOT NULL,
    description TEXT,
    metric TEXT,
    kpis TEXT DEFAULT '[]',
    icon TEXT NOT NULL DEFAULT 'target',
    "order" INTEGER NOT NULL DEFAULT 0,
    is_published INTEGER NOT NULL DEFAULT 1,
    updated_at INTEGER
  );
`);

const goalObjectiveCount = sqlite
  .prepare("SELECT COUNT(*) AS count FROM goal_objectives")
  .get() as { count: number };

if (goalObjectiveCount.count === 0) {
  const now = Math.floor(Date.now() / 1000);
  const insertGoalObjective = sqlite.prepare(`
    INSERT INTO goal_objectives (
      id,
      item_type,
      title,
      description,
      metric,
      kpis,
      icon,
      "order",
      is_published,
      updated_at
    )
    VALUES (@id, @itemType, @title, @description, @metric, @kpis, @icon, @order, @isPublished, @updatedAt)
  `);

  const defaultGoalObjectives = [
    {
      itemType: "vision",
      title: "Project Vision",
      description:
        "The main goal of the GREENENGINE project is to modernize engineering education in partner countries by integrating sustainability, green technologies, and innovative teaching approaches into academic programs. Our objectives are designed to prepare future engineers who can address global environmental challenges and contribute to sustainable technological development.",
      metric: null,
      kpis: [],
      icon: "target",
      order: 0,
      isPublished: 1,
    },
    {
      itemType: "objective",
      title: "Modernization of Engineering Curricula",
      description:
        "Develop and introduce new courses and modules related to green technologies, sustainable engineering, renewable energy, and environmental management in partner universities.",
      metric: null,
      kpis: [
        "New sustainability-focused modules in engineering programs",
        "Integration of green technologies into existing courses",
        "Updated curricula aligned with European best practices",
      ],
      icon: "target",
      order: 10,
      isPublished: 1,
    },
    {
      itemType: "objective",
      title: "Capacity Building for Academic Staff",
      description:
        "Strengthen the professional competencies of academic staff through international training, workshops, and knowledge exchange with European partner universities.",
      metric: null,
      kpis: [
        "Faculty training programs on sustainable engineering",
        "International workshops and knowledge exchange sessions",
        "Enhanced teaching methodologies across partner institutions",
      ],
      icon: "trending-up",
      order: 20,
      isPublished: 1,
    },
    {
      itemType: "objective",
      title: "Strengthening University-Industry Cooperation",
      description:
        "Develop stronger partnerships between universities and industry stakeholders to ensure that engineering education meets the needs of the modern labor market.",
      metric: null,
      kpis: [
        "Industry partnerships established at each partner institution",
        "Joint projects between academia and industry",
        "Graduate employment alignment with market needs",
      ],
      icon: "users",
      order: 30,
      isPublished: 1,
    },
    {
      itemType: "objective",
      title: "Promotion of Sustainable Innovation",
      description:
        "Encourage research and innovation activities focused on sustainable technological development and environmentally friendly engineering solutions.",
      metric: null,
      kpis: [
        "Research projects on renewable energy and green tech",
        "Student innovation competitions and initiatives",
        "Collaborative research publications across partners",
      ],
      icon: "award",
      order: 40,
      isPublished: 1,
    },
    {
      itemType: "stat",
      title: "Partner Organizations",
      description: null,
      metric: "11",
      kpis: [],
      icon: "building",
      order: 100,
      isPublished: 1,
    },
    {
      itemType: "stat",
      title: "Countries",
      description: null,
      metric: "4",
      kpis: [],
      icon: "globe",
      order: 110,
      isPublished: 1,
    },
    {
      itemType: "stat",
      title: "Regions",
      description: null,
      metric: "2",
      kpis: [],
      icon: "map",
      order: 120,
      isPublished: 1,
    },
    {
      itemType: "stat",
      title: "Erasmus+ Funded",
      description: null,
      metric: "EU",
      kpis: [],
      icon: "award",
      order: 130,
      isPublished: 1,
    },
  ];

  const insertDefaults = sqlite.transaction(() => {
    for (const item of defaultGoalObjectives) {
      insertGoalObjective.run({
        ...item,
        id: randomUUID(),
        kpis: JSON.stringify(item.kpis),
        updatedAt: now,
      });
    }
  });

  insertDefaults();
}

export const db = drizzle(sqlite, { schema });

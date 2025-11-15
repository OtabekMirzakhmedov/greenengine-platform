import { db } from "./db";
import { users } from "@shared/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("Seeding database...");

  const adminEmail = "admin@greenengine.org";
  const adminPassword = "admin123";

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, adminEmail))
    .limit(1);

  if (existingUser.length > 0) {
    console.log("Admin user already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await db.insert(users).values({
    email: adminEmail,
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin user created successfully");
  console.log("Email:", adminEmail);
  console.log("Password:", adminPassword);
  console.log("\nPlease change the password after first login!");

  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});

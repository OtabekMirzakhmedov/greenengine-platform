import { db } from "./db";
import { users, partners } from "@shared/schema";
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
  } else {
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
  }

  // Seed partners
  console.log("\nSeeding partners...");
  
  const partnersData = [
    {
      name: "Tashkent Kimyo International University",
      country: "Uzbekistan",
      description: "KIUT is the first private chemical and technical university in Uzbekistan, offering programs in engineering, business, medicine, and humanities. It provides multi-language instruction (Uzbek, Russian, English) and emphasizes research, innovation, and international collaborations.",
      pic: "903791875",
      address: "Usmon Nosir (Shota Rustaveli) Street 156, Yakkasaray District, Tashkent 100121, Uzbekistan",
      phone: "+998 78 129-40-40",
      email: "info@ytit.uz",
      websiteUrl: "https://www.kiut.uz/en/",
      order: 1
    },
    {
      name: "Università degli Studi dell'Aquila",
      country: "Italy",
      description: "UNIVAQ is a public research university in L'Aquila, Italy, with strong programs in engineering, medicine, sciences, and humanities. The university focuses on internationalization, research, and student-centered learning.",
      pic: "999859511",
      address: "Piazza Santa Margherita 2, 67100 L'Aquila, Italy",
      phone: "+39 0862 432005",
      email: "uri@strutture.univaq.it",
      websiteUrl: "https://www.univaq.it/en/",
      order: 2
    },
    {
      name: "Mersin University",
      country: "Turkey",
      description: "MEU is a public university in Mersin, Turkey, offering a wide range of programs across engineering, medicine, arts, and social sciences. It supports R&D through a technology development zone and actively participates in international projects such as Erasmus.",
      pic: "948329522",
      address: "Çiftlikköy Kampusu, Rektorluk Binası, Mersin 33343, Turkey",
      phone: "+90 324 361 00 01",
      email: "yaziisleri@mersin.edu.tr",
      websiteUrl: "https://www.mersin.edu.tr/",
      order: 3
    },
    {
      name: "University of Ioannina",
      country: "Greece",
      description: "UOI, located in northwestern Greece, is recognized for its large campus and comprehensive academic offerings in sciences, arts, and social sciences. It has a strong focus on research and Erasmus-based international collaboration.",
      pic: "999852818",
      address: "Ioannina Campus, Ioannina 45110, Greece",
      phone: "+30 26510-07446",
      email: "vice-rector-int@uoi.gr",
      websiteUrl: "https://www.uoi.gr/",
      order: 4
    },
    {
      name: "Central Asian University",
      country: "Uzbekistan",
      description: "CAU is a private university in Tashkent offering interdisciplinary programs in business, engineering, medicine, and hospitality. It emphasizes practical education, entrepreneurship, and international partnerships.",
      pic: "885299116",
      address: "264 Milliy Bog Street, Barkamol MFY, Mirzo Ulugbek District, Tashkent 111221, Uzbekistan",
      phone: "+998 71 200-05-22",
      email: "info@centralasian.uz",
      websiteUrl: "https://centralasian.uz/",
      order: 5
    },
    {
      name: "Andijan State Technical Institute",
      country: "Uzbekistan",
      description: "ASTI provides higher technical education in engineering and applied sciences. The institute focuses on preparing professionals to meet industry needs and regional development goals.",
      pic: "923620033",
      address: "Bobur Shoh Street 56, Andijan, Uzbekistan, 170019",
      phone: "+998 74 223-43-67",
      email: "info@andmiedu.uz",
      websiteUrl: "https://web.andmiedu.uz/en",
      order: 6
    },
    {
      name: "Georgian Technical University",
      country: "Georgia",
      description: "GTU is a leading technical university in Tbilisi, Georgia, with strong faculties in engineering, architecture, computer science, and medicine. It emphasizes applied research, international collaborations, and hands-on training in advanced laboratories.",
      pic: "983636358",
      address: "77 Kostava Street, Tbilisi 0175, Georgia",
      phone: "+995 32 2 77 11 11",
      email: "info@gtu.ge",
      websiteUrl: "https://gtu.ge/en/",
      order: 7
    },
    {
      name: "Akaki Tsereteli State University",
      country: "Georgia",
      description: "ATSU is a public university in Kutaisi offering programs in medicine, engineering, social sciences, and humanities. It promotes research and international cooperation while providing diverse educational opportunities.",
      pic: "935085433",
      address: "59 Tamar Mepe Street, Kutaisi, 4600, Georgia",
      phone: "+995 431 24 57 84",
      email: "info@atsu.edu.ge",
      websiteUrl: "http://www.atsu.edu.ge/en/",
      order: 8
    },
    {
      name: "Shota Rustaveli State University",
      country: "Georgia",
      description: "BSU, located in Batumi, Georgia, offers a wide range of programs including medicine, business, and arts. It focuses on modern education, research, and community engagement.",
      pic: "966798419",
      address: "35 Ninoshvili / Rustaveli Street, Batumi 6010, Georgia",
      phone: "+995 422 27-17-80",
      email: "info@bsu.edu.ge",
      websiteUrl: "https://www.bsu.edu.ge/",
      order: 9
    },
    {
      name: "INNO Technopark",
      country: "Uzbekistan",
      description: "INNO Technopark in Tashkent is an innovation and R&D hub supporting students, researchers, and startups. It provides resources for technology development, robotics, and applied research.",
      pic: "874179909",
      address: "Universitet Ko'chasi 7, Tashkent 100174, Uzbekistan",
      phone: "+998 55 515-09-55",
      email: null,
      websiteUrl: "https://innotechnopark.com/en/about-us",
      order: 10
    },
    {
      name: "Georgian Institute for Research & Innovation",
      country: "Georgia",
      description: "GIRI is a multidisciplinary research institute in Tbilisi, Georgia, focusing on health sciences, aging, and dental research. It promotes innovation, applied research, and international collaborations.",
      pic: "873604408",
      address: "12 Mosashvili Street, Tbilisi 0179, Georgia",
      phone: null,
      email: null,
      websiteUrl: "https://giriresearch.com/",
      order: 11
    }
  ];

  for (const partner of partnersData) {
    const existing = await db
      .select()
      .from(partners)
      .where(eq(partners.name, partner.name))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(partners).values(partner);
      console.log(`✓ Added partner: ${partner.name}`);
    } else {
      console.log(`- Partner already exists: ${partner.name}`);
    }
  }

  console.log("\nSeeding completed!");

  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});

import { db } from "./db";
import { users, partners, news } from "@shared/schema";
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

  // Seed news
  console.log("\nSeeding news articles...");
  
  const newsData = [
    {
      title: "GREENENGINE Project Kickoff Conference in Tashkent",
      slug: "greenengine-kickoff-conference-tashkent",
      excerpt: "The GREENENGINE project officially launched with a successful kickoff conference bringing together all 11 partner institutions in Tashkent, Uzbekistan.",
      content: "The GREENENGINE project officially began with an inspiring kickoff conference held in Tashkent, Uzbekistan. Over 50 participants from 11 partner institutions across Central Asia, Georgia, and Europe gathered to establish the foundation for this transformative educational initiative. The three-day event featured collaborative workshops, strategic planning sessions, and networking opportunities. Partners discussed the project's goals of promoting intercultural competence and sustainable development in higher education, outlining a comprehensive roadmap for the next three years.",
      imageUrl: "/attached_assets/stock_images/educational_conferen_f6f10e1d.jpg",
      publishedAt: new Date("2025-09-15T09:00:00Z"),
      order: 1
    },
    {
      title: "First MOOC Module on Intercultural Communication Launches",
      slug: "first-mooc-module-intercultural-communication",
      excerpt: "GREENENGINE introduces its first Massive Open Online Course focusing on intercultural communication skills for students and educators.",
      content: "We are excited to announce the launch of our first MOOC module: 'Foundations of Intercultural Communication in Higher Education.' This comprehensive online course is designed for students, educators, and professionals seeking to enhance their intercultural competence. The module features video lectures from leading experts, interactive exercises, case studies from diverse cultural contexts, and peer-to-peer learning opportunities. Over 500 participants have already enrolled from across the partner institutions.",
      imageUrl: "/attached_assets/stock_images/educational_conferen_b0c0e7ee.jpg",
      publishedAt: new Date("2025-10-05T10:00:00Z"),
      order: 2
    },
    {
      title: "Digital Storytelling Workshop Empowers Student Voices",
      slug: "digital-storytelling-workshop-student-voices",
      excerpt: "Students from partner universities participated in an intensive digital storytelling workshop to share their intercultural experiences through multimedia narratives.",
      content: "The GREENENGINE Digital Storytelling Workshop brought together 30 students from across the partner network to develop powerful multimedia narratives about their intercultural experiences. Over five days, participants learned video editing, narrative structure, interviewing techniques, and ethical storytelling practices. The resulting digital stories will be featured in the Intercultural Passport platform and shared widely to inspire others. This hands-on workshop exemplified the project's commitment to student-centered learning and creative expression.",
      imageUrl: "/attached_assets/stock_images/educational_conferen_d0a55f3f.jpg",
      publishedAt: new Date("2025-10-20T14:00:00Z"),
      order: 3
    },
    {
      title: "Faculty Development Program on Inclusive Teaching",
      slug: "faculty-development-inclusive-teaching",
      excerpt: "Educators from all partner institutions completed a comprehensive training program on inclusive and culturally responsive teaching methodologies.",
      content: "GREENENGINE's Faculty Development Program concluded with remarkable success, training over 60 educators in inclusive and culturally responsive teaching practices. The two-week intensive program covered topics including unconscious bias, culturally sustaining pedagogy, universal design for learning, and assessment strategies for diverse classrooms. Participants engaged in reflective practice, collaborative lesson planning, and peer observation. The program has already begun influencing classroom practices across all partner institutions, creating more inclusive learning environments for all students.",
      imageUrl: "/attached_assets/stock_images/educational_conferen_6ef0e73a.jpg",
      publishedAt: new Date("2025-10-28T11:00:00Z"),
      order: 4
    },
    {
      title: "Sustainability and Green Education Forum 2025",
      slug: "sustainability-green-education-forum-2025",
      excerpt: "GREENENGINE partners convened for a forum on integrating sustainability principles and environmental education into university curricula.",
      content: "The Sustainability and Green Education Forum marked a pivotal moment in the GREENENGINE project's commitment to environmental stewardship. Academic leaders, researchers, and sustainability experts from all partner institutions gathered to explore innovative approaches to embedding climate action and sustainable development goals into higher education. The forum featured keynote presentations on renewable energy education, circular economy principles, and eco-campus initiatives. Participants developed collaborative action plans for greening curricula, reducing campus carbon footprints, and fostering environmental consciousness among students.",
      imageUrl: "/attached_assets/stock_images/educational_conferen_4986f3dd.jpg",
      publishedAt: new Date("2025-11-01T09:30:00Z"),
      order: 5
    },
    {
      title: "Collaborative Research Project on Cross-Cultural Learning",
      slug: "collaborative-research-cross-cultural-learning",
      excerpt: "A joint research initiative investigates the effectiveness of intercultural competence training across the GREENENGINE partner network.",
      content: "GREENENGINE has launched an ambitious collaborative research project examining the impact of intercultural competence training on student learning outcomes. Researchers from six partner universities are conducting a multi-site study tracking 300 students over two academic years. The research employs mixed methods including surveys, interviews, focus groups, and learning analytics to assess changes in intercultural sensitivity, communication skills, and global citizenship attitudes. Preliminary findings suggest significant positive effects, with full results expected in spring 2026. This evidence-based approach will inform future program development and contribute to the broader academic literature.",
      imageUrl: "/attached_assets/stock_images/university_workshop__f6d2f672.jpg",
      publishedAt: new Date("2025-11-08T13:00:00Z"),
      order: 6
    },
    {
      title: "Student Mobility Program Applications Now Open",
      slug: "student-mobility-program-applications-open",
      excerpt: "GREENENGINE announces the opening of applications for its student exchange program, offering semester-long study opportunities at partner universities.",
      content: "We are thrilled to announce that applications are now open for the GREENENGINE Student Mobility Program for the 2025-2026 academic year! This exciting initiative enables undergraduate and graduate students to spend one semester at a partner university in Central Asia, Georgia, or Europe. The program covers tuition, provides monthly stipends, and includes pre-departure intercultural training. Students will have the opportunity to immerse themselves in new cultural contexts, improve language skills, build international networks, and gain unique academic perspectives. The first cohort of 50 students will begin their exchanges in September 2026. Don't miss this life-changing opportunity!",
      imageUrl: "/attached_assets/stock_images/university_workshop__92f15da7.jpg",
      publishedAt: new Date("2025-11-12T10:00:00Z"),
      order: 7
    },
    {
      title: "Innovation in Assessment: New Digital Passport Platform",
      slug: "innovation-assessment-digital-passport-platform",
      excerpt: "GREENENGINE unveils its innovative Intercultural Passport digital platform for tracking and recognizing students' intercultural learning journeys.",
      content: "The GREENENGINE Intercultural Passport is now live! This groundbreaking digital platform allows students to document, reflect on, and showcase their intercultural learning experiences. Features include a digital portfolio for uploading stories and artifacts, competency self-assessment tools, peer feedback mechanisms, and digital badges recognizing achievement milestones. The platform integrates seamlessly with university learning management systems and provides educators with analytics dashboards to monitor student progress. Over 200 students have already created their passports and begun chronicling their intercultural journeys.",
      imageUrl: "/attached_assets/stock_images/university_workshop__5aa174a7.jpg",
      publishedAt: new Date("2025-11-15T15:30:00Z"),
      order: 8
    },
    {
      title: "Erasmus+ Co-Funding Milestone Reached",
      slug: "erasmus-cofunding-milestone-reached",
      excerpt: "The GREENENGINE project successfully achieves its first-year objectives and receives continued Erasmus+ support for years two and three.",
      content: "We are proud to announce that GREENENGINE has successfully met all first-year milestones and deliverables, securing continued Erasmus+ co-funding for the remainder of the project! The European Commission's positive evaluation highlighted the project's innovative approach to intercultural education, strong partnership collaboration, and measurable impact on students and faculty. This achievement reflects the dedication and hard work of all partners and participants. With this continued support, we can expand our activities, reach more students, and deepen our impact on higher education across Central Asia, Georgia, and Europe.",
      imageUrl: "/attached_assets/stock_images/university_workshop__212dc14f.jpg",
      publishedAt: new Date("2025-11-18T09:00:00Z"),
      order: 9
    },
    {
      title: "Upcoming International Conference: Save the Date!",
      slug: "upcoming-international-conference-save-date",
      excerpt: "Mark your calendars for the GREENENGINE International Conference on Intercultural Competence, scheduled for June 2026 in Tbilisi, Georgia.",
      content: "Save the date! The GREENENGINE International Conference on Intercultural Competence in Higher Education will take place June 15-17, 2026, in beautiful Tbilisi, Georgia. This landmark event will bring together researchers, educators, policymakers, and students from around the world to share insights, present research, and discuss the future of intercultural education. The conference will feature keynote addresses from internationally renowned scholars, parallel sessions on innovative practices, workshops on pedagogical approaches, poster presentations, and extensive networking opportunities. A call for proposals will be issued in January 2026. We look forward to welcoming you to Tbilisi!",
      imageUrl: "/attached_assets/stock_images/university_workshop__c6901365.jpg",
      publishedAt: new Date("2025-11-20T11:00:00Z"),
      order: 10
    }
  ];

  for (const newsItem of newsData) {
    const existing = await db
      .select()
      .from(news)
      .where(eq(news.slug, newsItem.slug))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(news).values(newsItem);
      console.log(`✓ Added news: ${newsItem.title}`);
    } else {
      console.log(`- News already exists: ${newsItem.title}`);
    }
  }

  console.log("\nSeeding completed!");

  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});

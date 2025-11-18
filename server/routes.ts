import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import { generateToken, requireAuth, type AuthRequest } from "./middleware/auth";
import multer from "multer";
import path from "path";
import fs from "fs";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(cookieParser());

  app.post(
    "/api/auth/login",
    body("email").isEmail(),
    body("password").isString().isLength({ min: 6 }),
    async (req: AuthRequest, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Invalid input", errors: errors.array() });
      }

      try {
        const { email, password } = req.body;
        const user = await storage.getUserByEmail(email);

        if (!user) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);
        res.cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const { password: _, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword });
      } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  );

  app.get("/api/auth/me", requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("auth_token");
    res.json({ message: "Logged out successfully" });
  });

  app.get("/api/pages", async (req, res) => {
    try {
      const pages = await storage.getPages();
      res.json(pages);
    } catch (error) {
      console.error("Get pages error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/pages/:slug", async (req, res) => {
    try {
      const page = await storage.getPageBySlug(req.params.slug);
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      res.json(page);
    } catch (error) {
      console.error("Get page error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/pages", requireAuth, async (req: AuthRequest, res) => {
    try {
      const page = await storage.createPage(req.body);
      res.status(201).json(page);
    } catch (error) {
      console.error("Create page error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/pages/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const page = await storage.updatePage(req.params.id, req.body);
      res.json(page);
    } catch (error) {
      console.error("Update page error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/pages/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      await storage.deletePage(req.params.id);
      res.json({ message: "Page deleted successfully" });
    } catch (error) {
      console.error("Delete page error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/institutions", async (req, res) => {
    try {
      const institutions = await storage.getInstitutions();
      res.json(institutions);
    } catch (error) {
      console.error("Get institutions error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/institutions", requireAuth, async (req: AuthRequest, res) => {
    try {
      const institution = await storage.createInstitution(req.body);
      res.status(201).json(institution);
    } catch (error) {
      console.error("Create institution error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/institutions/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const institution = await storage.updateInstitution(req.params.id, req.body);
      res.json(institution);
    } catch (error) {
      console.error("Update institution error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/institutions/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      await storage.deleteInstitution(req.params.id);
      res.json({ message: "Institution deleted successfully" });
    } catch (error) {
      console.error("Delete institution error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      console.error("Get events error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/events", requireAuth, async (req: AuthRequest, res) => {
    try {
      const event = await storage.createEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      console.error("Create event error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/events/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const event = await storage.updateEvent(req.params.id, req.body);
      res.json(event);
    } catch (error) {
      console.error("Update event error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/events/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      await storage.deleteEvent(req.params.id);
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      console.error("Delete event error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/action-plans", async (req, res) => {
    try {
      const plans = await storage.getActionPlans();
      res.json(plans);
    } catch (error) {
      console.error("Get action plans error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/action-plans", requireAuth, async (req: AuthRequest, res) => {
    try {
      const plan = await storage.createActionPlan(req.body);
      res.status(201).json(plan);
    } catch (error) {
      console.error("Create action plan error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/action-plans/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const plan = await storage.updateActionPlan(req.params.id, req.body);
      res.json(plan);
    } catch (error) {
      console.error("Update action plan error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/action-plans/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      await storage.deleteActionPlan(req.params.id);
      res.json({ message: "Action plan deleted successfully" });
    } catch (error) {
      console.error("Delete action plan error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/infographics", async (req, res) => {
    try {
      const infographics = await storage.getInfographics();
      res.json(infographics);
    } catch (error) {
      console.error("Get infographics error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/infographics", requireAuth, async (req: AuthRequest, res) => {
    try {
      const infographic = await storage.createInfographic(req.body);
      res.status(201).json(infographic);
    } catch (error) {
      console.error("Create infographic error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/infographics/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const infographic = await storage.updateInfographic(req.params.id, req.body);
      res.json(infographic);
    } catch (error) {
      console.error("Update infographic error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/infographics/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      await storage.deleteInfographic(req.params.id);
      res.json({ message: "Infographic deleted successfully" });
    } catch (error) {
      console.error("Delete infographic error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/community-plans", async (req, res) => {
    try {
      const plans = await storage.getCommunityPlans();
      res.json(plans);
    } catch (error) {
      console.error("Get community plans error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/community-plans", requireAuth, async (req: AuthRequest, res) => {
    try {
      const plan = await storage.createCommunityPlan(req.body);
      res.status(201).json(plan);
    } catch (error) {
      console.error("Create community plan error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/community-plans/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const plan = await storage.updateCommunityPlan(req.params.id, req.body);
      res.json(plan);
    } catch (error) {
      console.error("Update community plan error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/community-plans/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      await storage.deleteCommunityPlan(req.params.id);
      res.json({ message: "Community plan deleted successfully" });
    } catch (error) {
      console.error("Delete community plan error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/partners", async (req, res) => {
    try {
      const partners = await storage.getPartners();
      res.json(partners);
    } catch (error) {
      console.error("Get partners error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/partners", requireAuth, async (req: AuthRequest, res) => {
    try {
      const partner = await storage.createPartner(req.body);
      res.status(201).json(partner);
    } catch (error) {
      console.error("Create partner error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/partners/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const partner = await storage.updatePartner(req.params.id, req.body);
      res.json(partner);
    } catch (error) {
      console.error("Update partner error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/partners/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      await storage.deletePartner(req.params.id);
      res.json({ message: "Partner deleted successfully" });
    } catch (error) {
      console.error("Delete partner error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getNews();
      res.json(news);
    } catch (error) {
      console.error("Get news error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/news", requireAuth, async (req: AuthRequest, res) => {
    try {
      const newsItem = await storage.createNews(req.body);
      res.status(201).json(newsItem);
    } catch (error) {
      console.error("Create news error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/news/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const newsItem = await storage.updateNews(req.params.id, req.body);
      res.json(newsItem);
    } catch (error) {
      console.error("Update news error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/news/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      await storage.deleteNews(req.params.id);
      res.json({ message: "News deleted successfully" });
    } catch (error) {
      console.error("Delete news error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/upload", requireAuth, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      res.json({
        url: fileUrl,
        filename: req.file.originalname,
        size: req.file.size,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "File upload failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

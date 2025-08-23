// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  contactSubmissions;
  newsletterSubscriptions;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.contactSubmissions = /* @__PURE__ */ new Map();
    this.newsletterSubscriptions = /* @__PURE__ */ new Map();
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createContactSubmission(insertSubmission) {
    const id = randomUUID();
    const submission = {
      ...insertSubmission,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      company: insertSubmission.company ?? null
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
  async getContactSubmissions() {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  async createNewsletterSubscription(insertSubscription) {
    const id = randomUUID();
    const subscription = {
      ...insertSubscription,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }
  async getNewsletterSubscriptions() {
    return Array.from(this.newsletterSubscriptions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  project: text("project").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true
});
var insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
import { z } from "zod";
import nodemailer from "nodemailer";
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      console.log("Contact form submission received");
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      try {
        await sendContactEmail(validatedData);
        console.log("Contact email sent successfully");
      } catch (emailError) {
        console.error(
          "Email sending failed, but submission was saved:",
          emailError
        );
      }
      res.json({
        success: true,
        submission,
        message: "Message sent successfully! We will get back to you within 24 hours."
      });
    } catch (error) {
      console.error("Contact form error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          error: "Invalid form data",
          details: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Internal server error",
          message: "Sorry, there was an error sending your message. Please try again later."
        });
      }
    }
  });
  app2.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription(
        validatedData
      );
      res.json({ success: true, subscription });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          error: "Invalid email",
          details: error.errors
        });
      } else {
        res.status(500).json({ success: false, error: "Internal server error" });
      }
    }
  });
  app2.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json({ success: true, submissions });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });
  app2.get("/api/newsletter", async (req, res) => {
    try {
      const subscriptions = await storage.getNewsletterSubscriptions();
      res.json({ success: true, subscriptions });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });
  async function sendContactEmail(formData) {
    const { name, email, company, project } = formData;
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error("Email credentials not configured");
    }
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtpout.secureserver.net",
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      cc: process.env.EMAIL_CC ? process.env.EMAIL_CC.split(",") : [],
      subject: `New Contact Submission: ${name}`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9fafb; width: 120px;"><strong>Name</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9fafb;"><strong>Email</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9fafb;"><strong>Company</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${company || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9fafb; vertical-align: top;"><strong>Project</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd; white-space: pre-line;">${project}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9fafb;"><strong>Submitted At</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${(/* @__PURE__ */ new Date()).toLocaleString()}</td>
          </tr>
        </table>
      </div>
    `,
      text: `New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Project: ${project}

Submitted At: ${(/* @__PURE__ */ new Date()).toLocaleString()}`
    };
    await transporter.sendMail(mailOptions);
  }
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "8081", 10);
  server.listen(
    {
      port,
      host: "0.0.0.0"
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();
var index_default = app;
export {
  index_default as default
};

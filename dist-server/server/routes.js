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
async function registerRoutes(app) {
  app.post("/api/contact", async (req, res) => {
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
  app.post("/api/newsletter", async (req, res) => {
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
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json({ success: true, submissions });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });
  app.get("/api/newsletter", async (req, res) => {
    try {
      const subscriptions = await storage.getNewsletterSubscriptions();
      res.json({ success: true, subscriptions });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });
  async function sendContactEmail(formData) {
    const { name, email, company, project } = formData;
    console.log("\u{1F527} sendContactEmail called with:", {
      name,
      email,
      company,
      project
    });
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error(
        "\u274C Email credentials not configured in environment variables"
      );
      console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Set" : "Not set");
      console.log(
        "EMAIL_PASSWORD:",
        process.env.EMAIL_PASSWORD ? "Set" : "Not set"
      );
      throw new Error("Email credentials not configured");
    }
    console.log("\u2705 Email credentials found in environment variables");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtpout.secureserver.net",
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    try {
      console.log("\u{1F527} Testing SMTP connection...");
      await transporter.verify();
      console.log("\u2705 SMTP connection verified");
    } catch (error) {
      console.error("\u274C SMTP connection failed:", error);
      throw error;
    }
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
    console.log("\u{1F4E7} Attempting to send email...");
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("\u2705 Email sent successfully!");
      console.log("Message ID:", info.messageId);
      console.log("Response:", info.response);
    } catch (error) {
      console.error("\u274C Email sending failed:", error);
      throw error;
    }
  }
  const httpServer = createServer(app);
  return httpServer;
}
export {
  registerRoutes
};

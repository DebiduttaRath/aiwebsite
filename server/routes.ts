import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertContactSubmissionSchema,
  insertNewsletterSubscriptionSchema,
} from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      console.log("Contact form submission received");

      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);

      // Send email notification
      try {
        await sendContactEmail(validatedData);
        console.log("Contact email sent successfully");
      } catch (emailError) {
        console.error(
          "Email sending failed, but submission was saved:",
          emailError
        );
        // Don't fail the request if email fails, just log it
      }

      res.json({
        success: true,
        submission,
        message:
          "Message sent successfully! We will get back to you within 24 hours.",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          error: "Invalid form data",
          details: error.errors,
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Internal server error",
          message:
            "Sorry, there was an error sending your message. Please try again later.",
        });
      }
    }
  });

  // Newsletter subscription
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
          details: error.errors,
        });
      } else {
        res
          .status(500)
          .json({ success: false, error: "Internal server error" });
      }
    }
  });

  // Get contact submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json({ success: true, submissions });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  // Get newsletter subscriptions (for admin purposes)
  app.get("/api/newsletter", async (req, res) => {
    try {
      const subscriptions = await storage.getNewsletterSubscriptions();
      res.json({ success: true, subscriptions });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  async function sendContactEmail(formData: any) {
    const { name, email, company, project } = formData;

    // Validate required environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error("Email credentials not configured");
    }

    // Create transporter with GoDaddy settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtpout.secureserver.net",
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
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
            <td style="padding: 10px; border: 1px solid #ddd;">${
              company || "Not provided"
            }</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9fafb; vertical-align: top;"><strong>Project</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd; white-space: pre-line;">${project}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9fafb;"><strong>Submitted At</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
          </tr>
        </table>
      </div>
    `,
      text: `New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Project: ${project}

Submitted At: ${new Date().toLocaleString()}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
  }
  const httpServer = createServer(app);
  return httpServer;
}

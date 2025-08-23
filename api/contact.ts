// api/contact.ts
import { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import nodemailer from "nodemailer";

// Define schema locally instead of importing from @shared/schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  project: z.string().min(1, "Project description is required"),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    try {
      console.log("Contact form submission received");

      const validatedData = contactSchema.parse(req.body);

      // Send email notification
      try {
        await sendContactEmail(validatedData);
        console.log("Contact email sent successfully");
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Don't fail the request if email fails
      }

      res.status(200).json({
        success: true,
        submission: {
          ...validatedData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
        },
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
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}

async function sendContactEmail(formData: any) {
  const { name, email, company, project } = formData;

  // Validate required environment variables
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error("Email credentials not configured");
    throw new Error("Email credentials not configured");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtpout.secureserver.net",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
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

  await transporter.sendMail(mailOptions);
}

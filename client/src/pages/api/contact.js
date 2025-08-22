import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    console.log("Confirm if this is hit");
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, email, company, project } = req.body;

        // Validate required fields
        if (!name || !email || !project) {
            return res.status(400).json({
                message: 'Missing required fields: name, email, and project are required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Create transporter with GoDaddy settings
        const transporter = nodemailer.createTransporter({
            host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
            port: parseInt(process.env.SMTP_PORT) || 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.CONTACT_EMAIL,
            cc: process.env.EMAIL_CC ? process.env.EMAIL_CC.split(',') : [],
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
              <td style="padding: 10px; border: 1px solid #ddd;">${company || 'Not provided'}</td>
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
Company: ${company || 'Not provided'}
Project: ${project}

Submitted At: ${new Date().toLocaleString()}`
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Success response
        res.status(200).json({
            message: 'Message sent successfully! We will get back to you within 24 hours.'
        });

    } catch (error) {
        console.error('Email sending error:', error);

        // User-friendly error message
        res.status(500).json({
            message: 'Sorry, there was an error sending your message. Please try again later or contact us directly.'
        });
    }
}
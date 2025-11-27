const nodemailer = require("nodemailer");

/**
 * Email service for sending OTP and other emails
 */
class EmailService {
    constructor() {
        // For development, log emails to console
        // For production, configure with real SMTP settings
        if (process.env.NODE_ENV === "production") {
            this.transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
        } else {
            // Development mode - log to console
            this.transporter = null;
        }
    }

    /**
     * Send OTP email
     * @param {string} email - Recipient email
     * @param {string} otp - OTP code
     * @param {string} purpose - Purpose of OTP (signup, reset password)
     */
    async sendOTP(email, otp, purpose = "verification") {
        const subject = purpose === "reset"
            ? "Password Reset OTP"
            : "Email Verification OTP";

        const html = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Your OTP Code</h2>
                <p>Your OTP for ${purpose} is:</p>
                <h1 style="color: #4CAF50; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
                <p>This OTP will expire in ${process.env.OTP_EXPIRE_MINUTES || 10} minutes.</p>
                <p>If you didn't request this, please ignore this email.</p>
            </div>
        `;

        if (process.env.NODE_ENV === "production" && this.transporter) {
            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: email,
                subject: subject,
                html: html,
            };

            await this.transporter.sendMail(mailOptions);
        } else {
            // Development mode - log to console
            console.log("\n=================================");
            console.log("📧 EMAIL (Development Mode)");
            console.log("=================================");
            console.log(`To: ${email}`);
            console.log(`Subject: ${subject}`);
            console.log(`OTP: ${otp}`);
            console.log("=================================\n");
        }
    }

    /**
     * Send welcome email
     * @param {string} email - Recipient email
     * @param {string} name - User name
     */
    async sendWelcomeEmail(email, name) {
        const html = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Welcome to Our E-commerce Store!</h2>
                <p>Hi ${name},</p>
                <p>Thank you for registering with us. Your account has been successfully created.</p>
                <p>Happy shopping!</p>
            </div>
        `;

        if (process.env.NODE_ENV === "production" && this.transporter) {
            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: email,
                subject: "Welcome to E-commerce Store",
                html: html,
            };

            await this.transporter.sendMail(mailOptions);
        } else {
            console.log(`\n📧 Welcome email sent to ${email} (Development Mode)\n`);
        }
    }
}

module.exports = new EmailService();

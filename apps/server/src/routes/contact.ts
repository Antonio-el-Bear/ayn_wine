import express, { Request, Response } from 'express';
import { ApiError, asyncHandler } from '../utils/errors';
import { sendEmail } from '../utils/email';

const router = express.Router();

/**
 * @swagger
 * /api/contact:
 *   post:
 *     tags:
 *       - Contact
 *     summary: Submit contact form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 */
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      throw new ApiError(400, 'Name, email, and message are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ApiError(400, 'Invalid email format');
    }

    // Send email notification to support team
    try {
      await sendEmail({
        to: process.env.SUPPORT_EMAIL || 'support@aynwine.com',
        subject: `Contact Form: ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Reply directly to ${email}</small></p>
        `,
      });

      // Send confirmation email to customer
      await sendEmail({
        to: email,
        subject: 'We received your message - Ayn Wine',
        html: `
          <h2>Thank you for contacting us!</h2>
          <p>Hi ${name},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p><strong>Your message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p>Best regards,<br>The Ayn Wine Team</p>
          <p><small>support@aynwine.com | +1 (555) 123-4567</small></p>
        `,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails - log for admin to follow up
    }

    res.json({
      success: true,
      message: 'Thank you for your message. We will reply soon.',
    });
  })
);

export default router;

import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    // Log email
    await prisma.emailLog.create({
      data: {
        to: options.to,
        subject: options.subject,
        body: options.html,
        status: 'pending',
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      ...options,
    });

    // Update log
    await prisma.emailLog.updateMany({
      where: {
        to: options.to,
        subject: options.subject,
      },
      data: { status: 'sent' },
    });

    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Email error:', error);

    // Update log with error
    await prisma.emailLog.updateMany({
      where: {
        to: options.to,
        subject: options.subject,
      },
      data: {
        status: 'failed',
        error: (error as Error).message,
      },
    });

    throw error;
  }
};

// Email templates
export const emailTemplates = {
  welcome: (name: string, email: string) => ({
    subject: 'Welcome to Ayn Wine!',
    html: `
      <h1>Welcome to Ayn Wine!</h1>
      <p>Hello ${name},</p>
      <p>Thank you for creating an account with us. We're excited to have you!</p>
      <p>Start exploring our premium wine and liquor collection.</p>
      <a href="${process.env.FRONTEND_URL}/products" style="
        display: inline-block;
        padding: 12px 24px;
        background-color: #722f37;
        color: white;
        text-decoration: none;
        border-radius: 4px;
      ">Shop Now</a>
    `,
  }),

  orderConfirmation: (orderId: string, total: number, items: any[]) => ({
    subject: `Order Confirmation #${orderId}`,
    html: `
      <h1>Order Confirmed!</h1>
      <p>Your order has been received and is being processed.</p>
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Total:</strong> $${total.toFixed(2)}</p>
      <h3>Items:</h3>
      <ul>
        ${items.map((item) => `<li>${item.productName} x ${item.quantity}</li>`).join('')}
      </ul>
      <p>You'll receive a shipping confirmation email when your order ships.</p>
    `,
  }),

  orderShipped: (orderId: string, trackingNumber: string) => ({
    subject: `Your Order #${orderId} Has Shipped`,
    html: `
      <h1>Your Order Has Shipped!</h1>
      <p>Your order is on its way.</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
      <a href="${process.env.FRONTEND_URL}/orders/${orderId}" style="
        display: inline-block;
        padding: 12px 24px;
        background-color: #722f37;
        color: white;
        text-decoration: none;
        border-radius: 4px;
      ">Track Order</a>
    `,
  }),

  passwordReset: (resetLink: string) => ({
    subject: 'Reset Your Password',
    html: `
      <h1>Password Reset</h1>
      <p>You requested to reset your password. Click the link below:</p>
      <a href="${resetLink}" style="
        display: inline-block;
        padding: 12px 24px;
        background-color: #722f37;
        color: white;
        text-decoration: none;
        border-radius: 4px;
      ">Reset Password</a>
      <p>This link expires in 1 hour.</p>
    `,
  }),
};

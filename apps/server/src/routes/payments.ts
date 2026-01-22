import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import { prisma } from '../utils/prisma';
import { ApiError, asyncHandler } from '../utils/errors';
import { sendEmail, emailTemplates } from '../utils/email';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

/**
 * @swagger
 * /api/payments/intent:
 *   post:
 *     tags:
 *       - Payments
 *     summary: Create payment intent
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               orderId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment intent created
 */
router.post(
  '/intent',
  asyncHandler(async (req: Request, res: Response) => {
    const { amount, orderId } = req.body;

    if (!amount || amount < 1) {
      throw new ApiError(400, 'Invalid amount');
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'usd',
        metadata: { orderId: orderId || 'unknown' },
      });

      res.json({
        success: true,
        data: {
          clientSecret: paymentIntent.client_secret,
          paymentIntentId: paymentIntent.id,
        },
      });
    } catch (error) {
      throw new ApiError(400, (error as Error).message);
    }
  })
);

/**
 * @swagger
 * /api/payments/confirm:
 *   post:
 *     tags:
 *       - Payments
 *     summary: Confirm payment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentIntentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment confirmed
 */
router.post(
  '/confirm',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      throw new ApiError(400, 'Payment intent ID required');
    }

    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.status !== 'succeeded') {
        throw new ApiError(400, 'Payment not completed');
      }

      const orderId = paymentIntent.metadata?.orderId;
      if (orderId) {
        const order = await prisma.order.update({
          where: { id: orderId },
          data: {
            paymentStatus: 'completed',
            status: 'processing',
            stripePaymentIntentId: paymentIntentId,
          },
          include: {
            items: true,
            user: true,
          },
        });

        // Send order confirmation email
        try {
          const template = emailTemplates.orderConfirmation(
            order.id,
            order.total,
            order.items
          );
          await sendEmail({
            to: order.user.email,
            ...template,
          });
        } catch (emailError) {
          console.error('Order confirmation email failed:', emailError);
        }
      }

      res.json({
        success: true,
        message: 'Payment confirmed successfully',
      });
    } catch (error) {
      throw new ApiError(400, (error as Error).message);
    }
  })
);

export default router;

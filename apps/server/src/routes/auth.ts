import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import Joi from 'joi';
import { prisma } from '../utils/prisma';
import { generateToken } from '../utils/jwt';
import { sendEmail, emailTemplates } from '../utils/email';
import { ApiError, asyncHandler } from '../utils/errors';

const router = express.Router();

// Validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post(
  '/register',
  asyncHandler(async (req: Request, res: Response) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) throw new ApiError(400, error.message);

    const existingUser = await prisma.user.findUnique({
      where: { email: value.email },
    });

    if (existingUser) {
      throw new ApiError(400, 'Email already registered');
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);

    const user = await prisma.user.create({
      data: {
        email: value.email,
        password: hashedPassword,
        name: value.name,
      },
    });

    // Create empty cart
    await prisma.cart.create({
      data: { userId: user.id },
    });

    // Send welcome email
    try {
      const template = emailTemplates.welcome(user.name, user.email);
      await sendEmail({
        to: user.email,
        ...template,
      });
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
    }

    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    });
  })
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post(
  '/login',
  asyncHandler(async (req: Request, res: Response) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) throw new ApiError(400, error.message);

    const user = await prisma.user.findUnique({
      where: { email: value.email },
    });

    if (!user || !(await bcrypt.compare(value.password, user.password))) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const token = generateToken(user.id);

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    });
  })
);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data
 */
router.get(
  '/me',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  })
);

export default router;

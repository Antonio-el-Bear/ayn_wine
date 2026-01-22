import express, { Request, Response } from 'express';
import Joi from 'joi';
import { prisma } from '../utils/prisma';
import { ApiError, asyncHandler } from '../utils/errors';

const router = express.Router();

const addressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipCode: Joi.string().required(),
  country: Joi.string().required(),
  isDefault: Joi.boolean().default(false),
});

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */
router.get(
  '/profile',
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
        phone: user.phone,
        role: user.role,
      },
    });
  })
);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.put(
  '/profile',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { name, phone } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
      },
    });

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
    });
  })
);

/**
 * @swagger
 * /api/users/addresses:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user addresses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of addresses
 */
router.get(
  '/addresses',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;

    const addresses = await prisma.address.findMany({
      where: { userId },
    });

    res.json({
      success: true,
      data: addresses,
    });
  })
);

/**
 * @swagger
 * /api/users/addresses:
 *   post:
 *     tags:
 *       - Users
 *     summary: Add address
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Address added
 */
router.post(
  '/addresses',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { error, value } = addressSchema.validate(req.body);

    if (error) throw new ApiError(400, error.message);

    const address = await prisma.address.create({
      data: {
        userId,
        ...value,
      },
    });

    res.status(201).json({
      success: true,
      data: address,
    });
  })
);

/**
 * @swagger
 * /api/users/addresses/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete address
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Address deleted
 */
router.delete(
  '/addresses/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { id } = req.params;

    const address = await prisma.address.findUnique({
      where: { id },
    });

    if (!address || address.userId !== userId) {
      throw new ApiError(403, 'Unauthorized');
    }

    await prisma.address.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Address deleted',
    });
  })
);

export default router;

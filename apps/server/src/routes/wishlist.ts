import express, { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { ApiError, asyncHandler } from '../utils/errors';

const router = express.Router();

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     tags:
 *       - Wishlist
 *     summary: Get user's wishlist
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wishlist items
 */
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;

    const wishlistItems = await prisma.wishlistItem.findMany({
      where: { userId },
      include: { product: true },
    });

    res.json({
      success: true,
      data: wishlistItems,
    });
  })
);

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     tags:
 *       - Wishlist
 *     summary: Add product to wishlist
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product added to wishlist
 */
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { productId } = req.body;

    if (!productId) {
      throw new ApiError(400, 'Product ID required');
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    const wishlistItem = await prisma.wishlistItem.create({
      data: { userId, productId },
      include: { product: true },
    });

    res.status(201).json({
      success: true,
      data: wishlistItem,
    });
  })
);

/**
 * @swagger
 * /api/wishlist/{productId}:
 *   delete:
 *     tags:
 *       - Wishlist
 *     summary: Remove product from wishlist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 */
router.delete(
  '/:productId',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { productId } = req.params;

    await prisma.wishlistItem.deleteMany({
      where: { userId, productId },
    });

    res.json({
      success: true,
      message: 'Product removed from wishlist',
    });
  })
);

export default router;

import express, { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { ApiError, asyncHandler } from '../utils/errors';

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products
 *     parameters:
 *       - name: page
 *         in: query
 *         type: integer
 *       - name: pageSize
 *         in: query
 *         type: integer
 *       - name: category
 *         in: query
 *         type: string
 *       - name: search
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: List of products
 */
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, pageSize = 20, category, search } = req.query;
    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const size = Math.min(100, Math.max(1, parseInt(pageSize as string) || 20));
    const skip = (pageNum - 1) * size;

    const where: any = {};
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { tags: { has: search as string } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: size,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        items: products,
        total,
        page: pageNum,
        pageSize: size,
        hasMore: skip + size < total,
      },
    });
  })
);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get product by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Product details
 */
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    res.json({
      success: true,
      data: product,
    });
  })
);

/**
 * @swagger
 * /api/products/trending:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get trending products
 *     responses:
 *       200:
 *         description: Trending products
 */
router.get(
  '/trending',
  asyncHandler(async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({
      where: { stock: { gt: 0 } },
      orderBy: { reviews: 'desc' },
      take: 10,
    });

    res.json({
      success: true,
      data: products,
    });
  })
);

export default router;

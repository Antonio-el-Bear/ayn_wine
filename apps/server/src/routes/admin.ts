import express, { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { ApiError, asyncHandler } from '../utils/errors';

const router = express.Router();

/**
 * @swagger
 * /api/admin/products:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Create product (Admin only)
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
 *         description: Product created
 */
router.post(
  '/products',
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;

    if (user?.role !== 'admin') {
      throw new ApiError(403, 'Admin access required');
    }

    const { name, description, price, image, category, stock, volume, alcohol, origin } =
      req.body;

    if (!name || !description || !price || !category) {
      throw new ApiError(400, 'Missing required fields');
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image,
        category,
        stock,
        volume,
        alcohol,
        origin,
      },
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  })
);

/**
 * @swagger
 * /api/admin/products/{id}:
 *   put:
 *     tags:
 *       - Admin
 *     summary: Update product (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product updated
 */
router.put(
  '/products/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;

    if (user?.role !== 'admin') {
      throw new ApiError(403, 'Admin access required');
    }

    const { id } = req.params;

    const product = await prisma.product.update({
      where: { id },
      data: req.body,
    });

    res.json({
      success: true,
      data: product,
    });
  })
);

/**
 * @swagger
 * /api/admin/products/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete product (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Product deleted
 */
router.delete(
  '/products/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;

    if (user?.role !== 'admin') {
      throw new ApiError(403, 'Admin access required');
    }

    const { id } = req.params;

    await prisma.product.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Product deleted',
    });
  })
);

/**
 * @swagger
 * /api/admin/orders:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all orders (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 */
router.get(
  '/orders',
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;

    if (user?.role !== 'admin') {
      throw new ApiError(403, 'Admin access required');
    }

    const orders = await prisma.order.findMany({
      include: { items: true, user: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: orders,
    });
  })
);

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get dashboard stats (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 */
router.get(
  '/dashboard',
  asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;

    if (user?.role !== 'admin') {
      throw new ApiError(403, 'Admin access required');
    }

    const [totalOrders, totalRevenue, totalProducts, totalUsers] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: 'delivered' },
      }),
      prisma.product.count(),
      prisma.user.count(),
    ]);

    res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue: totalRevenue._sum.total || 0,
        totalProducts,
        totalUsers,
      },
    });
  })
);

export default router;

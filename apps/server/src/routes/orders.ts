import express, { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { ApiError, asyncHandler } from '../utils/errors';

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get user's orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         type: integer
 *       - name: pageSize
 *         in: query
 *         type: integer
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { page = 1, pageSize = 10 } = req.query;
    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const size = Math.min(100, Math.max(1, parseInt(pageSize as string) || 10));
    const skip = (pageNum - 1) * size;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        include: { items: true, shippingAddress: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: size,
      }),
      prisma.order.count({ where: { userId } }),
    ]);

    res.json({
      success: true,
      data: {
        items: orders,
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
 * /api/orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get order details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Order details
 */
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true, shippingAddress: true },
    });

    if (!order) {
      throw new ApiError(404, 'Order not found');
    }

    if (order.userId !== userId) {
      throw new ApiError(403, 'Unauthorized');
    }

    res.json({
      success: true,
      data: order,
    });
  })
);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Create order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shippingAddressId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created
 */
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { shippingAddressId } = req.body;

    if (!shippingAddressId) {
      throw new ApiError(400, 'Shipping address required');
    }

    // Verify shipping address belongs to user
    const address = await prisma.address.findUnique({
      where: { id: shippingAddressId },
    });

    if (!address || address.userId !== userId) {
      throw new ApiError(400, 'Invalid shipping address');
    }

    // Get cart items
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      throw new ApiError(400, 'Cart is empty');
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        shippingAddressId,
        total: cart.total,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            productName: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true, shippingAddress: true },
    });

    // Clear cart
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    await prisma.cart.update({
      where: { id: cart.id },
      data: { total: 0 },
    });

    res.status(201).json({
      success: true,
      data: order,
    });
  })
);

/**
 * @swagger
 * /api/orders/{id}/cancel:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Cancel order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Order cancelled
 */
router.post(
  '/:id/cancel',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new ApiError(404, 'Order not found');
    }

    if (order.userId !== userId) {
      throw new ApiError(403, 'Unauthorized');
    }

    if (!['pending', 'processing'].includes(order.status)) {
      throw new ApiError(400, 'Cannot cancel order in current status');
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status: 'cancelled' },
      include: { items: true },
    });

    res.json({
      success: true,
      data: updatedOrder,
    });
  })
);

export default router;

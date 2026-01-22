import express, { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { ApiError, asyncHandler } from '../utils/errors';

const router = express.Router();

/**
 * @swagger
 * /api/cart:
 *   get:
 *     tags:
 *       - Cart
 *     summary: Get user's cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart data
 */
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart) {
      throw new ApiError(404, 'Cart not found');
    }

    res.json({
      success: true,
      data: cart,
    });
  })
);

/**
 * @swagger
 * /api/cart/items:
 *   post:
 *     tags:
 *       - Cart
 *     summary: Add item to cart
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
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item added to cart
 */
router.post(
  '/items',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      throw new ApiError(400, 'Invalid product or quantity');
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    if (product.stock < quantity) {
      throw new ApiError(400, 'Insufficient stock');
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new ApiError(404, 'Cart not found');
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });

    let cartItem;
    if (existingItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: { product: true },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
        include: { product: true },
      });
    }

    // Update cart total
    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: { product: true },
    });

    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    await prisma.cart.update({
      where: { id: cart.id },
      data: { total },
    });

    res.json({
      success: true,
      data: cartItem,
    });
  })
);

/**
 * @swagger
 * /api/cart/items/{productId}:
 *   put:
 *     tags:
 *       - Cart
 *     summary: Update cart item quantity
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item updated
 */
router.put(
  '/items/:productId',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 0) {
      throw new ApiError(400, 'Invalid quantity');
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new ApiError(404, 'Cart not found');
    }

    if (quantity === 0) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id, productId },
      });
    } else {
      await prisma.cartItem.update({
        where: { cartId_productId: { cartId: cart.id, productId } },
        data: { quantity },
      });
    }

    // Update cart total
    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: { product: true },
    });

    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const updatedCart = await prisma.cart.update({
      where: { id: cart.id },
      data: { total },
      include: { items: { include: { product: true } } },
    });

    res.json({
      success: true,
      data: updatedCart,
    });
  })
);

/**
 * @swagger
 * /api/cart/items/{productId}:
 *   delete:
 *     tags:
 *       - Cart
 *     summary: Remove item from cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Item removed
 */
router.delete(
  '/items/:productId',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { productId } = req.params;

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new ApiError(404, 'Cart not found');
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId },
    });

    // Update cart total
    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: { product: true },
    });

    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const updatedCart = await prisma.cart.update({
      where: { id: cart.id },
      data: { total },
      include: { items: { include: { product: true } } },
    });

    res.json({
      success: true,
      data: updatedCart,
    });
  })
);

/**
 * @swagger
 * /api/cart:
 *   delete:
 *     tags:
 *       - Cart
 *     summary: Clear cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared
 */
router.delete(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).userId;

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new ApiError(404, 'Cart not found');
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    const updatedCart = await prisma.cart.update({
      where: { id: cart.id },
      data: { total: 0 },
      include: { items: { include: { product: true } } },
    });

    res.json({
      success: true,
      data: updatedCart,
    });
  })
);

export default router;

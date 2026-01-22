import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// Routes
import authRoutes from './routes/auth';
import productsRoutes from './routes/products';
import cartRoutes from './routes/cart';
import ordersRoutes from './routes/orders';
import usersRoutes from './routes/users';
import paymentsRoutes from './routes/payments';
import wishlistRoutes from './routes/wishlist';
import adminRoutes from './routes/admin';
import contactRoutes from './routes/contact';

// Middleware
import { errorHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Swagger Documentation
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ayn Wine API',
      version: '1.0.0',
      description: 'E-commerce API for wine and liquor store',
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3001',
        description: 'API Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', authMiddleware, cartRoutes);
app.use('/api/orders', authMiddleware, ordersRoutes);
app.use('/api/users', authMiddleware, usersRoutes);
app.use('/api/payments', authMiddleware, paymentsRoutes);
app.use('/api/wishlist', authMiddleware, wishlistRoutes);
app.use('/api/admin', authMiddleware, adminRoutes);
app.use('/api/contact', contactRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation at http://localhost:${PORT}/api-docs`);
});

export default app;

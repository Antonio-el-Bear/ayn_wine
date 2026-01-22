import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-must-be-at-least-32-characters-long';

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): { userId: string } => {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
};

export const generatePasswordResetToken = (userId: string): string => {
  return jwt.sign({ userId, type: 'password-reset' }, JWT_SECRET, {
    expiresIn: '1h',
  });
};

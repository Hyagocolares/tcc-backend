// src/middleware/authMiddleware.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: Function): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
    req.body.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const encodeTokenUser = (user: { id: string, email: string }): string => {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === '') {
    throw new Error('JWT_SECRET is not defined');
  }
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as jwt.Secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } as jwt.SignOptions
  );
  return token;
};

export const createTokenUser = (userCreated: { id: string, email: string }): string => {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === '') {
    throw new Error('JWT_SECRET is not defined');
  }
  const token = jwt.sign(
    { id: userCreated.id, email: userCreated.email },
    process.env.JWT_SECRET as jwt.Secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } as jwt.SignOptions
  );
  return token;
};

export const decodeToken = (req: Request, res: Response): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    (req as any).user = decoded;
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const generateResetToken = (userId: number): string => {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === '') {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};



import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

if(!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não está definido no .env");
}

const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthenticatedRequest extends Request {
    user?: { id: string, email: string } | null;
}

export const authMiddleware = (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
            const decoded = jwt.verify(token, JWT_SECRET!);
            req.user = decoded as { id: string; email: string };
        } catch {
            req.user = null;
        }
    } else {
        req.user = null;
    }

    next();
}

export const getUserFromToken = (token: string) => {
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
        return decoded;
    } catch {
        return null;
    }
};
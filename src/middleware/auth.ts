import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            (req as any).user = decoded;
        } catch {
            (req as any).user = null;
        }
    } else {
        (req as any).user = null;
    }
    next();
}

export const getUserFromToken = (token: string) => {
    try {
        if (!token) {
        console.log("❌ Nenhum token recebido.");
        return null;
        }

        const cleanedToken = token.startsWith("Bearer ") ? token.replace("Bearer ", "") : token;
        const decoded = jwt.verify(cleanedToken, JWT_SECRET);

        console.log("✅ Token decodificado:", decoded);
        return decoded as { id: string; email: string };
    } catch (err) {
        console.log("❌ Erro ao verificar token:", err);
        return null;
    }
};
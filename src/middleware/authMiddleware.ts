import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// 👇 Global augmentation — makes req.user typed everywhere
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export interface JwtPayload {
  id: string;
  email: string;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ success: false, message: "Auth token is required" });
      return;
    }

    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
      res.status(401).json({ success: false, message: "Invalid auth format" });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(500).json({ success: false, message: "JWT secret is not configured" });
      return;
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    // ✅ No cast needed — Request is augmented above
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
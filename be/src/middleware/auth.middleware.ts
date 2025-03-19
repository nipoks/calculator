import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

export const authMiddleware = (req: Request, res: Response, next: NextFunction):void => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).send("Unauthorized");
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}
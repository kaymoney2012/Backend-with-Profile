import jwt from "jsonwebtoken";
export const protect = (req, res, next) => {
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
        const decoded = jwt.verify(token, secret);
        // ✅ No cast needed — Request is augmented above
        req.user = {
            id: decoded.id,
            email: decoded.email,
        };
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};
//# sourceMappingURL=authMiddleware.js.map
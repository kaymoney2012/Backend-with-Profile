import jwt from "jsonwebtoken"

interface iTokenPayload {
    id: string,
    email: string;
    role: string,
}

export const generateToken = ( payload: iTokenPayload ) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not configured")
    }

    return jwt.sign(
        payload, 
        secret,
        {
            expiresIn: "7d",
        } as jwt.SignOptions
    )
}
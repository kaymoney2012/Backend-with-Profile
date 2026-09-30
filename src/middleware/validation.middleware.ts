import type { NextFunction, Request, Response } from "express";



// validate email
export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({
            success: false,
            message: "Email is required"
        });
        return
    }

    if (!email.includes("@")) {
        res.status(400).json({
            success: false,
            message: "Please, provide a valid email address"
        })
    }

    if (!email.includes(".com")) {
        res.status(400).json({
            success: false,
            message: "Please, provide a valid email"
        })
    }
    next()
}

export const validatePassword = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;

    if (!password) {
        res.status(400).json({
            success: false,
            message: "Please, input your password"
        })
    }

    if (password.length < 7) {
        res.status(400).json({
            success: false,
            message: "Password must have, at least, 7 characters"
        })
    }

        // password must contain a number
    if (!/\d/.test(password)) {
        res.status(400).json({
            success: false,
            message: "Password must contain, at least, one number"
        })
    }
    next()
} 

// validate signup
export const validateSignup = (req: Request, res: Response, next: NextFunction) => {
    const { email, password, termsAndCondition, role } = req.body;

    if (
        !email ||
        !password ||
        termsAndCondition === undefined ||
        !role
    ) {
        res.status(400).json({
            success: false,
            message: "Email, Password, Terms & condition and role is required"
        })
        return
    }

     if (!email.includes("@")) {
        res.status(400).json({
            success: false,
            message: "Please, provide a valid email address"
        })
    }

    if (password.length < 7) {
        res.status(400).json({
            success: false,
            message: "Password must have, at least, 7 characters"
        })
    }

     // password must contain a number
    if (!/\d/.test(password)) {
        res.status(400).json({
            success: false,
            message: "Password must contain, at least, one number"
        })
        return
    }

    // terms and conditions
    if (termsAndCondition !== true) {
        res.status(400).json({
            success: false,
            message: "You must accept Terms and condition"
        })
        return
    }

    // role
    if (!["landlord", "tenant"].includes(role)) {
        res.status(400).json({
            success: false,
            message: "Role must be either landlord or tenant"
        })
        return
    }
    next()
}
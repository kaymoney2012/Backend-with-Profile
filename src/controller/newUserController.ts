import type { Request, Response } from "express";
import newUser from "../model/newUserModel.js";
import bcrypt from "bcryptjs";
import { sendOtpToEmail } from "../emailService/mailer.js";

// Generate OTP
const generateNewOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

//Generate Token

import jwt from "jsonwebtoken";

interface iTokenPayload {
  id: string;
  email: string;
}

export const generateNewToken = (payload: iTokenPayload) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(payload, secret, {
    expiresIn: "7d",
  } as jwt.SignOptions);
};

// Signup
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await newUser.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const otp = generateNewOtp();

    const user = await newUser.create({
      email,
      password: hashPassword,
      otp,
      isVerified: false,
      otpExpires: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendOtpToEmail(email, otp);

    return res.status(201).json({
      message: "signup successful. Check your email for your OTP",
      userId: user._id,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "signup error",
    });
  }
};

// Verify OTP
export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const user = await newUser.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    if (!user.otp || !user.otpExpires) {
      return res.status(400).json({
        message: "No OTP found",
      });
    }

    if (user.otpExpires.getTime() < Date.now()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid or wrong OTP",
      });
    }

    ((user.isVerified = true),
      // user.otp = undefined,
      // user.otpExpires = undefined,

      await user.save());

    return res.status(200).json({
      message: "Email has successfully verified",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Verification error",
    });
  }
};

// Re-send OTP
export const resendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await newUser.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "User already verified",
      });
    }

    const otp = generateNewOtp();

    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    await sendOtpToEmail(email, otp);

    return res.json({
      message: "A new OTP has been sent",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error sending OTP",
    });
  }
};

// Signin

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await newUser.findOne({ email });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "user not found",
      });
      return;
    }

    // check user if verified
    if (!user.isVerified) {
      res.status(403).json({
        success: false,
        message: "user has not been verified",
      });
    }

    // check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // generate JWT
    const token = generateNewToken({
      id: user._id.toString(),
      email: user.email,
    });

    res.status(200).json({
      success: true,
      message: "signin successsful",
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          isVerified: user.isVerified,
        },
      },
    });
  } catch (error) {
    console.error(error, "error");

    res.status(400).json({
      success: false,
      message: "error signing in",
    });
  }
};

// Update Profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, username, email, phone, dateOfBirth, nationality } = req.body;

    const currentUserId = (req as any).user?._id;
    if (!currentUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [existingUsername] = await Promise.all([
      newUser.findOne({ username, _id: { $ne: currentUserId } }),
    ]);

    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const updatedUser = await newUser.findByIdAndUpdate(
      currentUserId,
      { name, username, email, phone, dateOfBirth, nationality },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("updateProfile error:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating profile",
    });
  }
};

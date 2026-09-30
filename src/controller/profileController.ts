import type { Request, Response } from "express";
import profile from "../model/profileModel.js";

// Update Profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, username, email, phone, dateOfBirth, nationality } = req.body;

    const currentUserId = (req as any).user?._id;
    if (!currentUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [existingUsername] = await Promise.all([
      profile.findOne({ username, _id: { $ne: currentUserId } }),
    ]);

    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const updatedUser = await profile.findByIdAndUpdate(
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

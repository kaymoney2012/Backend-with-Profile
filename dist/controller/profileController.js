import profile from "../model/profileModel.js";
export const Profile = async (req, res) => {
    try {
        const { name, username, email, phone, dateOfBirth, nationality } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const updates = Object.fromEntries(Object.entries({ name, username, email, phone, dateOfBirth, nationality })
            .filter(([, v]) => v !== undefined));
        if (updates.username) {
            const existingUsername = await profile.findOne({
                username: updates.username,
                email: { $ne: email },
            });
            if (existingUsername) {
                return res.status(400).json({ message: "Username already exists" });
            }
        }
        const updatedProfile = await profile.findOneAndUpdate({ email }, { $set: updates }, {
            new: true,
            upsert: true,
            runValidators: true,
            setDefaultsOnInsert: true,
        });
        return res.status(200).json({
            message: "Profile updated successfully",
            profile: updatedProfile,
        });
    }
    catch (error) {
        if (error?.code === 11000) {
            return res.status(409).json({ message: "Profile already exists" });
        }
        console.error("updateProfile error:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating profile",
        });
    }
};
//# sourceMappingURL=profileController.js.map
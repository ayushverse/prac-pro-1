import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        if (!id || !firstName || !lastName) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Check if user already exists
        let user = await User.findOne({ clerkId: id });

        if (!user) {
            // Create new user
            user = await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl,
            });
        }

        res.status(200).json({
            success: true,
            message: "User authenticated successfully",
            user,
        });
    } catch (err) {
        console.error("Error in auth callback:", err);
        res.status(500).json({
            success: false,
            message: "Something went wrong during authentication",
            error: err.message,
        });
    }
};

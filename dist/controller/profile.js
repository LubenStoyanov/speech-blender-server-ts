import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getPodcasts = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Successfully loaded profile data.",
        });
    }
    catch (error) {
        console.error(error);
        return res
            .status(200)
            .json({ success: false, message: "Something went wrong." });
    }
};
//# sourceMappingURL=profile.js.map
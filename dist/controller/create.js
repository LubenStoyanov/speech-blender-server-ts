import jwt from "jsonwebtoken";
import { Podcast } from "../models/podcast.js";
import { User } from "../models/user.js";
export const createPodcast = async (req, res) => {
    try {
        const { title } = req.body;
        const token = req.cookies.token;
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: userId });
        if (user) {
            const podcast = await Podcast.create({ title: title, userId: userId });
            return res.status(200).json({
                success: true,
                title,
                username: user.username,
                podcastId: podcast._id,
            });
        }
        else {
            return res
                .status(403)
                .json({ success: false, message: "User doesn't exist." });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
        });
    }
};
//# sourceMappingURL=create.js.map
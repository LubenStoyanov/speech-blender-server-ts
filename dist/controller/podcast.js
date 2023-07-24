import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
export const createPodcast = async (req, res) => {
    try {
        const { title } = req.body;
        const token = req.cookies.token;
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findFirst({ where: { id: userId } });
        if (user) {
            const podcast = await prisma.podcast.create({
                data: { title: title, authorId: userId },
            });
            return res.status(200).json({
                success: true,
                title,
                username: user.name,
                podcastId: podcast.id,
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
export const getPodcasts = async (req, res) => {
    const { userId } = req.user;
    try {
        const podcasts = await prisma.podcast.findMany({
            take: 10,
            where: { authorId: userId },
        });
        return res.status(200).json({ success: true, data: podcasts });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
        });
    }
};
export const getPodcast = async (req, res) => {
    const { id } = req.params;
    try {
        const podcast = await prisma.podcast.findUnique({
            where: { id: Number(id) },
            include: {
                recordings: true,
            },
        });
        console.log("getPodcast", podcast);
        return res.status(200).json({ success: true, data: podcast });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
        });
    }
};
//# sourceMappingURL=podcast.js.map
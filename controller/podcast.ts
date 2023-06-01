import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { JWTPayloadI } from "../utils/types.js";

const prisma = new PrismaClient();

export const createPodcast = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const token = req.cookies.token;
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayloadI;
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
    } else {
      return res
        .status(403)
        .json({ success: false, message: "User doesn't exist." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
    });
  }
};
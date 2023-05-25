import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Podcast } from "../models/podcast.js";
import { User } from "../models/user.js";
import { JWTPayloadI } from "../utils/types.js";

export const createPodcast = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const token = req.cookies.token;
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayloadI;
    const user = await User.findOne({ _id: userId });

    if (user) {
      const podcast = await Podcast.create({ title: title, userId: userId });

      return res.status(200).json({
        success: true,
        title,
        username: user.username,
        podcastId: podcast._id,
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

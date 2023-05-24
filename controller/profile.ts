import { Request, Response } from "express";

export const getProfileData = async (req: Request, res: Response) => {
  try {
    return res.json({
      status: 200,
      message: "Successfully loaded profile data.",
    });
  } catch (error) {
    return res.json({ status: 400, message: "Something went wrong." });
  }
};

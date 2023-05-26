import type { Response } from "express";
import { JWTPayloadI, PodcastI, TypedRequestBody } from "../utils/types.js";

export const getProfileData = async (
  req: TypedRequestBody<JWTPayloadI & PodcastI>,
  res: Response
) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Successfully loaded profile data.",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(200)
      .json({ success: false, message: "Something went wrong." });
  }
};

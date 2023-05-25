import type { Response } from "express";
import { JWTPayloadI, PodcastI, TypedRequestBody } from "../utils/types.js";

export const getProfileData = async (
  req: TypedRequestBody<JWTPayloadI & PodcastI>,
  res: Response
) => {
  try {
    return res.json({
      success: true,
      message: "Successfully loaded profile data.",
    });
  } catch (error) {
    return res.json({ success: false, message: "Something went wrong." });
  }
};

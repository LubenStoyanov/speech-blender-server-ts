import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import type { JWTPayloadI, TypedRequestBody } from "../utils/types.js";

export const authMiddleware = (
  req: TypedRequestBody<JWTPayloadI>,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET
      ) as JWTPayloadI;
      if (!decodedToken) {
        return res
          .status(403)
          .json({ success: false, error: "Missing required claim" });
      }
      req.user = decodedToken;
      next();
    } catch (err) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }
  } else {
    return res.status(401).json({ success: false, error: "No token provided" });
  }
};

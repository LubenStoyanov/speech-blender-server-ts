import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import type { JWTPayload, TypedRequestBody } from "../utils/types.js";

export const authMiddleware = (
  req: TypedRequestBody<JWTPayload>,
  res: Response,
  next: NextFunction
) => {
  // const authHeader = req.headers.authorization;
  const token = req.cookies.token;
  if (token) {
    // const token = authHeader.split(" ")[1];
    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET
      ) as JWTPayload;
      if (!decodedToken) {
        return res.status(403).json({ error: "Missing required claim" });
      }
      req.user = decodedToken;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  } else {
    return res.status(401).json({ error: "No token provided" });
  }
};

import jwt from "jsonwebtoken";
import type { JWTPayload } from "./types.js";

export const generateToken = (payload: JWTPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

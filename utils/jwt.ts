import jwt from "jsonwebtoken";
import type { JWTPayloadI } from "./types.js";

export const generateToken = (payload: JWTPayloadI) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

import express from "express";
import { getProfileData } from "../controller/profile.js";
import { authMiddleware } from "../middleware/auth.js";

export const profileRouter = express
  .Router()
  .post("/", authMiddleware, getProfileData);

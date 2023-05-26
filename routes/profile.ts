import express from "express";
import { getPodcasts } from "../controller/profile.js";
import { authMiddleware } from "../middleware/auth.js";

export const profileRouter = express.Router().get("/podcasts", getPodcasts);

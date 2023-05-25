import express from "express";
import { createPodcast } from "../controller/create.js";
import { authMiddleware } from "../middleware/auth.js";

export const podcastRouter = express
  .Router()
  .post("/podcast", authMiddleware, createPodcast);

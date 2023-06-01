import express from "express";
import { createPodcast } from "../controller/podcast.js";

export const podcastRouter = express.Router().post("/create", createPodcast);

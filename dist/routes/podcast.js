import express from "express";
import { createPodcast, getPodcasts } from "../controller/podcast.js";
export const podcastRouter = express
    .Router()
    .post("/create", createPodcast)
    .get("/get", getPodcasts);
//# sourceMappingURL=podcast.js.map
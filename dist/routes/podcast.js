import express from "express";
import { createPodcast, getPodcasts, getPodcast, } from "../controller/podcast.js";
export default express
    .Router()
    .post("/create", createPodcast)
    .get("/get/all", getPodcasts)
    .get("/get/:id", getPodcast);
//# sourceMappingURL=podcast.js.map
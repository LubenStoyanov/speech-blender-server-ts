import express from "express";
import { createPodcast, getDeletePodcast, getSearchPodcast, getPodcastsAll, getUserPodcasts, } from "../controller/podcast.js";
import { checkExistsPodcast } from "../utils/error.js";
export default express
    .Router()
    .get("/all", getPodcastsAll)
    .get("/user", getUserPodcasts)
    .post("/create-podcast", createPodcast)
    .delete("/delete/:podcastId", checkExistsPodcast, getDeletePodcast)
    .get("/search/:query", getSearchPodcast);
//# sourceMappingURL=podcast.js.map
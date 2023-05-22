import express from "express";
import { createPodcastTag, getPodcastTag, getDeletePodcastTag, } from "../controller/podcastTag.js";
import { checkExistsPodcastTag } from "../utils/error.js";
export default express
    .Router()
    .get("/all", getPodcastTag)
    .post("/create-podcast-tag", createPodcastTag)
    .delete("/delete-podcast-tag", checkExistsPodcastTag, getDeletePodcastTag);
//# sourceMappingURL=podcastTag.js.map
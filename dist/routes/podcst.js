import express from "express";
import { createPodcast } from "../controller/create.js";
export default express.Router().post("/podcast", createPodcast);
//# sourceMappingURL=podcst.js.map
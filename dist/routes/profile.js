import express from "express";
import { getPodcasts } from "../controller/profile.js";
export const profileRouter = express.Router().get("/podcasts", getPodcasts);
//# sourceMappingURL=profile.js.map
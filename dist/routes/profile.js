import express from "express";
import { getProfileData } from "../controller/profile.js";
import { authMiddleware } from "../middleware/auth.js";
export default express.Router().post("/", authMiddleware, getProfileData);
//# sourceMappingURL=profile.js.map
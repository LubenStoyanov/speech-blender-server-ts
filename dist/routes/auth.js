import express from "express";
import { register, login, logout, validateToken } from "../controller/auth.js";
import { authMiddleware } from "../middleware/auth.js";
export const authRouter = express
    .Router()
    .post("/validateToken", authMiddleware, validateToken)
    .post("/register", register)
    .post("/login", login)
    .post("/logout", logout);
//# sourceMappingURL=auth.js.map
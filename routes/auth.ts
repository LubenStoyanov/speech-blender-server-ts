import express from "express";
import { register, login, logout } from "../controller/auth.js";
import { authMiddleware } from "../middleware/auth.js";

export default express
  .Router()
  .get("/validateToken", authMiddleware)
  .post("/register", register)
  .post("/login", login)
  .post("/logout", logout);

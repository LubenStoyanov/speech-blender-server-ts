import express from "express";
import { register, login, logout } from "../controller/auth.js";

export default express
  .Router()
  .post("/register", register)
  .post("/login", login)
  .post("/logout", logout);

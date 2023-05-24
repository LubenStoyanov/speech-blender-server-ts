import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./database/db.js";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import { loggerMiddleware } from "./middleware/logger.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

app.use(loggerMiddleware);
app.use("/api/v1", authRouter);
app.use("/profile", profileRouter);
app.get("/", (req, res) => res.send());
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database/db.js";
import authRouter from "./routes/auth.js";
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

app.use(loggerMiddleware);
app.use("/api/v1", authRouter);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

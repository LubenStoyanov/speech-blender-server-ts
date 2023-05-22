import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database/db.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
const app = express();
const port = process.env.PORT || 8080;
connectToDatabase();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use("/", authRouter);
app.use("/users", usersRouter);
app.post("/profile/:username", async (req, res) => {
    console.log("Token is valid.");
    res.sendStatus(200);
});
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
//# sourceMappingURL=index.js.map
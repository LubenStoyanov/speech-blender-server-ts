import express from "express";
import { createRecording, getRecordings } from "../controller/recording.js";
export default express
    .Router()
    .post("create/:id", createRecording)
    .get("all/:id", getRecordings);
//# sourceMappingURL=recording.js.map
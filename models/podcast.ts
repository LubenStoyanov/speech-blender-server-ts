import mongoose from "mongoose";

const podcastSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    private: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Podcast = mongoose.model("Podcast", podcastSchema);

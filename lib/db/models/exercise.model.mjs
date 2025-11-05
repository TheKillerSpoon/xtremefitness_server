import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const exerciseSchema = new Schema(
  {
    image: {
      type: String,
      default: process.env.SERVER_HOST + "/exercises/no-image.png",
    },
    title: { type: String, required: true },
    teaser: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.exercise ||
  mongoose.model("exercise", exerciseSchema);

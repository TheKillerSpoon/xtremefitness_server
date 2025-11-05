import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const reviewSchema = new Schema(
  {
    author: { type: String, required: true },
    content: { type: String, required: true },
    position: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.review || mongoose.model("review", reviewSchema);

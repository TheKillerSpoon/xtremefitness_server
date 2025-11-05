import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const serviceSchema = new Schema(
  {
    title: { type: String, required: true },
    teaser: { type: String, required: true },
    content: { type: String, required: true },
    icon: { type: String },
    image: {
      type: String,
      default: process.env.SERVER_HOST + "/services/no-image.png",
    },
  },
  { timestamps: true }
);

export default mongoose.models.service ||
  mongoose.model("service", serviceSchema);

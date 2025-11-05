import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const blogSchema = new Schema(
  {
    image: {
      type: String,
      default: process.env.SERVER_HOST + "/blogs/no-image.png",
    },
    title: { type: String, required: true },
    teaser: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.blog || mongoose.model("blog", blogSchema);

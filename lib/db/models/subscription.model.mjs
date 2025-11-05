import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const subscriptionSchema = new Schema(
  {
    image: {
      type: String,
      default: process.env.SERVER_HOST + "/subscriptions/no-image.png",
    },
    title: { type: String, required: true },
    list: [{ type: String }],
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.subscription ||
  mongoose.model("subscription", subscriptionSchema);

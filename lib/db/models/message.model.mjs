import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const messageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: Number },
    subject: { type: String },
    message: { type: String, required: true },
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.message ||
  mongoose.model("message", messageSchema);

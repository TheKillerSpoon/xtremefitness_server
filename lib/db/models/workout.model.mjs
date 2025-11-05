import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    weekday: { type: String },
    time: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.workout ||
  mongoose.model("workout", workoutSchema);

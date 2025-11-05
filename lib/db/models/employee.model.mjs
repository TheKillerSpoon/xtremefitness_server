import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const employeeSchema = new Schema(
  {
    image: {
      type: String,
      default: process.env.SERVER_HOST + "/employees/no-image.png",
    },
    name: { type: String, required: true },
    area: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.employee ||
  mongoose.model("employee", employeeSchema);

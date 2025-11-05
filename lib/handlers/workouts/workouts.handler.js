import dbConnect from "../../db/dbConnect.js";
import workoutModel from "../../db/models/workout.model.mjs";

export const getWorkouts = async () => {
  try {
    await dbConnect();

    const workouts = await workoutModel.find({});

    return {
      status: "ok",
      message: "Workouts fetched successfully",
      data: workouts,
    };
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return {
      status: "error",
      message: "An error occurred while fetching workouts",
      data: [],
      error: error.message,
    };
  }
};

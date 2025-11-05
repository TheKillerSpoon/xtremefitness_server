import dbConnect from "../../db/dbConnect.js";
import workoutModel from "../../db/models/workout.model.mjs";

// CREATE WORKOUT
export const createWorkout = async (body) => {
  try {
    await dbConnect();

    const data = await workoutModel.create(body);

    return {
      status: "ok",
      message: "Workout created successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error adding workout:", error);

    return {
      status: "error",
      message: "An error occurred while creating the workout",
      data: [],
      error: error.message,
    };
  }
};

// UPDATE WORKOUT
export const updateWorkout = async (body) => {
  try {
    await dbConnect();

    const workout = await workoutModel.findById(body.id);

    if (!workout) {
      return {
        status: "not_found",
        message: "Workout not found",
        data: [],
      };
    }

    const updatedWorkout = await workoutModel.findByIdAndUpdate(body.id, body, {
      new: true,
    });

    return {
      status: "ok",
      message: "Workout updated successfully",
      data: updatedWorkout,
    };
  } catch (error) {
    console.error("Error updating workout:", error);
    return {
      status: "error",
      message: "An error occurred while updating the workout",
      data: [],
      error: error.message,
    };
  }
};

// DELETE WORKOUT
export const deleteWorkout = async (id) => {
  try {
    await dbConnect();

    const workout = await workoutModel.findById(id);
    if (!workout) {
      return {
        status: "not_found",
        message: "Workout not found",
        data: [],
      };
    }

    const deletedWorkout = await workoutModel.findByIdAndDelete(id);

    return {
      status: "ok",
      message: "Workout deleted successfully",
      data: deletedWorkout,
    };
  } catch (error) {
    console.error("Error deleting workout:", error);
    return {
      status: "error",
      message: "An error occurred while deleting the workout",
      data: [],
      error: error.message,
    };
  }
};

// GET WORKOUT BY ID
export const getWorkoutById = async (id) => {
  try {
    await dbConnect();

    const workout = await workoutModel.findById(id);

    if (!workout) {
      return {
        status: "not_found",
        message: "Workout not found",
        data: [],
      };
    }

    return {
      status: "ok",
      message: "Workout fetched successfully",
      data: workout,
    };
  } catch (error) {
    console.error("Error fetching workout:", error);
    return {
      status: "error",
      message: "An error occurred while fetching the workout",
      data: [],
      error: error.message,
    };
  }
};

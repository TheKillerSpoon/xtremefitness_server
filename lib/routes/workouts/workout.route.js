import express from "express";
import auth from "../../middleware/auth.middleware.js";
import {
  createWorkout,
  deleteWorkout,
  getWorkoutById,
  updateWorkout,
} from "../../handlers/workouts/workout.handler.js";
import mongoose from "mongoose";

const workoutRouter = express.Router();

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return false;
  }
  return true;
};

// POST WORKOUT
workoutRouter.post("/workout", auth, async (req, res) => {
  try {
    const { title, description, time, weekday } = req.body;

    if (!title) {
      return res.status(400).send({
        status: "error",
        message: "Please provide all required fields (title)",
        data: [],
      });
    }

    const model = { title, description, time, weekday };

    const result = await createWorkout(model);

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(201).send(result);
  } catch (error) {
    console.error("Error adding workout:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.workout,
    });
  }
});

// PUT WORKOUT
workoutRouter.put("/workout", auth, async (req, res) => {
  try {
    const { id, title, description, time, weekday } = req.body;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Workout ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    if (!title) {
      return res.status(400).send({
        status: "error",
        message: "At least one field (title) must be provided for update",
        data: [],
      });
    }

    const model = { id, title, description, time, weekday };

    const result = await updateWorkout(model);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error updating workout:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.workout,
    });
  }
});

// GET WORKOUT BY ID
workoutRouter.get("/workout/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Workout ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await getWorkoutById(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching workout:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// DELETE WORKOUT
workoutRouter.delete("/workout/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Workout ID is required",
        data: {},
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await deleteWorkout(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting workout:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.workout,
    });
  }
});

export default workoutRouter;

import express from "express";
import { getWorkouts } from "../../handlers/workouts/workouts.handler.js";

const workoutsRouter = express.Router();

// Get
workoutsRouter.get("/workouts", async (req, res) => {
  try {
    const result = await getWorkouts();

    if (result.status === "ok") {
      return res.status(200).send(result);
    }

    return res.status(500).send(result);
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return res.status(500).send({
      status: "error",
      workout: "Internal server error",
      error: error.workout,
    });
  }
});

export default workoutsRouter;

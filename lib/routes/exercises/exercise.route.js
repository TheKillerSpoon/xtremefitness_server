import express from "express";
import multer from "multer";
import {
  createExercise,
  deleteExercise,
  getExerciseById,
  updateExercise,
} from "../../handlers/exercises/exercise.handler.js";
import auth from "../../middleware/auth.middleware.js";
import { exerciseStorage } from "../../db/mcd/misc/mStorage.js";
import mongoose from "mongoose";

const exerciseRouter = express.Router();

const upload = multer({ storage: exerciseStorage });

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return false;
  }
  return true;
};

// POST EXERCISE
exerciseRouter.post(
  "/exercise",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, teaser, content } = req.body;

      if (!title || !content) {
        return res.status(400).send({
          status: "error",
          message: "Please provide all required fields",
          data: [],
        });
      }

      const model = { title, teaser, content };

      if (req.file) {
        model.image =
          process.env.SERVER_HOST + "/exercises/" + req.file.filename;
      }

      const result = await createExercise(model);

      if (!result || result.status !== "ok") {
        return res.status(500).send({
          status: "error",
          message: result.message || "Failed to add exercise",
          data: [],
        });
      }

      return res.status(201).send({ ...result });
    } catch (error) {
      console.error("Error adding exercise:", error);
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

// PUT EXERCISE
exerciseRouter.put(
  "/exercise",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const { id, title, teaser, content } = req.body;

      if (!id) {
        return res.status(400).send({
          status: "error",
          message: "Exercise ID is required",
          data: [],
        });
      }

      if (!isValidObjectId(id)) return;

      const model = { id, title, teaser, content };

      if (req.file) {
        model.image =
          process.env.SERVER_HOST + "/exercises/" + req.file.filename;
      }

      const result = await updateExercise(model);

      if (result.status === "not_found") {
        return res.status(404).send(result);
      }

      if (result.status === "error") {
        return res.status(500).send(result);
      }

      return res.status(200).send(result);
    } catch (error) {
      console.error("Error updating exercise:", error);
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

// DELETE EXERCISE
exerciseRouter.delete("/exercise/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "No ID provided",
        data: {},
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await deleteExercise(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting exercise:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET EXERCISE BY ID
exerciseRouter.get("/exercise/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Exercise ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await getExerciseById(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching exercise:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default exerciseRouter;

import express from "express";
import bcrypt from "bcryptjs";
import multer from "multer";
import auth from "../../middleware/auth.middleware.js";

import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../../handlers/users/user.handler.js";
import { userStorage } from "../../db/mcd/misc/mStorage.js";
import mongoose from "mongoose";
import userModel from "../../db/models/user.model.mjs";

const userRouter = express.Router();

const upload = multer({ storage: userStorage });

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return false;
  }
  return true;
};

// POST
userRouter.post("/user", auth, upload.single("image"), async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
      return res.status(400).send({
        status: "error",
        message: "All fields (name, email, role, password) are required",
        data: [],
      });
    }

    let picture = process.env.SERVER_HOST + "/users/no-user.jpg";
    if (req.file) {
      picture = process.env.SERVER_HOST + "/users/" + req.file.filename;
    }

    const result = await createUser({ name, email, role, password, picture });

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(201).send(result);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// PUT
userRouter.put("/user", auth, upload.single("image"), async (req, res) => {
  try {
    const { id, name, email, role, password, enrolledWorkouts, subscription } =
      req.body;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "User ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    if (
      !name &&
      !email &&
      !role &&
      !password &&
      !enrolledWorkouts &&
      !subscription &&
      !req.file
    ) {
      return res.status(400).send({
        status: "error",
        message:
          "At least one field (name, email, role, password, or picture) must be provided for update",
        data: [],
      });
    }

    const updatedUser = { id };

    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (role) updatedUser.role = role;
    if (enrolledWorkouts) updatedUser.enrolledWorkouts = enrolledWorkouts;
    if (subscription) updatedUser.subscription = subscription;

    if (password) {
      if (password.length < 6) {
        return res.status(400).send({
          status: "error",
          message: "Password must be at least 6 characters long",
          data: [],
        });
      }
      updatedUser.hashedPassword = await bcrypt.hash(password, 10);
    }

    if (req.file) {
      updatedUser.picture =
        process.env.SERVER_HOST + "/users/" + req.file.filename;
    }

    const result = await updateUser(updatedUser);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// DELETE
userRouter.delete("/user/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "User ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await deleteUser(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET By ID
userRouter.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "User ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await getUserById(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// ADD WORKOUT TO USER
userRouter.post("/user/:id/enroll", auth, async (req, res) => {
  try {
    let { workoutId, workoutIds } = req.body;

    // Tillad både workoutId (string) og workoutIds (array)
    const rawIds = Array.isArray(workoutIds)
      ? workoutIds
      : workoutId
      ? [workoutId]
      : [];

    if (rawIds.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "workoutId or workoutIds is required",
      });
    }

    // Valider & kast til ObjectId
    const ids = rawIds
      .filter((id) => mongoose.Types.ObjectId.isValid(id))
      .map((id) => new mongoose.Types.ObjectId(id));

    if (ids.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "No valid workout ids provided" });
    }

    const user = await userModel
      .findByIdAndUpdate(
        req.params.id,
        { $addToSet: { enrolledWorkouts: { $each: ids } } },
        { new: true, runValidators: true }
      )
      .populate("enrolledWorkouts");

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    return res.json({
      status: "ok",
      message: "Workout(s) added to user!",
      user,
    });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
});

// DELETE WORKOUT FROM USER
userRouter.delete("/user/:id/enroll/:workoutId", auth, async (req, res) => {
  try {
    const user = await userModel
      .findByIdAndUpdate(
        req.params.id,
        { $pull: { enrolledWorkouts: req.params.workoutId } },
        { new: true }
      )
      .populate("enrolledWorkouts");

    if (!user)
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    res.json({
      status: "ok",
      message: "Workout blev slettet fra brugeren!",
      user,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// GET USER WORKOUTS
userRouter.get("/user/:id/workouts", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "User ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await getUserById(id);
    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result.data.enrolledWorkouts);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default userRouter;

import express from "express";
import multer from "multer";
import {
  createSubscription,
  deleteSubscription,
  getSubscriptionById,
  updateSubscription,
} from "../../handlers/subscriptions/subscription.handler.js";
import auth from "../../middleware/auth.middleware.js";
import { subscriptionStorage } from "../../db/mcd/misc/mStorage.js";
import mongoose from "mongoose";

const subscriptionRouter = express.Router();

const upload = multer({ storage: subscriptionStorage });

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return false;
  }
  return true;
};

// POST SUBSCRIPTION
subscriptionRouter.post(
  "/subscription",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, list, price } = req.body;

      if (!title) {
        return res.status(400).send({
          status: "error",
          message: "Please provide all required fields",
          data: [],
        });
      }

      const model = { title, list, price };

      if (req.file) {
        model.image =
          process.env.SERVER_HOST + "/subscriptions/" + req.file.filename;
      }

      const result = await createSubscription(model);

      if (!result || result.status !== "ok") {
        return res.status(500).send({
          status: "error",
          message: result.message || "Failed to add subscription",
          data: [],
        });
      }

      return res.status(201).send({ ...result });
    } catch (error) {
      console.error("Error adding subscription:", error);
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

// PUT SUBSCRIPTION
subscriptionRouter.put(
  "/subscription",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const { id, title, list, price } = req.body;

      if (!id) {
        return res.status(400).send({
          status: "error",
          message: "Subscription ID is required",
          data: [],
        });
      }

      if (!isValidObjectId(id)) return;

      const model = { id, title, list, price };

      if (req.file) {
        model.image =
          process.env.SERVER_HOST + "/subscriptions/" + req.file.filename;
      }

      const result = await updateSubscription(model);

      if (result.status === "not_found") {
        return res.status(404).send(result);
      }

      if (result.status === "error") {
        return res.status(500).send(result);
      }

      return res.status(200).send(result);
    } catch (error) {
      console.error("Error updating subscription:", error);
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

// DELETE SUBSCRIPTION
subscriptionRouter.delete("/subscription/:id", auth, async (req, res) => {
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

    const result = await deleteSubscription(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting subscription:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET SUBSCRIPTION BY ID
subscriptionRouter.get("/subscription/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Subscription ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await getSubscriptionById(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default subscriptionRouter;

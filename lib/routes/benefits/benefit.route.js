import express from "express";
import multer from "multer";
import {
  createBenefit,
  deleteBenefit,
  getBenefitById,
  updateBenefit,
} from "../../handlers/benefits/benefit.handler.js";
import auth from "../../middleware/auth.middleware.js";
import { benefitStorage } from "../../db/mcd/misc/mStorage.js";
import mongoose from "mongoose";

const benefitRouter = express.Router();

const upload = multer({ storage: benefitStorage });

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return false;
  }
  return true;
};

// POST BENEFIT
benefitRouter.post(
  "/benefit",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).send({
          status: "error",
          message: "Please provide all required fields",
          data: [],
        });
      }

      const model = { title, content };

      if (req.file) {
        model.image =
          process.env.SERVER_HOST + "/benefits/" + req.file.filename;
      }

      const result = await createBenefit(model);

      if (!result || result.status !== "ok") {
        return res.status(500).send({
          status: "error",
          message: result.message || "Failed to add benefit",
          data: [],
        });
      }

      return res.status(201).send({ ...result });
    } catch (error) {
      console.error("Error adding benefit:", error);
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

// PUT BENEFIT
benefitRouter.put(
  "/benefit",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const { id, title, content } = req.body;

      if (!id) {
        return res.status(400).send({
          status: "error",
          message: "Benefit ID is required",
          data: [],
        });
      }

      if (!isValidObjectId(id)) return;

      const model = { id, title, content };

      if (req.file) {
        model.image =
          process.env.SERVER_HOST + "/benefits/" + req.file.filename;
      }

      const result = await updateBenefit(model);

      if (result.status === "not_found") {
        return res.status(404).send(result);
      }

      if (result.status === "error") {
        return res.status(500).send(result);
      }

      return res.status(200).send(result);
    } catch (error) {
      console.error("Error updating benefit:", error);
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

// DELETE BENEFIT
benefitRouter.delete("/benefit/:id", auth, async (req, res) => {
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

    const result = await deleteBenefit(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting benefit:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET BENEFIT BY ID
benefitRouter.get("/benefit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Benefit ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await getBenefitById(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching benefit:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default benefitRouter;

import express from "express";
import multer from "multer";
import {
  createService,
  deleteService,
  getServiceById,
  updateService,
} from "../../handlers/services/service.handler.js";
import auth from "../../middleware/auth.middleware.js";
import { serviceStorage } from "../../db/mcd/misc/mStorage.js";
import mongoose from "mongoose";

const serviceRouter = express.Router();

const upload = multer({ storage: serviceStorage });

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return false;
  }
  return true;
};

// POST SERVICE
serviceRouter.post(
  "/service",
  auth,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, teaser, content } = req.body;
      if (!title || !teaser || !content) {
        return res.status(400).send({
          status: "error",
          message: "Please provide all required fields",
          data: [],
        });
      }

      const model = { title, teaser, content };

      // 🎯 Brug req.files, ikke req.file/req.icon
      const imageFile = req.files?.image?.[0];
      const iconFile = req.files?.icon?.[0];

      if (imageFile) {
        model.image = `${process.env.SERVER_HOST}/services/${imageFile.filename}`;
      }
      if (iconFile) {
        model.icon = `${process.env.SERVER_HOST}/services/service_icons/${iconFile.filename}`;
      }

      const result = await createService(model);
      if (!result || result.status !== "ok") {
        return res.status(500).send({
          status: "error",
          message: result?.message || "Failed to add service",
          data: [],
        });
      }

      return res.status(201).send({ ...result });
    } catch (error) {
      console.error("Error adding service:", error);
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

// PUT SERVICE
serviceRouter.put(
  "/service",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const { id, title, teaser, content } = req.body;

      if (!id) {
        return res.status(400).send({
          status: "error",
          message: "Service ID is required",
          data: [],
        });
      }

      if (!isValidObjectId(id)) return;

      const model = { id, title, teaser, content };

      if (req.file) {
        model.image =
          process.env.SERVER_HOST + "/services/" + req.file.filename;
      }

      if (req.icon) {
        model.icon =
          process.env.SERVER_HOST +
          "/services/service_icons/" +
          req.icon.filename;
      }

      const result = await updateService(model);

      if (result.status === "not_found") {
        return res.status(404).send(result);
      }

      if (result.status === "error") {
        return res.status(500).send(result);
      }

      return res.status(200).send(result);
    } catch (error) {
      console.error("Error updating service:", error);
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

// DELETE SERVICE
serviceRouter.delete("/service/:id", auth, async (req, res) => {
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

    const result = await deleteService(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting service:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET SERVICE BY ID
serviceRouter.get("/service/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Service ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await getServiceById(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching service:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default serviceRouter;

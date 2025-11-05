import express from "express";
import multer from "multer";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  updateBlog,
} from "../../handlers/blogs/blog.handler.js";
import auth from "../../middleware/auth.middleware.js";
import { blogStorage } from "../../db/mcd/misc/mStorage.js";
import mongoose from "mongoose";

const blogRouter = express.Router();

const upload = multer({ storage: blogStorage });

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return false;
  }
  return true;
};

// POST BLOG
blogRouter.post("/blog", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, teaser, content, author } = req.body;

    if (!title || !content) {
      return res.status(400).send({
        status: "error",
        message: "Please provide all required fields",
        data: [],
      });
    }

    const model = { title, teaser, content, author };

    if (req.file) {
      model.image = process.env.SERVER_HOST + "/blogs/" + req.file.filename;
    }

    const result = await createBlog(model);

    if (!result || result.status !== "ok") {
      return res.status(500).send({
        status: "error",
        message: result.message || "Failed to add blog",
        data: [],
      });
    }

    return res.status(201).send({ ...result });
  } catch (error) {
    console.error("Error adding blog:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// PUT BLOG
blogRouter.put("/blog", auth, upload.single("image"), async (req, res) => {
  try {
    const { id, title, teaser, content, author } = req.body;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Blog ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const model = { id, title, teaser, content, author };

    if (req.file) {
      model.image = process.env.SERVER_HOST + "/blogs/" + req.file.filename;
    }

    const result = await updateBlog(model);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// DELETE BLOG
blogRouter.delete("/blog/:id", auth, async (req, res) => {
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

    const result = await deleteBlog(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET BLOG BY ID
blogRouter.get("/blog/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Blog ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await getBlogById(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default blogRouter;

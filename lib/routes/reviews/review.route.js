import express from "express";
import auth from "../../middleware/auth.middleware.js";
import {
  createReview,
  deleteReview,
  getReviewById,
  updateReview,
} from "../../handlers/reviews/review.handler.js";
import mongoose from "mongoose";

const reviewRoute = express.Router();

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return false;
  }
  return true;
};

// POST REVIEW
reviewRoute.post("/review", auth, async (req, res) => {
  try {
    const { author, content, position } = req.body;

    if (!author || !content) {
      return res.status(400).send({
        status: "error",
        message:
          "Please provide all required fields (author, content, position)",
        data: [],
      });
    }

    const model = { author, content, position };

    const result = await createReview(model);

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(201).send(result);
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.review,
    });
  }
});

// PUT REVIEW
reviewRoute.put("/review", auth, async (req, res) => {
  try {
    const { id, author, content, position } = req.body;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Review ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    if (!author && !content) {
      return res.status(400).send({
        status: "error",
        message:
          "At least one field (name, email, or description) must be provided for update",
        data: [],
      });
    }

    const model = { id, author, content, position };

    const result = await updateReview(model);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error updating review:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// DELETE REVIEW
reviewRoute.delete("/review/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Review ID is required",
        data: {},
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await deleteReview(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting review:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET REVIEW BY ID
reviewRoute.get("/review/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Review ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await getReviewById(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching review:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default reviewRoute;

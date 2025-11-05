import express from "express";
import { getReviews } from "../../handlers/reviews/reviews.handler.js";

const reviewsRouter = express.Router();

// Get
reviewsRouter.get("/reviews", async (req, res) => {
  try {
    const result = await getReviews();

    if (result.status === "ok") {
      return res.status(200).send(result);
    }

    return res.status(500).send(result);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default reviewsRouter;

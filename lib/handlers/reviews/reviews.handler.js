import dbConnect from "../../db/dbConnect.js";
import reviewModel from "../../db/models/review.model.mjs";

export const getReviews = async () => {
  try {
    await dbConnect();

    const reviews = await reviewModel.find({});

    return {
      status: "ok",
      review: "Reviews fetched successfully",
      data: reviews,
    };
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return {
      status: "error",
      review: "An error occurred while fetching reviews",
      data: [],
      error: error.review,
    };
  }
};

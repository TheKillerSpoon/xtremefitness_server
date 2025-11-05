import dbConnect from "../../db/dbConnect.js";
import subscriptionModel from "../../db/models/subscription.model.mjs";

export const getSubscriptions = async () => {
  try {
    await dbConnect();

    const subscriptions = await subscriptionModel.find({});

    return {
      status: "ok",
      message: "Subscriptions fetched successfully",
      data: subscriptions,
    };
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return {
      status: "error",
      message: "An error occurred while fetching subscriptions",
      data: [],
      error: error.message,
    };
  }
};

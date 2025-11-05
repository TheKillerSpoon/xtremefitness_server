import dbConnect from "../../db/dbConnect.js";
import subscriptionModel from "../../db/models/subscription.model.mjs";
import { deleteSubscriptionImage } from "../file.handler.js";

// CREATE SUBSCRIPTION
export const createSubscription = async (body) => {
  try {
    await dbConnect();

    if (!body.image) {
      body.image = `${process.env.SERVER_HOST}/subscriptions/no-image.png`;
    }

    const data = await subscriptionModel.create(body);

    return {
      status: "ok",
      message: "Subscription created successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error adding subscription:", error);

    return {
      status: "error",
      message: "An error occurred while creating the subscription",
      data: [],
      error: error.message,
    };
  }
};

// UPDATE SUBSCRIPTION
export const updateSubscription = async (body) => {
  try {
    await dbConnect();

    const subscription = await subscriptionModel.findById(body.id);
    if (!subscription) {
      return {
        status: "not_found",
        message: "Subscription not found",
        data: [],
      };
    }

    if (body.image) {
      await deleteSubscriptionImage(subscription.image);
    }

    const updatedSubscription = await subscriptionModel.findByIdAndUpdate(
      body.id,
      body,
      {
        new: true,
      }
    );

    return {
      status: "ok",
      message: "Subscription updated successfully",
      data: updatedSubscription,
    };
  } catch (error) {
    console.error("Error updating subscription:", error);
    return {
      status: "error",
      message: "An error occurred while updating the subscription",
      data: [],
      error: error.message,
    };
  }
};

// DELETE SUBSCRIPTION
export const deleteSubscription = async (id) => {
  try {
    await dbConnect();

    const subscription = await subscriptionModel.findById(id);
    if (!subscription) {
      return {
        status: "not_found",
        message: "Subscription not found",
        data: [],
      };
    }

    if (subscription.image) {
      await deleteSubscriptionImage(subscription.image);
    }

    const deletedSubscription = await subscriptionModel.findByIdAndDelete(id);

    return {
      status: "ok",
      message: "Subscription deleted successfully",
      data: deletedSubscription,
    };
  } catch (error) {
    console.error("Error deleting subscription:", error);
    return {
      status: "error",
      message: "An error occurred while deleting the subscription",
      data: [],
      error: error.message,
    };
  }
};

// GET SUBSCRIPTION BY ID
export const getSubscriptionById = async (id) => {
  try {
    await dbConnect();

    const subscription = await subscriptionModel.findById(id);

    if (!subscription) {
      return {
        status: "not_found",
        message: "Subscription not found",
        data: [],
      };
    }

    return {
      status: "ok",
      message: "Subscription fetched successfully",
      data: subscription,
    };
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return {
      status: "error",
      message: "An error occurred while fetching the subscription",
      data: [],
      error: error.message,
    };
  }
};

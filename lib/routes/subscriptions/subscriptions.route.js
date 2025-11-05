import express from "express";
import { getSubscriptions } from "../../handlers/subscriptions/subscriptions.handler.js";

const subscriptionsRouter = express.Router();

// GET SUBSCRIPTIONS
subscriptionsRouter.get("/subscriptions", async (req, res) => {
  try {
    const data = await getSubscriptions();

    if (data.status === "ok") {
      return res.status(200).send({ message: data.message, data: data.data });
    }

    return res.status(500).send({ message: data.message, data: [] });
  } catch (error) {
    console.error("Error in GET /subscriptions:", error);
    return res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default subscriptionsRouter;

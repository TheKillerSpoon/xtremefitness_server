import express from "express";
import { getServices } from "../../handlers/services/services.handlers.js";

const servicesRouter = express.Router();

// GET SERVICES
servicesRouter.get("/services", async (req, res) => {
  try {
    const data = await getServices();

    if (data.status === "ok") {
      return res.status(200).send({ message: data.message, data: data.data });
    }

    return res.status(500).send({ message: data.message, data: [] });
  } catch (error) {
    console.error("Error in GET /services:", error);
    return res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default servicesRouter;

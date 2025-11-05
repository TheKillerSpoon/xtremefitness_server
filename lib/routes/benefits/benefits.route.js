import express from "express";
import { getBenefits } from "../../handlers/benefits/benefits.handler.js";

const benefitsRouter = express.Router();

// GET BENEFITS
benefitsRouter.get("/benefits", async (req, res) => {
  try {
    const data = await getBenefits();

    if (data.status === "ok") {
      return res.status(200).send({ message: data.message, data: data.data });
    }

    return res.status(500).send({ message: data.message, data: [] });
  } catch (error) {
    console.error("Error in GET /benefits:", error);
    return res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default benefitsRouter;

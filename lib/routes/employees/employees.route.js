import express from "express";
import { getEmployees } from "../../handlers/employees/employees.handler.js";

const employeesRouter = express.Router();

// Get
employeesRouter.get("/employees", async (req, res) => {
  try {
    const result = await getEmployees();

    if (result.status === "ok") {
      return res.status(200).send(result);
    }

    return res.status(500).send(result);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default employeesRouter;

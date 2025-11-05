import express from "express";
import multer from "multer";
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../handlers/employees/employee.handler.js";
import auth from "../../middleware/auth.middleware.js";
import { employeeStorage } from "../../db/mcd/misc/mStorage.js";
import mongoose from "mongoose";

const employeeRouter = express.Router();

const upload = multer({ storage: employeeStorage });

const isValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`Invalid ObjectId: ${id}`);
    return false;
  }
  return true;
};

// POST EMPLOYEE
employeeRouter.post(
  "/employee",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, area } = req.body;

      if (!name) {
        return res.status(400).send({
          status: "error",
          message: "Please provide all required fields",
          data: [],
        });
      }

      const model = { name, area };

      if (req.file) {
        model.image =
          process.env.SERVER_HOST + "/employees/" + req.file.filename;
      }

      const result = await createEmployee(model);

      if (!result || result.status !== "ok") {
        return res.status(500).send({
          status: "error",
          message: result.message || "Failed to add employee",
          data: [],
        });
      }

      return res.status(201).send({ ...result });
    } catch (error) {
      console.error("Error adding employee:", error);
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

// PUT EMPLOYEE
employeeRouter.put(
  "/employee",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const { id, name, text } = req.body;

      if (!id) {
        return res.status(400).send({
          status: "error",
          message: "Employee ID is required",
          data: [],
        });
      }

      if (!isValidObjectId(id)) return;

      const model = { id, name, text };

      if (req.file) {
        model.image =
          process.env.SERVER_HOST + "/employees/" + req.file.filename;
      }

      const result = await updateEmployee(model);

      if (result.status === "not_found") {
        return res.status(404).send(result);
      }

      if (result.status === "error") {
        return res.status(500).send(result);
      }

      return res.status(200).send(result);
    } catch (error) {
      console.error("Error updating employee:", error);
      return res.status(500).send({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  }
);

// DELETE EMPLOYEE
employeeRouter.delete("/employee/:id", auth, async (req, res) => {
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

    const result = await deleteEmployee(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET EMPLOYEE BY ID
employeeRouter.get("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Employee ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await getEmployeeById(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching employee:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default employeeRouter;

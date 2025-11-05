import dbConnect from "../../db/dbConnect.js";
import serviceModel from "../../db/models/service.model.mjs";
import { deleteServiceImage } from "../file.handler.js";

// CREATE SERVICE
export const createService = async (body) => {
  try {
    await dbConnect();

    if (!body.image) {
      body.image = `${process.env.SERVER_HOST}/services/no-image.png`;
    }

    const data = await serviceModel.create(body);

    return {
      status: "ok",
      message: "Service created successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error adding service:", error);

    return {
      status: "error",
      message: "An error occurred while creating the service",
      data: [],
      error: error.message,
    };
  }
};

// UPDATE SERVICE
export const updateService = async (body) => {
  try {
    await dbConnect();

    const service = await serviceModel.findById(body.id);
    if (!service) {
      return {
        status: "not_found",
        message: "Service not found",
        data: [],
      };
    }

    if (body.image) {
      await deleteServiceImage(service.image);
    }

    const updatedService = await serviceModel.findByIdAndUpdate(body.id, body, {
      new: true,
    });

    return {
      status: "ok",
      message: "Service updated successfully",
      data: updatedService,
    };
  } catch (error) {
    console.error("Error updating service:", error);
    return {
      status: "error",
      message: "An error occurred while updating the service",
      data: [],
      error: error.message,
    };
  }
};

// DELETE SERVICE
export const deleteService = async (id) => {
  try {
    await dbConnect();

    const service = await serviceModel.findById(id);
    if (!service) {
      return {
        status: "not_found",
        message: "Service not found",
        data: [],
      };
    }

    if (service.image) {
      await deleteServiceImage(service.image);
    }

    const deletedService = await serviceModel.findByIdAndDelete(id);

    return {
      status: "ok",
      message: "Service deleted successfully",
      data: deletedService,
    };
  } catch (error) {
    console.error("Error deleting service:", error);
    return {
      status: "error",
      message: "An error occurred while deleting the service",
      data: [],
      error: error.message,
    };
  }
};

// GET SERVICE BY ID
export const getServiceById = async (id) => {
  try {
    await dbConnect();

    const service = await serviceModel.findById(id);

    if (!service) {
      return {
        status: "not_found",
        message: "Service not found",
        data: [],
      };
    }

    return {
      status: "ok",
      message: "Service fetched successfully",
      data: service,
    };
  } catch (error) {
    console.error("Error fetching service:", error);
    return {
      status: "error",
      message: "An error occurred while fetching the service",
      data: [],
      error: error.message,
    };
  }
};

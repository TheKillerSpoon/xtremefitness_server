import dbConnect from "../../db/dbConnect.js";
import serviceModel from "../../db/models/service.model.mjs";

export const getServices = async () => {
  try {
    await dbConnect();

    const services = await serviceModel.find({});

    return {
      status: "ok",
      message: "Services fetched successfully",
      data: services,
    };
  } catch (error) {
    console.error("Error fetching services:", error);
    return {
      status: "error",
      message: "An error occurred while fetching services",
      data: [],
      error: error.message,
    };
  }
};

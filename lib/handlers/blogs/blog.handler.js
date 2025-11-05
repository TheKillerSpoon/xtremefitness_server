import dbConnect from "../../db/dbConnect.js";
import blogModel from "../../db/models/blog.model.mjs";
import { deleteBlogImage } from "../file.handler.js";

// CREATE BLOG
export const createBlog = async (body) => {
  try {
    await dbConnect();

    if (!body.image) {
      body.image = `${process.env.SERVER_HOST}/blogs/no-image.png`;
    }

    const data = await blogModel.create(body);

    return {
      status: "ok",
      message: "Blog created successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error adding blog:", error);

    return {
      status: "error",
      message: "An error occurred while creating the blog",
      data: [],
      error: error.message,
    };
  }
};

// UPDATE BLOG
export const updateBlog = async (body) => {
  try {
    await dbConnect();

    const blog = await blogModel.findById(body.id);
    if (!blog) {
      return {
        status: "not_found",
        message: "Blog not found",
        data: [],
      };
    }

    if (body.image) {
      await deleteBlogImage(blog.image);
    }

    const updatedBlog = await blogModel.findByIdAndUpdate(body.id, body, {
      new: true,
    });

    return {
      status: "ok",
      message: "Blog updated successfully",
      data: updatedBlog,
    };
  } catch (error) {
    console.error("Error updating blog:", error);
    return {
      status: "error",
      message: "An error occurred while updating the blog",
      data: [],
      error: error.message,
    };
  }
};

// DELETE BLOG
export const deleteBlog = async (id) => {
  try {
    await dbConnect();

    const blog = await blogModel.findById(id);
    if (!blog) {
      return {
        status: "not_found",
        message: "Blog not found",
        data: [],
      };
    }

    if (blog.image) {
      await deleteBlogImage(blog.image);
    }

    const deletedBlog = await blogModel.findByIdAndDelete(id);

    return {
      status: "ok",
      message: "Blog deleted successfully",
      data: deletedBlog,
    };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return {
      status: "error",
      message: "An error occurred while deleting the blog",
      data: [],
      error: error.message,
    };
  }
};

// GET BLOG BY ID
export const getBlogById = async (id) => {
  try {
    await dbConnect();

    const blog = await blogModel.findById(id);

    if (!blog) {
      return {
        status: "not_found",
        message: "Blog not found",
        data: [],
      };
    }

    return {
      status: "ok",
      message: "Blog fetched successfully",
      data: blog,
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return {
      status: "error",
      message: "An error occurred while fetching the blog",
      data: [],
      error: error.message,
    };
  }
};

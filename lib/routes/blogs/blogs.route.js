import express from "express";
import { getBlogs } from "../../handlers/blogs/blogs.handler.js";

const blogsRouter = express.Router();

// GET BLOGS
blogsRouter.get("/blogs", async (req, res) => {
  try {
    const data = await getBlogs();

    if (data.status === "ok") {
      return res.status(200).send({ message: data.message, data: data.data });
    }

    return res.status(500).send({ message: data.message, data: [] });
  } catch (error) {
    console.error("Error in GET /blogs:", error);
    return res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default blogsRouter;

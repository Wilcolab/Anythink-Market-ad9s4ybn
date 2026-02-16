const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
// Route to retrieve all comments for a specific post using the postId query parameter.
//Hey GitHub copilot, can you help me with this code? I want to create a route to get all comments for a specific post. The post ID will be passed as a query parameter. The route should return a JSON response with the comments.
  try {
    const commentId = req.params.id;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }

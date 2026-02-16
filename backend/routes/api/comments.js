/**
 * @fileoverview Express router for handling comments API endpoints.
 * Provides functionality to retrieve comments for a specific post and delete comments.
 */

/**
 * GET /comments
 * Retrieves all comments for a specific post.
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.postId - The ID of the post to fetch comments for (required)
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON array of comments or error response
 * @throws {Error} Returns 400 if postId is missing
 * @throws {Error} Returns 500 if database query fails
 */

/**
 * DELETE /comments/:id
 * Deletes a comment by its ID.
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.id - The ID of the comment to delete (required)
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Success message or error response
 * @throws {Error} Returns 404 if comment is not found
 * @throws {Error} Returns 500 if database operation fails
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

//Hey Github copilot, can you help me with this code? I want to create a route to get all comments for a specific post. The post ID will be passed as a query parameter. The route should return a JSON response with the comments.

router.get("/comments", async (req, res) => {
  try {
    const postId = req.query.postId;
    if (!postId) {
      return res.status(400).json({ error: "Post ID is required" });
    }

    const comments = await Comment.find({ postId: postId });
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//add another endpoint for deleting a comment
router.delete("/comments/:id", async (req, res) => {
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
});
const Express = require("express");
const User = require("../models/user");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const createApiResponse = require("../common/uniformResponse");
const authenticateUser = require("../middleware/authenticateUser");
const {
	validateAddComment,
	handleValidationErrors,
} = require("../common/validation");

const Router = Express.Router();

Router.post(
	"/add-comment",
	authenticateUser,
	validateAddComment,
	handleValidationErrors,
	async (req, res, next) => {
		try {
			const { comment, postId } = req.body;

			if (!req.user.existingUser) {
				const response = createApiResponse(false, null, "User not found", 404);
				return res.status(404).json(response);
			}

			const existingPost = await Post.findById(postId);

			if (!existingPost) {
				const response = createApiResponse(false, null, "Post not found", 404);
				return res.status(404).json(response);
			}

			const newComment = {
				comment,
				user: req.user.id,
			};

			existingPost.comments.push(newComment);

			await existingPost.save();

			const response = createApiResponse(true, existingPost);

			res.json(response);
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" });
		}
	}
);

module.exports = Router;

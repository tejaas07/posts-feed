const Express = require("express");
const Post = require("../models/post");
const createApiResponse = require("../common/uniformResponse");
const authenticateUser = require("../middleware/authenticateUser");
const {
	handleValidationErrors,
	validateSearchQuery,
} = require("../common/validation");

const Router = Express.Router();

Router.get(
	"/search",
	authenticateUser,
	validateSearchQuery,
	handleValidationErrors,
	async (req, res) => {
		try {
			const { query } = req.query;

			// Search for posts
			const posts = await Post.find({
				$or: [
					{ text: { $regex: query, $options: "i" } },
					{ "comments.comment": { $regex: query, $options: "i" } },
				],
			}).populate("user");
			const response = createApiResponse(true, posts);

			res.json(response);
		} catch (error) {
			console.error("Error searching:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}
);

module.exports = Router;

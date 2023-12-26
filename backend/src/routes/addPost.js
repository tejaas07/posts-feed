const Express = require("express");
const Post = require("../models/post");
const createApiResponse = require("../common/uniformResponse");
const authenticateUser = require("../middleware/authenticateUser");
const {
	handleValidationErrors,
	validateAddPost,
} = require("../common/validation");

const Router = Express.Router();

Router.post(
	"/add-post",
	authenticateUser,
	validateAddPost,
	handleValidationErrors,
	async (req, res, next) => {
		try {
			const { text } = req.body;

			if (!req.user.existingUser) {
				const response = createApiResponse(false, null, "User not found", 404);
				return res.status(404).json(response);
			}

			const newPost = new Post({
				text,
				user: req.user.id,
			});

			await newPost.save();

			const response = createApiResponse(true, newPost);

			res.json(response);
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}
);

module.exports = Router;

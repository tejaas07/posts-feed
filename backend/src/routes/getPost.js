const Express = require("express");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const post = require("../models/post");
const authenticateUser = require("../middleware/authenticateUser");
const createApiResponse = require("../common/uniformResponse");

const Router = Express.Router();

Router.get("/get-post", authenticateUser, async (req, res, next) => {
	try {
		if (!req.user.existingUser) {
			const response = createApiResponse(false, null, "User not found", 404);
			return res.status(404).json(response);
		}

		const posts = await post
			.find()
			.populate({
				path: "comments.user",
				model: "User",
				select: "userName",
			})
			.populate("user", "userName");

		const response = createApiResponse(true, posts);

		res.json(response);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});
module.exports = Router;

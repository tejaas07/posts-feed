const { body, validationResult } = require("express-validator");
const { query } = require("express-validator");
const mongoose = require("mongoose");

const validateSignIn = [
	body("userName")
		.trim()
		.isLength({ min: 3 })
		.withMessage("Username must be at least 3 characters long"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];

const validateCreateUser = [
	body("name").trim().notEmpty().withMessage("Name is required"),
	body("userName")
		.trim()
		.isLength({ min: 3 })
		.withMessage("Username must be at least 3 characters long"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];

const validateAddPost = [
	body("text")
		.trim()
		.isLength({ min: 1 })
		.withMessage("Text must not be empty"),
];

const validateAddComment = [
	body("comment")
		.trim()
		.isLength({ min: 1 })
		.withMessage("Comment must not be empty"),
	body("postId")
		.custom((value) => mongoose.Types.ObjectId.isValid(value))
		.withMessage("Invalid user ID"),
];

const validateSearchQuery = [
	query("query")
		.trim()
		.isLength({ min: 1 })
		.withMessage("Query must not be empty"),
];

const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

module.exports = {
	validateCreateUser,
	validateSignIn,
	validateAddPost,
	validateAddComment,
	validateSearchQuery,
	handleValidationErrors,
};

const Express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const createApiResponse = require("../common/uniformResponse");
const {
	validateSignIn,
	handleValidationErrors,
} = require("../common/validation");

const Router = Express.Router();

Router.post(
	"/signin",
	validateSignIn,
	handleValidationErrors,
	async (req, res, next) => {
		try {
			const { userName, password } = req.body;

			// Check if the user with the provided username exists
			const exisitingUser = await User.findOne({ userName });
			if (!exisitingUser) {
				return res.status(401).json({ error: "Invalid username or password" });
			}

			// Compare the provided password with the hashed password in the database
			const passwordMatch = await bcrypt.compare(
				password,
				exisitingUser.password
			);
			if (!passwordMatch) {
				return res.status(401).json({ error: "Invalid username or password" });
			}

			const user = exisitingUser.toObject();
			delete user.password;

			// If the username and password are correct, generate a JWT token
			const token = jwt.sign({ userId: exisitingUser._id }, "your-secret-key", {
				expiresIn: "1h",
			});

			const response = createApiResponse(true, { token, user });

			// Send the token in the response
			res.json(response);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}
);

module.exports = Router;

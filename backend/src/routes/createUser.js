const Express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const createApiResponse = require("../common/uniformResponse");
const jwt = require("jsonwebtoken");
const {
	validateCreateUser,
	handleValidationErrors,
} = require("../common/validation");

const Router = Express.Router();

Router.post(
	"/add-user",
	validateCreateUser,
	handleValidationErrors,
	async (req, res, next) => {
		const { name, userName, password } = req.body;
		try {
			let existingUser = await User.findOne({ userName: userName });

			if (existingUser) {
				const response = createApiResponse(
					false,
					null,
					"Username already taken",
					404
				);
				return res.status(404).json(response);
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			// Create a new user
			const newUser = new User({
				name,
				userName,
				password: hashedPassword,
			});

			// Save the user to the database
			await newUser.save();

			const token = jwt.sign({ userId: newUser._id }, "your-secret-key", {
				expiresIn: "1h",
			});

			const userWithoutPassword = newUser.toObject();
			delete userWithoutPassword.password;

			const response = createApiResponse(true, { token, userWithoutPassword });

			res.json(response);
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}
);

module.exports = Router;

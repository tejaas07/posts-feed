const jwt = require("jsonwebtoken");
const user = require("../models/user");

async function authenticateUser(req, res, next) {
	// Get the token from the request header
	const token = req.header("Authorization");

	// Check if the token is present
	if (!token) {
		return res.status(401).json({ error: "Unauthorized - No token provided" });
	}

	try {
		// Verify the token
		const decoded = jwt.verify(token.split(" ")[1], "your-secret-key"); // Replace 'your-secret-key' with your actual secret key

		// Attach the decoded user to the request for further use in routes
		req.user = { id: decoded.userId };

		const existingUser = await user.findById({ _id: req.user.id });

		if (existingUser) {
			req.user.existingUser = true;
		} else {
			req.user.existingUser = false;
		}

		// Proceed to the next middleware or route handler
		next();
	} catch (error) {
		console.error(error);
		return res.status(401).json({ error: "Unauthorized - Invalid token" });
	}
}

module.exports = authenticateUser;

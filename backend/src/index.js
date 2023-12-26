const mongoose = require("mongoose");
const app = require("./app");

const start = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://ktejas18:TXwgBUAy1VCIUvjN@post-feed.d18b7sw.mongodb.net/?retryWrites=true&w=majority"
		);
	} catch (error) {
		console.log(error);
		return;
	}

	app.listen(8000, () => {
		console.log("Connected to db on 8000");
	});
};

start();

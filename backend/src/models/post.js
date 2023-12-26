const mongoose = require("mongoose");

const schema = mongoose.Schema;

const commentSchema = new schema({
	comment: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

const postSchema = new schema(
	{
		text: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		comments: {
			type: [commentSchema],
			default: [],
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);

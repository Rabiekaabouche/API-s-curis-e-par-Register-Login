const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		min: 6,
		max: 256,
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const users = mongoose.model("Users", userSchema);

module.exports = users;

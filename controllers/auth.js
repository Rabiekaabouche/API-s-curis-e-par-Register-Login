const User = require("../models/user");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegistration = async (req, res) => {
	const { error } = registerValidation(req.body);
	const { email, password } = req.body;
	if (error)
		return res.render("register", { error: error.details[0].message, email });

	const userExist = await User.findOne({ email: email });
	if (userExist) {
		return res.render("register", {
			error: "Email already exists! Please try again with valid email",
			email,
		});
	} else {
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		const newUser = new User({
			email,
			password: hashPassword,
		});
		try {
			const savedUser = await newUser.save();
			req.flash("success_msg", "You are now registered and can log in");
			res.redirect("/login");
		} catch (error) {
			res.status(400).send(error);
		}
	}
};

const loginUser = async (req, res) => {
	const { error } = loginValidation(req.body);
	const { email, password } = req.body;
	if (error)
		return res.render("login", { error: error.details[0].message, email });

	const userExist = await User.findOne({ email: email });
	if (!userExist) {
		return res.render("login", {
			error: "The email is incorrect , please try again",
			email: email,
		});
	}
	const { _id } = userExist;
	const matchPassword = await bcrypt.compare(password, userExist.password);

	if (!matchPassword) {
		return res.render("login", {
			error: "The Password is incorrect , please try again",
			email: email,
		});
	}

	const token = jwt.sign({ id: _id, emailUser: email }, process.env.TOKEN_KEY);
	res.cookie("token", token, { httpOnly: true });

	res.redirect("/users");
};

const logoutUser = (req, res) => {
	res.clearCookie("token");
	res.redirect("/");
};
exports.userRegistration = userRegistration;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;

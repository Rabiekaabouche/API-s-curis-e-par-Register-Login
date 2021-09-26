const jwt = require("jsonwebtoken");

module.exports = {
	forwardAuthenticated: (req, res, next) => {
		if (!req.cookies.token) return next();
		res.redirect("/users");
	},
	verifyToken: (req, res, next) => {
		const token = req.cookies.token;
		if (!token) {
			req.flash("error_msg", "You should login to see that resources");
			return res.redirect("login");
		}
		try {
			const verified = jwt.verify(token, process.env.TOKEN_KEY);
			req.user = verified;
			next();
		} catch (error) {
			res.status(400).send(error);
		}
	},
};

const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth");
const User = require("../models/user");

router.get("/", verifyToken, async (req, res) => {
	const users = await User.find();
	res.render("dashbord", { users: users, user: req.user });
});

module.exports = router;

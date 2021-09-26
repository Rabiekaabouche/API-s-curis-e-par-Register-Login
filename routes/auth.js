const router = require("express").Router();
const {
	userRegistration,
	loginUser,
	logoutUser,
} = require("../controllers/auth");
const { forwardAuthenticated } = require("../middlewares/auth");

router.get("/", (req, res) => {
	res.render("home");
});

router.get("/login", forwardAuthenticated, (req, res) => {
	res.render("login");
});

router.get("/register", forwardAuthenticated, (req, res) => {
	res.render("register");
});

router.post("/register", userRegistration);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;

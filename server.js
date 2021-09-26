const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const expressLayouts = require("express-ejs-layouts");
const authRoute = require("./routes/auth");
const flash = require("connect-flash");
const session = require("express-session");
const dashRoute = require("./routes/dashboard");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: true,
	})
);
app.use(flash());

app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use("/", authRoute);
app.use("/users", dashRoute);

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
	.then(() => {
		console.log("Connected to Database");
	})
	.catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

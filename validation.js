const Joi = require("@hapi/joi");

const registerValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).required().email().label("Email").messages({
			"string.email": "{{#label}} must be valid!",
			"string.min": "{{#label}} is too short!",
			"any.required": "{{#label}} is required!",
		}),
		password: Joi.string().min(6).required().label("Password").messages({
			"string.min": "{{#label}} must be at least 6 characters!",
			"any.required": "{{#label}} is required!",
		}),
		password2: Joi.any()
			.equal(Joi.ref("password"))
			.required()
			.label("Confirm password")
			.messages({
				"any.only": "{{#label}} does not match!",
			}),
	});
	return schema.validate(data);
};

const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).required().email().label("Email").messages({
			"string.email": "{{#label}} must be valid!",
			"string.min": "{{#label}} is too short!",
			"any.required": "{{#label}} is required!",
		}),
		password: Joi.string().min(6).required().label("Password").messages({
			"string.min": "{{#label}} must be at least 6 characters!",
			"any.required": "{{#label}} is required!",
		}),
	});
	return schema.validate(data);
};

exports.registerValidation = registerValidation;
exports.loginValidation = loginValidation;

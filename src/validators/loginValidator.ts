import Joi from "joi";

const loginValidator = Joi.object({
  email: Joi.string()
    .pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Please enter a valid email address in the format: name@domain.extension",
    }),
  password: Joi.string()
    .min(3)
    .required()
    .messages({ "string.min": "Password must be at least 3 characters long" }),
});
export { loginValidator };


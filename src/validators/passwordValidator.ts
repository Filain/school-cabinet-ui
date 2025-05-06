import Joi from "joi";

const passwordValidator = Joi.object({
  password: Joi.string().min(3).required().messages({ "string.min": "Password must be at least 3 characters long" }),
  confirm_password: Joi.string().valid(Joi.ref("password")).required(),
});
export { passwordValidator };

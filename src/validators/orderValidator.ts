import Joi from "joi";

const orderValidator = Joi.object({
  group: Joi.string().min(2).max(30).required().messages({ "string.min": "Must be at least 2 characters" }),
  name: Joi.string()
    .min(2)
    .max(30)
    .required()
    .pattern(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]+$/u)
    .messages({
      "string.pattern.base": "Just letters",
    }),
  surname: Joi.string()
    .min(2)
    .max(30)
    .required()
    .pattern(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]+$/u)
    .messages({
      "string.pattern.base": "Just letters",
    }),
  email: Joi.string()
    .pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
    .required()

    .messages({
      "string.pattern.base": "Required format: name@domain.extension",
    }),
  phone: Joi.string()
    .pattern(/^(0\d{9}|8\(\d{3}\)\s\d{3}-\d)$/)
    .required()

    .messages({
      "string.pattern.base": "Required format: 0XXXXXXXXX",
    }),
  age: Joi.number().min(13).max(71).allow(null, "", 0),
  sum: Joi.number().allow(null, ""),
  already_paid: Joi.number().allow(null, ""),
  status: Joi.string().optional().allow(""),
  course: Joi.string().optional().allow(""),
  course_type: Joi.string().optional().allow(""),
  course_format: Joi.string().optional().allow(""),
  utm: Joi.string().optional().allow(""),
  msg: Joi.string().optional().allow(""),
});
export { orderValidator };

import Joi from "joi";

const userValidator = Joi.object({
  email: Joi.string()
    .pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
    .messages({
      "string.pattern.base": "Required format: name@domain.extension",
      "string.empty": "Field is required",
    }),
  name: Joi.string()
    .min(2)
    .max(30)
    .pattern(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]+$/u)
    .messages({
      "string.pattern.base": "Just letters",
      "string.min": "Must be at least 2 characters",
      "string.max": "Must be at most 30 characters",
      "string.empty": "Field is required",
    }),
  surname: Joi.string()
    .min(2)
    .max(30)
    .pattern(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]+$/u)
    .messages({
      "string.pattern.base": "Just letters",
      "string.min": "Must be at least 2 characters",
      "string.max": "Must be at most 30 characters",
      "string.empty": "Field is required",
    }),
});
export { userValidator };

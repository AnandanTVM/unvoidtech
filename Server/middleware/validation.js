const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(10).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(10).required(),
});
const blogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const registerValidation = (req, res, next) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    res.json({ status: false, Message: error.details[0].message });
  } else {
    next();
  }
};
const loginValidation = (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    res.json({ status: false, Message: error.details[0].message });
  } else {
    next();
  }
};

const blogValidation = (req, res, next) => {
  const { error, value } = blogSchema.validate(req.body);
  if (error) {
    res.json({ status: false, Message: error.details[0].message });
  } else {
    next();
  }
};
module.exports = {
  registerValidation,
  loginValidation,
  blogValidation,
};

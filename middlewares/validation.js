const Joi = require("joi");
const { HttpError } = require("../middlewares");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const validateAddContact = (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw new HttpError(400, error.message);
  }
  next();
};

module.exports = {
  validateAddContact,
  addSchema
};
import Joi from 'joi'

export const create_reporter_validation = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  address: Joi.string().required(),
});

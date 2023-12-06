import Joi from 'joi'

export const agency_validation = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().required(),
});

export const department_validation = Joi.object({
  name: Joi.string().required(),
  acronym: Joi.string().required(),
});
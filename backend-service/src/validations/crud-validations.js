import Joi from 'joi'

export const agency_validation = Joi.object({
  name: Joi.string().required(),
});
import Joi from 'joi'

export const create_reporter_validation = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  address: Joi.object({
    country: Joi.string(),
    fullAddress: Joi.string(),
    countryCode: Joi.string(),
    longitude: Joi.number(),
    latitude: Joi.number(),
    localGovt: Joi.string(),
    state: Joi.string(),
  }).required(),
});


export const create_report_validation = Joi.object({
  title: Joi.string().required(),
  reportTypeId: Joi.string().required(),
  reporterId: Joi.string().required(),
  description: Joi.string().required(),
  dateOfIncidence: Joi.string().required(),
  intervention: Joi.boolean(),
  agencyId: Joi.string(),
  resolved: Joi.string(),
  reoccurence: Joi.boolean(),
  address: Joi.object({
    country: Joi.string(),
    fullAddress: Joi.string(),
    countryCode: Joi.string(),
    longitude: Joi.number(),
    latitude: Joi.number(),
    localGovt: Joi.string(),
    state: Joi.string(),
    userTypedAddress: Joi.string(),
  }).required(),
});

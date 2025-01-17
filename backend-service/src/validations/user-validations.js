import Joi from 'joi'

export const user_create_validation = Joi.object({
  fullName: Joi.string().required(),
  department: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  role: Joi.string().required(),
  responder: Joi.string(),
  agency: Joi.string(),
  invitationalId: Joi.string(),
});

export const user_login_validation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
});

export const change_password_validation = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

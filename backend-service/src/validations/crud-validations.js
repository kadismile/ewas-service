import Joi from "joi";

export const agency_validation = Joi.object({
  name: Joi.string().required(),
});

export const department_validation = Joi.object({
  name: Joi.string().required(),
  acronym: Joi.string().required(),
});

export const article_validation = Joi.object({
  title: Joi.string().required(),
  postContent: Joi.string().required(),
  category: Joi.string().required(),
  featureImage: Joi.string(),
});

import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const GameSpec = {
  title: Joi.string().required(),
  age: Joi.number().required(),
  min_players: Joi.number().required(),
  max_players: Joi.number().required(),
  duration: Joi.number().required(),
  description: Joi.string().required(),
};

export const LocationSpec = {
  title: Joi.string().required(),
  x: Joi.number().optional(),
  y: Joi.number().optional(),
};
/**
 * Joi validation schemas for User, UserCredentials, Game, and Location entities.
 * Defines required and optional fields for each entity to ensure data integrity.
 *
 * @module ValidationSchemas
 * @author Peter Fortune
 * @date 04/03/2024
 */


import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object());

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number()
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserCredentialsSpec = Joi.object().keys({
  email: Joi.string().email().example("homer@simpson.com").required(),
  password: Joi.string().example("secret").required(),
}).label("UserCredentials");

export const GameSpec = Joi.object().keys({
  title: Joi.string().example("Eclipse").required(),
  age: Joi.number().example(12).required(),
  minPlayers: Joi.number().example(2).required(),
  maxPlayers: Joi.number().example(4).required(),
  duration: Joi.number().example(30).required(),
  description: Joi.string().example("Explore distant galaxies in this exciting space adventure. Work together to navigate challenges and win!").optional(),
  category: Joi.string().example("Strategy").optional(),
}).label("GameDetails");

export const GameArray = Joi.array().items(GameSpec).label("GameArray");

export const LocationSpec = Joi.object().keys({
  title: Joi.string().example("Central Park").required(),
  category: Joi.string().example("Outdoor").required(),
  x: Joi.number().example(40.785091).optional(), 
  y: Joi.number().example(-73.968285).optional(),
}).label("LocationDetails");

export const LocationArray = Joi.array().items(LocationSpec).label("LocationArray");
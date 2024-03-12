/**
 * Joi validation schemas for User, UserCredentials, Game, and Location entities.
 * Defines required and optional fields for each entity to ensure data integrity.
 *
 * @module ValidationSchemas
 * @author Peter Fortune
 * @date 04/03/2024
 */

import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    permission: Joi.string().example("ADMIN"),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const GameSpec = Joi.object()
  .keys({
    title: Joi.string().example("Eclipse").required(),
    age: Joi.number().example(12).optional(),
    minPlayers: Joi.number().example(2).optional(),
    maxPlayers: Joi.number().example(4).optional(),
    duration: Joi.number().example(30).optional(),
    description: Joi.string().example("Explore distant galaxies in this exciting space adventure. Work together to navigate challenges and win!").optional(),
    category: Joi.string().example("Strategy").optional(),
    locationid: IdSpec,
  })
  .label("Game");

export const GameSpecPlus = GameSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("GamePlus");

export const GameArraySpec = Joi.array().items(GameSpecPlus).label("GameArray");

export const LocationSpec = Joi.object()
  .keys({
    title: Joi.string().example("Central Park").required(),
    category: Joi.string().example("Outdoor").required(),
    x: Joi.number().example(40.785091).optional(), 
    y: Joi.number().example(-73.968285).optional(),
    userid: IdSpec,
    games: GameArraySpec,
  })
  .label("Location");

export const LocationSpecPlus = LocationSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("LocationPlus");

export const LocationArraySpec = Joi.array().items(LocationSpecPlus).label("LocationArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");

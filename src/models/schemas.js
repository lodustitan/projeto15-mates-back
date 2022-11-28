import Joi from "joi";


export const gameUserSchema = Joi.object({
    user_id: Joi.string().min(4).required(),
    game_id: Joi.number().min(1).required()
});

export const addCartByUserIDSchema = Joi.object({
    user_id: Joi.string().min(4).required(),
    game_id: Joi.number().min(1).required()
});
export const userSchema = Joi.object({
    user_id: Joi.string().min(4).required()
})
export const userschema1 = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
    cell: Joi.number().min(9).required(),
  });
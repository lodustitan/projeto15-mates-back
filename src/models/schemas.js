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
import Joi from "joi";

export const gameByIDSchema = Joi.object({
    id: Joi.number().min(1).required()
});
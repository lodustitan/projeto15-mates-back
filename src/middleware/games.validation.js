/* Schemas */
import { 
    gameUserSchema,
    addCartByUserIDSchema,
    userSchema
} from "../models/schemas.js";



export async function getGameByIDValidate(req, res, next){
    let { game_id } = req.params;
    let { user_id } = req.headers;

    game_id = Number(game_id);

    try {
        const validSchema = gameUserSchema.validate({game_id, user_id});
        
        if(validSchema.error) {
            const errorList = validSchema.error.details.map( detail => detail );
            res.status(401).send(errorList);
            return;
        } else {
            res.locals.game_id = game_id;
            res.locals.user_id = user_id;
        }
    } catch(err) {
        console.error(err);
        res.status(500);
        return;
    }

    next();
}

export async function addCartByIDValidate(req, res, next){
    let { user_id, game_id } = req.body;

    try {
        const validSchema = addCartByUserIDSchema.validate({user_id, game_id}, {abortEarly: false});
        
        if(validSchema.error) {
            const errorList = validSchema.error.details.map( detail => detail );
            res.status(401).send(errorList);
            return;
        } else {
            res.locals.user_id = user_id;
            res.locals.game_id = game_id;
            next();
        }
    } catch(err) {
        console.error(err);
        res.status(500);
        return;
    }
}
export async function verifyUserId(req, res, next){
    let { user_id } = req.headers;

    try {
        const validSchema = userSchema.validate({user_id}, {abortEarly: false});
        
        if(validSchema.error) {
            const errorList = validSchema.error.details.map( detail => detail );
            res.status(401).send(errorList);
            return;
        } else {
            res.locals.user_id = user_id;
            next();
        }
    } catch(err) {
        console.error(err);
        res.status(500);
        return;
    }
}
export async function buyGamesOnCartValidate(req, res, next){
    let { user_id } = req.body;

    try{
        const validSchema = userSchema.validate({ user_id })

           if(validSchema.error) {
            const errorList = validSchema.error.details.map( detail => detail );
            res.status(401).send(errorList);
            return;
        } else {
            res.locals.user_id = user_id;
            next();
        }
    } catch(err) {
        console.error(err);
        res.status(500);
        return;
    }
}
import { gameByIDSchema } from "../models/schemas.js";

export async function getGameByIDValidate(req, res, next){
    let { id } = req.params;

    try {
        const validSchema = gameByIDSchema.validate({id});
        
        if(validSchema.error) {
            const errorList = validSchema.error.details.map( detail => detail );
            res.status(401).send(errorList);
            return;
        } else {
            res.locals.id = id;
        }
    } catch(err) {
        console.error(err);
        res.status(500);
        return;
    }

    next();
}
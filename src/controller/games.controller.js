import { getDataGameByID } from "../repository/repo.js";

export async function getGameByID(req, res){
    let { id } = res.locals;
    id = Number(id);

    const doc = await getDataGameByID(id);

    if(!doc){
        res.status(404).send("game's not found");
    } else {
        res.status(201).send(doc);
    }
}
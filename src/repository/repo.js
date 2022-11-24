import { db } from "./database.js";

export async function getDataGameByID(id){
    if(typeof id !== "number") return false;
    const query = await db.collection("games").findOne({id});

    if(query === null){
        return false;
    }else{
        return query;
    }
}
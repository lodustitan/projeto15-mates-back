import { db } from "./database.js";
import { ObjectId } from "mongodb";

export async function getDataGameByID_repo(game_id, user_id){
    if(typeof user_id !== "string") return false;
    if(typeof game_id !== "number") return false;

    const newObj = new ObjectId(user_id)

    const queryGame = await db.collection("games").findOne({id: game_id});
    const queryIHave = await db.collection("biblioteca").findOne({user_id: newObj, game_id});

    const realQuery = {...queryGame}
    realQuery.iHave = false;

    if(queryIHave){
        realQuery.iHave = true;
    }

    if(realQuery === null){
        return false;
    }else{
        return realQuery;
    }
}
export async function addCartByUserID_repo(user_id,  game_id){
    if(typeof user_id !== "string") return false;
    if(typeof game_id !== "number") return false;
    
    const newObj = new ObjectId(user_id);
    const query = await db.collection("cart").findOne({user_id: newObj, game_id});
    
    if(query === null){
        const game = await db.collection("games").findOne({id: game_id});
        await db.collection("cart").insertOne({user_id: newObj, game_id, price: game.price, name: game.name, poster: game.poster});
        return true;
    }else{
        return false;
    }    
}
export async function getCartByUserID_repo(user_id){
    if(typeof user_id !== "string") return false;

    const newObj = new ObjectId(user_id);
    const query = await db.collection("cart").find({user_id: newObj}).toArray();
    
    if(query === null){
        return false;
    }else{
        return query;
    }    
}
export async function removeCartByUserID_repo(user_id, game_id){
    if(typeof user_id !== "string") return false;
    if(typeof game_id !== "number") return false;
    
    const newObj = new ObjectId(user_id);
    const query = await db.collection("cart").findOne({user_id: newObj, game_id});
    
    if(query){
        await db.collection("cart").deleteOne({user_id: newObj, game_id});
        return true;
    }else{
        return false;
    } 
}
export async function addBibliotecaGameByID_repo(user_id, game_id){
    if(typeof user_id !== "string") return false;
    
    try{
        const newObj = new ObjectId(user_id);
        const query = await db.collection("cart").find({user_id: newObj}).toArray();
        
        for(let el of query){
            console.log(el);
            await db.collection("biblioteca").insertOne({user_id: el.user_id, game_id: el.game_id, price: el.price, name: el.name, poster: el.poster});
            await db.collection("cart").deleteOne({user_id: newObj, game_id: el.game_id})
        }
        return true
    }catch(err){
        console.error(err);
    }
}

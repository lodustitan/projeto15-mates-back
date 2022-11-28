import connectMongoDB from "./database.js";
import { ObjectId } from "mongodb";

export async function getDataGameByID_repo(game_id, user_id){
    if(typeof user_id !== "string") return false;
    if(typeof game_id !== "number") return false;

    const db = await connectMongoDB();


    const myID = await db.collection("sessions").findOne({token: user_id });

    const userByToken = new ObjectId(myID.userId);
    const queryGame = await db.collection("games").findOne({id: game_id});
    const queryIHave = await db.collection("biblioteca").findOne({user_id: userByToken, game_id});

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
    
    const db = await connectMongoDB();

    const myID = await db.collection("sessions").findOne({token: user_id });

    const userByToken = new ObjectId(myID.userId);
    const query = await db.collection("cart").findOne({user_id: userByToken, game_id});
    
    if(query === null){
        const game = await db.collection("games").findOne({id: game_id});
        await db.collection("cart").insertOne({user_id: userByToken, game_id, price: game.price, name: game.name, poster: game.poster});
        return true;
    }else{
        return false;
    }    
}
export async function getCartByUserID_repo(user_id){
    if(typeof user_id !== "string") return false;

    const db = await connectMongoDB();
    
    const myID = await db.collection("sessions").findOne({token: user_id });

    const userByToken = new ObjectId(myID.userId);
    const query = await db.collection("cart").find({user_id: userByToken}).toArray();
    
    if(query === null){
        return false;
    }else{
        return query;
    }    
}
export async function removeCartByUserID_repo(user_id, game_id){
    if(typeof user_id !== "string") return false;
    if(typeof game_id !== "number") return false;
    
    const db = await connectMongoDB();
    
    const myID = await db.collection("sessions").findOne({token: user_id });

    const userByToken = new ObjectId(myID.userId);
    const query = await db.collection("cart").findOne({user_id: userByToken, game_id});
    
    if(query){
        await db.collection("cart").deleteOne({user_id: userByToken, game_id});
        return true;
    }else{
        return false;
    } 
}
export async function addBibliotecaGameByID_repo(user_id, game_id){
    if(typeof user_id !== "string") return false;
    
    try{
        const db = await connectMongoDB();
        
        const myID = await db.collection("sessions").findOne({token: user_id });

        const userByToken = new ObjectId(myID.userId);
        const query = await db.collection("cart").find({user_id: userByToken}).toArray();
        
        for(let el of query){
            console.log(el);
            await db.collection("biblioteca").insertOne({user_id: el.user_id, game_id: el.game_id, price: el.price, name: el.name, poster: el.poster});
            await db.collection("cart").deleteOne({user_id: userByToken, game_id: el.game_id})
        }
        return true
    }catch(err){
        console.error(err);
    }
}
export async function getMyGames_repo(user_id){
    if(typeof user_id !== "string") return false;
    
    try{
        const db = await connectMongoDB();
        
        const myID = await db.collection("sessions").findOne({token: user_id });    

        const userByToken = new ObjectId(myID.userId);
        const query = await db.collection("biblioteca").find({user_id: userByToken}).toArray();
        
        return query;
    }catch(err){
        console.error(err);
    }
}
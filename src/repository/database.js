import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

try {
    await client.connect();
    db = client.db("MaTes");
}catch(err){
    console.error(err);
}

export { db };
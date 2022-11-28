import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;


export default async function connectMongoDB() {
    try {
      await mongoClient.connect();
        db = mongoClient.db("MaTes");
        console.log("conectado ao servidor");
      } catch (err) {
        console.log(err);
      }
      return db;
    }

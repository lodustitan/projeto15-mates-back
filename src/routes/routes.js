/* Tools */
import express from "express";
import cors from "cors";

/* Middlewares */
import { 
    getGameByIDValidate, 
    addCartByIDValidate, 
    getCartByIDValidate,
    buyGamesOnCartValidate
} from "../middleware/games.validation.js";

/* Controllers */
import { 
    getGameByID, 
    addCartByID, 
    getCartByID, 
    buyGamesOnCart
} from "../controller/games.controller.js";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/game/:game_id", getGameByIDValidate, getGameByID);
app.post("/cart", addCartByIDValidate, addCartByID);
app.get("/cart", getCartByIDValidate, getCartByID);
app.post("/checkout", buyGamesOnCartValidate, buyGamesOnCart)

export default app;
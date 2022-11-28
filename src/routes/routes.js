/* Tools */
import express, { Router }  from "express";

/* Middlewares */
import { 
    getGameByIDValidate, 
    addCartByIDValidate, 
    verifyUserId,
    buyGamesOnCartValidate
} from "../middleware/games.validation.js";

/* Controllers */
import { 
    getGameByID, 
    addCartByID, 
    getCartByID, 
    buyGamesOnCart,
    getMyGames
} from "../controller/games.controller.js";
import {
    SignIn,
    SignUp,
    gamesCollection
} from "../controller/authController.js";



const routes = Router();

routes.get("/game/:game_id", getGameByIDValidate, getGameByID);
routes.get("/mygames", verifyUserId, getMyGames);
routes.post("/cart", addCartByIDValidate, addCartByID);
routes.get("/cart", verifyUserId, getCartByID);
routes.post("/checkout", buyGamesOnCartValidate, buyGamesOnCart);
routes.post("/signup", SignUp);
routes.post("/signin", SignIn);
routes.get("/games", gamesCollection);

export default routes;
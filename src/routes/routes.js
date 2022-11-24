/* Tools */
import express from "express";
import cors from "cors";

/* Middlewares */
import { getGameByIDValidate } from "../middleware/games.validation.js";

/* Controllers */
import { getGameByID } from "../controller/games.controller.js";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/game/:id", getGameByIDValidate, getGameByID);

export default app;
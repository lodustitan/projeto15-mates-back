import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import routes from "./routes/routes.js";

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Express connected on port ${port}`);
});
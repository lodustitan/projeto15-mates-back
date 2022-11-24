import app from "./routes/routes.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;


app.listen(port, () => {
    console.log(`Express connected on port ${port}`);
});
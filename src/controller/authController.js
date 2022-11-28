import { MongoClient } from "mongodb";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import connectMongoDB from "../repository/database.js";
import { userschema1 } from "../models/schemas.js";

export async function SignUp(req, res) {
  const { name, email, password, cell } = req.body;
  const data = { name, email, password, cell };

  const { error } = userschema1.validate(data, { abortEarly: false });
  const cryptPassword = bcrypt.hashSync(password, 10);
  
  if (error) {
    console.log(error);
    res.status(500).send(
      validate.error.details.map((err) => {
        return err.message;
      })
    );
    return;
  }
  const user = { name, email, password: cryptPassword,cell };

  try {
    const database = await connectMongoDB();
    const registeredUser = await database
      .collection("users")
      .findOne({ email });
    if (registeredUser) {
      return res.status(409).send("E-mail já cadastrado. Escolha outro!");
    }
    await database.collection("users").insertOne(user);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}


export async function SignIn(req, res) {
  const { email, password } = req.body;
  try {
    const database = await connectMongoDB();
    const registeredUser = await database
      .collection("users")
      .findOne({ email });
    if (!registeredUser) {
      return res.status(404).send("Usuário não encontrado");
    }
    const returnPassword = bcrypt.compareSync(
      password,
      registeredUser.password
    );
    if (!returnPassword) {
      return res.status(401).send("E-mail ou senha inválidos");
    }
    const token = uuid();
    await database.collection("sessions").insertOne({
      token,
      userId: registeredUser._id,
    });

    res.status(200).send({ token, user: registeredUser.name });
  } catch (err) {
    console.log(err);
    res.status(409).send(err);
  }
}


export async function gamesCollection(req, res) {
  try {
    const database = await connectMongoDB();
    const gameslist = await database.collection("games").find().toArray();

    res.status(200).send(gameslist);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
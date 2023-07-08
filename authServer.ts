import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");

dotenv.config();

const app: Express = express();
const port = process.env.AUTH_PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/login", bodyParser.json(), (req: Request, res: Response) => {
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15s",
  });
  res.json({ accessToken: accessToken });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

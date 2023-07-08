import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get(
  "/posts",
  bodyParser.json(),
  authenticate,
  (req: Request, res: Response) => {
    const posts = [
      {
        username: req.body.user.name,
        title: "Post-1",
      },
      {
        username: req.body.user.name,
        title: "Post-2",
      },
    ];
    res.json(posts);
  }
);

function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (token == null) {
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.body.user = user;
    next();
  });
}

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

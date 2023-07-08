"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.get("/posts", bodyParser.json(), authenticate, (req, res) => {
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
});
function authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    if (token == null) {
        return res.sendStatus(403);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
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

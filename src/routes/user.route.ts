import express from "express";
import UserController from "../controllers/user.controller";

const Router = express.Router();

Router.post("/api/user", UserController.createUser);

export default Router;

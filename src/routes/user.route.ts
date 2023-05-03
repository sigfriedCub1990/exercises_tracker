import express from "express";
import UserController from "../controllers/user.controller";

const Router = express.Router();

Router.post("/api/users", UserController.createUser);
Router.get("/api/users", UserController.getUsers);

export default Router;

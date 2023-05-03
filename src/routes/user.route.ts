import express from "express";
import UserController from "../controllers/user.controller";

const Router = express.Router();

Router.post("/api/users", UserController.createUser);
Router.get("/api/users", UserController.getUsers);
Router.post("/api/users/:_id/exercises", UserController.createExercise);
Router.get("/api/users/:_id/logs", UserController.getUserLogs);

export default Router;

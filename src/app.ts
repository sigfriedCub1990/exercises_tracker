import { Request, Response, NextFunction } from "express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

// eslint-disable-next-line
app.use((req, res, next) => {
  res
    .status(404)
    .json({ message: "This is not the route you're looking for." });
});

// eslint-disable-next-line
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(500).json({ error: "Something broke" });
});

export default app;

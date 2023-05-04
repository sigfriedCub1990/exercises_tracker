import { Request, Response, NextFunction } from "express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Db connection
import connectDb from "./db";

// Routes
import { userRouter } from "./routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mongoURI = process.env.MONGO_URI || "";
connectDb(mongoURI);

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method === "POST") {
    console.log(`${req.headers["content-type"]}`);
  }
  next();
});

app.use(userRouter);

// eslint-disable-next-line
app.use((req: Request, res: Response, next: NextFunction) => {
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

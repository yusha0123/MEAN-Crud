import { config } from "dotenv";
import express from "express";
import cors from "cors";
import connectDb from "./utils/db";
import router from "./router";
import morgan from "morgan";

config();

const app = express();
const Port = process.env.PORT || 3000;
connectDb();

app.use(
  cors({
    origin: process.env.origin,
  })
);
app.use(morgan("combined"));
app.use(express.json());
app.get("/", (_, res) => res.send("Hello from Express!"));
app.use("/api", router());

app.listen(Port, () => console.log(`Server listening on port: ${Port}`));

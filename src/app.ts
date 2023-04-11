import "express-async-errors";
import express from "express";
import "reflect-metadata";
import cors from "cors";
import { userRoutes } from "./routes/user/routes";
import { loginRoutes } from "./routes/login/routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/login", loginRoutes);

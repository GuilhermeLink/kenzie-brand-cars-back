import "express-async-errors";
import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/user/routes";
import { loginRoutes } from "./routes/login/routes";
import { announceRoutes } from "./routes/announce/routes";
import { handleError } from "./errors/handleErrors";
import { filterRoutes } from "./routes/filter/routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/login", loginRoutes);
app.use("/announce", announceRoutes);
app.use ("/filter", filterRoutes)

app.use(handleError);

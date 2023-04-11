import "express-async-errors";
import express from "express";
import "reflect-metadata";
import cors from "cors";

export const app = express();

app.use(cors());
app.use(express.json());

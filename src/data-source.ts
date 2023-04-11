import "dotenv/config";
import "reflect-metadata";

import { DataSource, DataSourceOptions } from "typeorm";

import { User } from "./entities/entities/user";
import { Address } from "./entities/entities/address";
import { Announce } from "./entities/entities/announce";
import { Comment } from "./entities/entities/comment";
import { Color } from "./entities/entities/color";
import { Fuel } from "./entities/entities/fuel";
import { Gallery } from "./entities/entities/galery";
import { Mark } from "./entities/entities/mark";
import { Model } from "./entities/entities/model";

const dataSourceConfig = (): DataSourceOptions => {
  return {
    type: "postgres",
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT!),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    logging: false,
    entities: [
      User,
      Address,
      Announce,
      Comment,
      Color,
      Fuel,
      Gallery,
      Mark,
      Model,
    ],
    migrations: ["src/migrations/*.ts"],
    synchronize: false,
  };
};

export const AppDataSource = new DataSource(dataSourceConfig());

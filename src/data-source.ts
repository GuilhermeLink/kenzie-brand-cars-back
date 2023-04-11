import "dotenv/config";
import "reflect-metadata";

import { DataSource, DataSourceOptions } from "typeorm";

import path from "path";

const dataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, "./entities/*.{js,ts}");
  const migrationsPath: string = path.join(__dirname, "./migrations/*.{js,ts}");

  return {
    type: "postgres",
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT!),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    logging: false,
    entities: [entitiesPath],
    migrations: [migrationsPath],
    synchronize: false,
  };
};

export const AppDataSource = new DataSource(dataSourceConfig());

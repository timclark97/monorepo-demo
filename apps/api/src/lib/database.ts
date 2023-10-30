import { DataSource } from "typeorm";

import User from "../components/User/UserEntity";
import Company from "../components/Company/CompanyEntity";
import Match from "../components/Match/MatchEntity";

export const PostgresSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: true,
  synchronize: true,
  entities: [User, Company, Match],
});

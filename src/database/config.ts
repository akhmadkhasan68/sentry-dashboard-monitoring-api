import { config } from "../config/config";
import { DataSource } from "typeorm";

export default new DataSource({
  type: 'mysql',
  host: config.database.host,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  logging: false,
  entities: ["src/database/entities/**/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  synchronize: false,
});

import knex, { Knex } from "knex";
import { ENV } from "../../config/env.js";

export const db: Knex = knex({
  client: "sqlite3",
  connection: { filename: ENV.SQLITE_FILE },
  useNullAsDefault: true,
});

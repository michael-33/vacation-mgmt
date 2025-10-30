/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const dbFile = process.env.SQLITE_FILE || "./data/app.sqlite";

module.exports = {
  client: "sqlite3",
  connection: { filename: dbFile },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname, "src/infrastructure/db/migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "src/infrastructure/db/seeds"),
  },
};

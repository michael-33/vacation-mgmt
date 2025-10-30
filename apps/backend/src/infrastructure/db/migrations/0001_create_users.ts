import type { Knex } from "knex";

// create users table
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("role").notNullable();
  });
}

// define how to undo the migration
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}

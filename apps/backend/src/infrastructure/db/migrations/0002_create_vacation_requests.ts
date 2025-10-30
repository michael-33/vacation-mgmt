import { Knex } from "knex";
import { RequestStatus } from "common";

// create vacation_requests table
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("vacation_requests", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE"); // link to users table
    table.date("start_date").notNullable();
    table.date("end_date").notNullable();
    table.string("reason").nullable();
    table.string("status").defaultTo(RequestStatus.PENDING);
    table.string("comments").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("vacation_requests");
}

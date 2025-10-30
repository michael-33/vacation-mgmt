import { Knex } from "knex";
import { Role, RequestStatus } from "common";

// add initial data to the db
export async function seed(knex: Knex): Promise<void> {
  // clear existing data to avoid duplicates when reseeding
  await knex("vacation_requests").del();
  await knex("users").del();

  // insert 3 users: 2 requesters and 1 validator
  const [req1Id, req2Id, valId] = await knex("users")
    .insert([
      { name: "Alice", role: Role.REQUESTER },
      { name: "Bob", role: Role.REQUESTER },
      { name: "Charlie", role: Role.VALIDATOR },
    ])
    .returning("id");

  // insert a few sample vacation requests
  await knex("vacation_requests").insert([
    {
      user_id: req1Id,
      start_date: "2025-11-10",
      end_date: "2025-11-15",
      reason: "Family trip",
      status: RequestStatus.PENDING,
    },
    {
      user_id: req2Id,
      start_date: "2025-12-01",
      end_date: "2025-12-05",
      reason: "Conference",
      status: RequestStatus.APPROVED,
      comments: "Enjoy your trip!",
    },
  ]);
}

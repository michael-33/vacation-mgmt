import type { Knex } from "knex";
import { Role, RequestStatus } from "common";

// add initial data to the db
export async function seed(knex: Knex): Promise<void> {
  await knex.transaction(async (trx) => {
    // clear existing data to avoid duplicates when reseeding
    await trx("vacation_requests").del();
    await trx("users").del();
    // reset auto-increment ids
    try {
      await trx.raw(
        "DELETE FROM sqlite_sequence WHERE name IN ('users','vacation_requests')"
      );
    } catch {}

    // insert 3 users: 2 requesters and 1 validator
    const inserted = await trx("users")
      .insert([
        { name: "Alice", role: Role.REQUESTER },
        { name: "Bob", role: Role.REQUESTER },
        { name: "Charlie", role: Role.VALIDATOR },
      ])
      .returning("id");
    const [req1Id, req2Id, valId] = (inserted as any[]).map((r) =>
      typeof r === "object" && r !== null ? (r as any).id : r
    );

    // insert a few sample vacation requests
    await trx("vacation_requests").insert([
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
  });
}

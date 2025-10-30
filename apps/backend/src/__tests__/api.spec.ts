import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import path from "node:path";
import knexFactory from "knex";
import { createApp } from "../../src/app.js";
import { seed as seedData } from "../../src/infrastructure/db/seeds/000_seed_users_and_requests.js";

// minimal knex config mirroring knexfile for the test process
const knexConfig = {
  client: "sqlite3",
  connection: {
    filename:
      process.env.SQLITE_FILE ??
      path.resolve(__dirname, "../../data/app.sqlite"),
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname, "../infrastructure/db/migrations"),
  },
};

const db = knexFactory(knexConfig as any);
const app = createApp();

// prepare schema + data once before tests
beforeAll(async () => {
  await db.migrate.latest();
  await seedData(db as any);
});

// health endpoint sanity check
describe("health", () => {
  it("returns ok", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});

// basic authn/z behavior with header-based user context
describe("auth/roles", () => {
  it("requires user header", async () => {
    const res = await request(app).get("/api/v1/requests");
    expect(res.status).toBe(401);
  });

  it("forbids requester on validator endpoint", async () => {
    const res = await request(app)
      .get("/api/v1/requests")
      .set("x-user-id", "1");
    expect(res.status).toBe(403);
  });

  it("allows validator", async () => {
    const res = await request(app)
      .get("/api/v1/requests")
      .set("x-user-id", "3");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);
  });
});

// create -> approve/reject by validator
describe("request flow", () => {
  it("requester can create a request", async () => {
    const res = await request(app)
      .post("/api/v1/requests")
      .set("x-user-id", "1")
      .send({ startDate: "2025-01-10", endDate: "2025-01-12", reason: "test" });
    expect(res.status).toBe(201);
  });

  it("validator can approve a pending request", async () => {
    // fetch all requests as validator and pick a pending one
    const list = await request(app)
      .get("/api/v1/requests")
      .set("x-user-id", "3");
    const pending = (list.body.items as any[]).find(
      (i) => i.status === "PENDING"
    );
    expect(pending).toBeTruthy();
    const res = await request(app)
      .post(`/api/v1/requests/${pending.id}/approve`)
      .set("x-user-id", "3");
    expect(res.status).toBe(200);
  });

  it("validator can reject a request with comment", async () => {
    const list = await request(app)
      .get("/api/v1/requests")
      .set("x-user-id", "3");
    const pending = (list.body.items as any[]).find(
      (i) => i.status === "PENDING"
    );
    expect(pending).toBeTruthy();
    const res = await request(app)
      .post(`/api/v1/requests/${pending.id}/reject`)
      .set("x-user-id", "3")
      .send({ comment: "not eligible" });
    expect(res.status).toBe(200);
  });
});

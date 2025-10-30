import { db } from "../db/knex.js";
import { VacationRequest } from "../../domain/entities/vacation-request.js";
import { RequestStatus } from "common";

// repository functions for interacting with the vacation_requests table
export const requestRepo = {
  async create(
    data: Omit<VacationRequest, "id" | "created_at">,
  ): Promise<void> {
    await db<VacationRequest>("vacation_requests").insert(data);
  },

  async findByUserId(userId: number): Promise<VacationRequest[]> {
    return db<VacationRequest>("vacation_requests").where({ user_id: userId });
  },

  async findAll(): Promise<VacationRequest[]> {
    return db<VacationRequest>("vacation_requests").select("*");
  },

  async updateStatus(
    id: number,
    status: RequestStatus,
    comments?: string,
  ): Promise<void> {
    await db<VacationRequest>("vacation_requests")
      .where({ id })
      .update({ status, comments });
  },
};

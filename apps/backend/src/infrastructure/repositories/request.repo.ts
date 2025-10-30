import { db } from "../db/knex.js";
import { VacationRequest } from "../../domain/entities/vacation-request.js";
import { RequestStatus } from "common";

// repository functions for interacting with the vacation_requests table
export const requestRepo = {
  async create(
    data: Omit<VacationRequest, "id" | "created_at">
  ): Promise<void> {
    await db<VacationRequest>("vacation_requests").insert(data);
  },

  async findByUserId(userId: number): Promise<VacationRequest[]> {
    return db<VacationRequest>("vacation_requests").where({ user_id: userId });
  },

  async findAll(): Promise<VacationRequest[]> {
    return db<VacationRequest>("vacation_requests").select("*");
  },

  async findOverlaps(
    userId: number,
    startDate: string,
    endDate: string
  ): Promise<VacationRequest[]> {
    // overlaps if not (existing.end < start or existing.start > end)
    return db<VacationRequest>("vacation_requests")
      .where({ user_id: userId })
      .whereNotIn("status", [RequestStatus.REJECTED])
      .andWhere((qb) => {
        qb.whereNot("end_date", "<", startDate).andWhereNot(
          "start_date",
          ">",
          endDate
        );
      });
  },

  async updateStatus(
    id: number,
    status: RequestStatus,
    comments?: string
  ): Promise<void> {
    await db<VacationRequest>("vacation_requests")
      .where({ id })
      .update({ status, comments });
  },
};

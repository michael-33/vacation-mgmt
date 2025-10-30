import { RequestCreateInput } from "common";
import { z } from "zod";

// simple domain-level validation for vacation requests
export function validateVacationRequest(data: unknown): RequestCreateInput {
  const schema = z.object({
    startDate: z.string().min(1, "start date is required"),
    endDate: z.string().min(1, "end date is required"),
    reason: z.string().optional().nullable(),
  });

  return schema.parse(data);
}

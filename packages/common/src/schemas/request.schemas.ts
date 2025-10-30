import { z } from "zod";

export const RequestCreateSchema = z.object({
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  reason: z.string().optional().nullable(),
});

export type RequestCreateInput = z.infer<typeof RequestCreateSchema>;

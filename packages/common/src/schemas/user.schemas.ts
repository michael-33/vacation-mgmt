import { z } from "zod";

export const UserHeaderSchema = z.object({
  userId: z.coerce.number().int().positive(),
});

export type UserHeader = z.infer<typeof UserHeaderSchema>;

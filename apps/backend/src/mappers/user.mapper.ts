import { User } from "../domain/entities/user.js";

// converts database record to user entity
export function mapUser(row: any): User {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
  };
}

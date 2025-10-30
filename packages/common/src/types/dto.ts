import { RequestStatus } from "./status";
import { Role } from "./roles";
export interface RequestCreateDTO {
  startDate: string; // ISO date
  endDate: string; // ISO date
  reason?: string | null;
}

export interface RequestDTO {
  id: number;
  userId: number;
  startDate: string;
  endDate: string;
  reason: string | null;
  status: RequestStatus;
  comments: string | null;
  createdAt: string; // ISO timestamp
}

export interface UserDTO {
  id: number;
  name: string;
  role: Role;
}

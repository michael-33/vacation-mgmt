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
  status: "PENDING" | "APPROVED" | "REJECTED";
  comments: string | null;
  createdAt: string; // ISO timestamp
}

export interface UserDTO {
  id: number;
  name: string;
  role: "REQUESTER" | "VALIDATOR";
}

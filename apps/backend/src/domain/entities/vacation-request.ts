import { RequestStatus } from "common";

export interface VacationRequest {
  id: number;
  user_id: number;
  start_date: string;
  end_date: string;
  reason: string | null;
  status: RequestStatus;
  comments: string | null;
  created_at: string;
}

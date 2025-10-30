import { VacationRequest } from "../domain/entities/vacation-request.js";

// converts database record to VacationRequest entity
export function mapRequest(row: any): VacationRequest {
  return {
    id: row.id,
    user_id: row.user_id,
    start_date: row.start_date,
    end_date: row.end_date,
    reason: row.reason,
    status: row.status,
    comments: row.comments,
    created_at: row.created_at,
  };
}

import { requestRepo } from "../../infrastructure/repositories/request.repo.js";
import { RequestStatus } from "common";

// mark a vacation request as rejected with an optional comment
export async function rejectRequest(id: number, comment?: string) {
  await requestRepo.updateStatus(id, RequestStatus.REJECTED, comment);
}

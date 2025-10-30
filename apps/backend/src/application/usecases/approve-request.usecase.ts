import { requestRepo } from "../../infrastructure/repositories/request.repo.js";
import { RequestStatus } from "common";

// mark a vacation request as approved
export async function approveRequest(id: number) {
  await requestRepo.updateStatus(id, RequestStatus.APPROVED);
}

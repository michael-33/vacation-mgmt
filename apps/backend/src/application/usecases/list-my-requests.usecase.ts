import { requestRepo } from "../../infrastructure/repositories/request.repo.js";

// return all vacation requests created by a specific user
export async function listMyRequests(userId: number) {
  return requestRepo.findByUserId(userId);
}

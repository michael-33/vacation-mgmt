import { requestRepo } from "../../infrastructure/repositories/request.repo.js";

// return all vacation requests in the system (for validator)
export async function listAllRequests() {
  return requestRepo.findAll();
}

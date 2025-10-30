import { requestRepo } from "../../infrastructure/repositories/request.repo.js";
import { validateVacationRequest } from "../../domain/services/validation.service.js";
import { RequestStatus } from "common";

// handle the creation of a new vacation request
export async function createVacationRequest(userId: number, data: unknown) {
  const validated = validateVacationRequest(data);

  await requestRepo.create({
    user_id: userId,
    start_date: validated.startDate,
    end_date: validated.endDate,
    reason: validated.reason ?? null,
    status: RequestStatus.PENDING,
    comments: null,
  });
}

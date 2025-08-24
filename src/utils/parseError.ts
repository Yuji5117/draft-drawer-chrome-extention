import { AppError } from "@/types/errors";
import { createError } from "@/utils/createError";

export const parseError = (error: unknown): AppError => {
  if (typeof error === 'string') {
    if (error.includes('User did not approve')) {
      return createError.authCancelled();
    }
    if (error.includes('Extension context invalidated')) {
      return createError.chromeError(error);
    }
    if (error.includes('network') || error.includes('fetch')) {
      return createError.networkError();
    }
    if (error.includes('invalid-credential')) {
      return createError.authFailed(error);
    }
    return createError.unknown(error);
  }

  if (error instanceof Error) {
    return parseError(error.message);
  }

  return createError.unknown('Unknown error occurred');
};
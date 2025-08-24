export type AppErrorType =
  | "AUTH_CANCELLED"
  | "AUTH_FAILED"
  | "CHROME_ERROR"
  | "NETWORK_ERROR"
  | "UNKNOWN_ERROR";

export type AppError = {
  type: AppErrorType;
  message: string;
  userMessage: string;
  retryable: boolean;
};

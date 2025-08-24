import { AppError } from "@/types/errors";

export const createError = {
  authCancelled: (): AppError => ({
    type: "AUTH_CANCELLED",
    message: "User cancelled authentication",
    userMessage: "認証がキャンセルされました。",
    retryable: true,
  }),

  authFailed: (originalMessage?: string): AppError => ({
    type: "AUTH_FAILED", 
    message: originalMessage || "Authentication failed",
    userMessage: "認証に失敗しました。再度お試しください。",
    retryable: true,
  }),

  chromeError: (originalMessage?: string): AppError => ({
    type: "CHROME_ERROR",
    message: originalMessage || "Chrome extension error", 
    userMessage: "拡張機能でエラーが発生しました。再読み込みしてください。",
    retryable: false,
  }),

  networkError: (): AppError => ({
    type: "NETWORK_ERROR",
    message: "Network connection failed",
    userMessage: "ネットワーク接続エラーです。接続を確認してください。", 
    retryable: true,
  }),

  unknown: (originalMessage?: string): AppError => ({
    type: "UNKNOWN_ERROR",
    message: originalMessage || "Unknown error",
    userMessage: "予期しないエラーが発生しました。",
    retryable: true,
  }),
};
import { useState } from "react";

import { GoogleSigninButton } from "./GoogleSigninButton";

import { AuthResponse } from "@/types";

export const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await new Promise<AuthResponse>((resolve) => {
        chrome.runtime.sendMessage(
          { type: "sign-in" },
          (response: AuthResponse) => {
            resolve(response);
          }
        );
      });

      if (response.status === "SUCCESS") {
        console.log("認証成功:", response.user.email);
      } else {
        setError(response.error);
      }
    } catch (error) {
      console.error("認証エラー:", error);
      setError("認証中にエラーが発生しました。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-72 h-60 flex flex-col items-center gap-y-7">
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-2xl font-bold">Draft Drawer</h1>
        <p className="text-xs">
          Draft
          Drawerは、文書やメッセージのテンプレートを一か所に保存し、素早くコピーアンドペーストできるテンプレート管理アプリです。
        </p>
      </div>
      <GoogleSigninButton onClick={signIn} />
      {isLoading && <p className="text-xs text-blue-600">認証中...</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
      <p className="text-xs text-gray-600">
        利用規約、プライバシーポリシーに同意したうえでログインしてください。
      </p>
    </div>
  );
};

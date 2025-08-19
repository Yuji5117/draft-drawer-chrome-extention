import { GoogleSigninButton } from "./GoogleSigninButton";

export const Signin = () => {
  const signIn = async () => {
    await new Promise<void>((resolve) => {
      chrome.runtime.sendMessage({ type: "sign-in" }, (response) => {
        resolve();
      });
    });
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
      <p className="text-xs text-gray-600">
        利用規約、プライバシーポリシーに同意したうえでログインしてください。
      </p>
    </div>
  );
};

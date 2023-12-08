import { GoogleAuthProvider, signInWithCredential, User } from "firebase/auth";

import { getTemplates } from "./../api/getTemplates";

import { auth } from "@/config/firebase";

type ChromeListenerMessageType = {
  type: "sign-in" | "get-templates";
};

const signIn = async (
  sendResponse: (response: {
    user: User;
    token: string;
    status: "SUCCESS" | "ERROR";
  }) => void
) => {
  try {
    const { token } = await chrome.identity.getAuthToken({
      interactive: true,
    });

    const credential = GoogleAuthProvider.credential(null, token);

    const userCredential = await signInWithCredential(auth, credential);

    const user = userCredential.user;
    const idToken = await user.getIdToken(true);
    sendResponse({ user: user, token: idToken, status: "SUCCESS" });
  } catch (e) {
    throw Error("エラーです。");
  }
};

chrome.runtime.onMessage.addListener(
  async (message: ChromeListenerMessageType, _, sendResponce) => {
    switch (message.type) {
      case "sign-in":
        signIn(sendResponce);
        return true;
      case "get-templates":
        try {
          const templates = await getTemplates();
          sendResponce({ tempaltes: templates, status: "SUCCESS" });
        } catch (e) {
          throw Error("エラーです。");
        }
        return true;
      default:
        sendResponce({
          message: "unknown message type",
          type: message.type,
          status: "ERROR",
        });
    }
  }
);

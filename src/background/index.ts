import { GoogleAuthProvider, signInWithCredential, User } from "firebase/auth";

import { getTemplates } from "./../api/getTemplates";

import { auth } from "@/config/firebase";
import { Template } from "@/types";

type ChromeListenerMessageType = {
  type: "sign-in" | "get-templates";
};

const signIn = async (
  sendResponse: (response: {
    user: User;
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

    sendResponse({ user: user, status: "SUCCESS" });
  } catch (e) {
    throw Error("エラーです。");
  }
};

const showTemplates = async (
  sendResponse: (response: {
    templates: Template[];
    status: "SUCCESS" | "ERROR";
  }) => void
) => {
  try {
    const templates = await getTemplates();
    sendResponse({ templates: templates, status: "SUCCESS" });
  } catch (e) {
    throw Error("エラーです。");
  }
};

chrome.runtime.onMessage.addListener(
  (message: ChromeListenerMessageType, _, sendResponse) => {
    switch (message.type) {
      case "sign-in":
        signIn(sendResponse);
        return true;
      case "get-templates":
        showTemplates(sendResponse);
        return true;
      default:
        sendResponse({
          message: "unknown message type",
          type: message.type,
          status: "ERROR",
        });
    }
  }
);

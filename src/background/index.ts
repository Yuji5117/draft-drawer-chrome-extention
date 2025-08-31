import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

import { getTemplates } from "./../api/getTemplates";

import { auth } from "@/config/firebase";
import {
  User,
  AuthResponse,
  TemplatesResponse,
  ChromeMessage,
  Template,
} from "@/types";
import { storage } from "@/libs/storage";
import { getAllDocs } from "@/libs/firebase";

const SYNC_DELAY_MINUTES = 1;
const SYNC_PERIOD_MINUTES = 10;

const signIn = async (sendResponse: (response: AuthResponse) => void) => {
  try {
    const { token } = await chrome.identity.getAuthToken({
      interactive: true,
    });

    const credential = GoogleAuthProvider.credential(null, token);

    const userCredential = await signInWithCredential(auth, credential);

    const firebaseUser = userCredential.user;
    const user: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email as string,
    };

    sendResponse({ user: user, status: "SUCCESS" });
  } catch (e) {
    console.error("Sign-in error:", e);

    let errorMessage = "認証中にエラーが発生しました。";

    if (e instanceof Error) {
      if (e.message.includes("User did not approve")) {
        errorMessage = "認証がキャンセルされました。";
      } else if (e.message.includes("network")) {
        errorMessage =
          "ネットワークエラーが発生しました。インターネット接続を確認してください。";
      } else if (e.message.includes("invalid-credential")) {
        errorMessage = "認証情報が無効です。再度お試しください。";
      }
    }

    sendResponse({ status: "ERROR", error: errorMessage });
  }
};

const showTemplates = async (
  sendResponse: (response: TemplatesResponse) => void
) => {
  try {
    const templates = await getTemplates();
    sendResponse({ templates: templates, status: "SUCCESS" });
  } catch (e) {
    console.error("Templates fetch error:", e);
    sendResponse({
      status: "ERROR",
      error: "テンプレートの取得に失敗しました。",
    });
  }
};

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "open-popup") {
    try {
      await chrome.action.openPopup();
    } catch (error) {
      console.error("Failed to open popup via keyboard shortcut:", error);
    }
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("syncTemplates", {
    delayInMinutes: SYNC_DELAY_MINUTES,
    periodInMinutes: SYNC_PERIOD_MINUTES,
  });
});

const forceUpdateTemplatesCache = async () => {
  try {
    const user = await storage.get("user");
    if (!user) {
      console.log("User not logged in, skipping template update");
      return;
    }

    const templatesFromDB = await getAllDocs<Template>("templates");
    await storage.set("templatesCache", {
      data: templatesFromDB,
      lastUpdated: Date.now(),
    });

    console.log("Force updated!!");
  } catch (error) {
    console.error("Failed to update templates cache:", error);
  }
};

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "syncTemplates") {
    await forceUpdateTemplatesCache();
  }
});

chrome.runtime.onMessage.addListener(
  (message: ChromeMessage, _, sendResponse) => {
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

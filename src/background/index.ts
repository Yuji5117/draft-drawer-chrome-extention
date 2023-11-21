import { GoogleAuthProvider, signInWithCredential, User } from "firebase/auth";

import { auth } from "@/config/firebase";

type ChromeListenerMessageType = {
  type: "sign-in";
};

const signIn = async (
  sendResponse: (response: { user: User; token: string }) => void
) => {
  const { token } = await chrome.identity.getAuthToken({
    interactive: true,
  });

  const credential = GoogleAuthProvider.credential(null, token);

  const userCredential = await signInWithCredential(auth, credential);

  const user = userCredential.user;
  const idToken = await user.getIdToken(true);
  sendResponse({ user: user, token: idToken });
};

chrome.runtime.onMessage.addListener(
  (message: ChromeListenerMessageType, _, sendResponce) => {
    switch (message.type) {
      case "sign-in":
        signIn(sendResponce);
        return true;
      default:
        console.log("unknown message type", message.type);
    }
    // console.log("message", message);
    // console.log("sender", sender);
    // console.log("sendResponce", sendResponce);
  }
);

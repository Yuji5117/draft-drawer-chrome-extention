type ChromeListenerMessageType = {
  type: "sign-in";
};

const signIn = async (sendResponse: (response: string) => void) => {
  const token = await chrome.identity.getAuthToken({
    interactive: true,
  });
  console.log(token);
  sendResponse("you are signed in");
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

export const Signin = () => {
  const signIn = async () => {
    await new Promise<void>((resolve) => {
      chrome.runtime.sendMessage({ type: "sign-in" }, (response) => {
        console.log({ response });
        resolve();
      });
    });
  };
  return <button onClick={signIn}>Signin</button>;
};

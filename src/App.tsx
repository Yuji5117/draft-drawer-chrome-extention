import { useContext } from "react";

import { Signin } from "./components/auth/Signin";
import Main from "./components/Main";
import { AuthContext } from "./context/auth";

function App() {
  const user = useContext(AuthContext);

  if (user === undefined) return <div>User Loading...</div>;

  if (user === null) return <Signin />;

  return <Main />;
}

export default App;

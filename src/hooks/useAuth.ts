import { useContext } from "react";

import { AuthContext } from "@/store/context/auth";

export const useAuthContext = () => useContext(AuthContext);

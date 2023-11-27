import { signOut } from "firebase/auth";

import { auth } from "@/config/firebase";

export const signout = () => signOut(auth);

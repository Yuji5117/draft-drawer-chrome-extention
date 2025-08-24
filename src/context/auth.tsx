import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

import { auth, db } from "@/config/firebase";
import { User } from "@/types";

type UserContextType = User | null | undefined;

export const AuthContext = createContext<UserContextType>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserContextType>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, `users/${firebaseUser.uid}`);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data() as User;
          setUser({ id: userData.id, email: userData.email });
        } else {
          const appUser = {
            id: firebaseUser.uid,
            email: firebaseUser.email as string,
            created_at: Date.now(),
            updated_at: Date.now(),
          };

          await setDoc(userRef, appUser);
          setUser({ id: appUser.id, email: appUser.email });
        }
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

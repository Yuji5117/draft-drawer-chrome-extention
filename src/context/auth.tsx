import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

import { auth, db } from "@/config/firebase";
import { User } from "@/types";
import { storage } from "@/libs/storage";

type UserContextType = User | null | undefined;

export const AuthContext = createContext<UserContextType>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserContextType>();

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      const cachedUser = await storage.get("user");
      if (mounted && cachedUser) {
        setUser(cachedUser);
      }
    };

    initializeAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!mounted) return;

      if (firebaseUser) {
        const userRef = doc(db, `users/${firebaseUser.uid}`);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data() as User;
          const userInfo = { id: userData.id, email: userData.email };
          await storage.set("user", userInfo);
          setUser(userInfo);
        } else {
          const appUser = {
            id: firebaseUser.uid,
            email: firebaseUser.email as string,
            created_at: Date.now(),
            updated_at: Date.now(),
          };

          await setDoc(userRef, appUser);
          const userInfo = { id: appUser.id, email: appUser.email };
          await storage.set("user", userInfo);
          setUser(userInfo);
        }
      } else {
        await storage.remove("user");
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

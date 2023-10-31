import { collection, CollectionReference, getDocs } from "firebase/firestore";

import { db } from "@/config/firebase";

export const getAllDocs = async <T>(collectionName: string) => {
  const shopsColRef = collection(db, collectionName) as CollectionReference<T>;
  const querySnapshot = await getDocs(shopsColRef);
  return querySnapshot.docs.map((doc) => doc.data());
};

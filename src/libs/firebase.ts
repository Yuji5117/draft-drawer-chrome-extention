import {
  addDoc,
  collection,
  CollectionReference,
  DocumentData,
  getDocs,
  WithFieldValue,
} from "firebase/firestore";

import { db } from "@/config/firebase";

export const getAllDocs = async <T>(collectionName: string) => {
  const shopsColRef = collection(db, collectionName) as CollectionReference<T>;
  const querySnapshot = await getDocs(shopsColRef);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const createDoc = async (
  collectionName: string,
  data: WithFieldValue<DocumentData>
) => {
  return await addDoc(collection(db, collectionName), data);
};

import {
  addDoc,
  collection,
  CollectionReference,
  getDoc,
  getDocs,
  WithFieldValue,
} from "firebase/firestore";

import { db } from "@/config/firebase";

export const getAllDocs = async <DocDataType>(collectionName: string) => {
  const shopsColRef = collection(
    db,
    collectionName
  ) as CollectionReference<DocDataType>;
  const querySnapshot = await getDocs(shopsColRef);

  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
};

export const createDoc = async <FieldValueType>(
  collectionName: string,
  data: WithFieldValue<FieldValueType>
) => {
  const collectionRef = collection(
    db,
    collectionName
  ) as CollectionReference<FieldValueType>;
  const newDocRef = await addDoc(collectionRef, data);
  const docSnapshot = await getDoc(newDocRef);
  const docData = docSnapshot.data() as FieldValueType;

  return { id: newDocRef.id, ...docData };
};

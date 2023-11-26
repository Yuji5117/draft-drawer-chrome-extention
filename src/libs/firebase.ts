import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  WithFieldValue,
} from "firebase/firestore";

import { auth, db } from "@/config/firebase";

export const getAllDocs = async <DocDataType>(collectionName: string) => {
  const userId = auth.currentUser?.uid;
  if (userId === undefined) throw Error("認証情報がありません。");
  const shopsColRef = collection(
    db,
    "users",
    userId,
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
  const userId = auth.currentUser?.uid;
  if (userId === undefined) throw Error("認証情報がありません。");

  const collectionRef = collection(
    db,
    "users",
    userId,
    collectionName
  ) as CollectionReference<FieldValueType>;
  const newDocRef = await addDoc(collectionRef, data);
  const docSnapshot = await getDoc(newDocRef);
  const docData = docSnapshot.data() as FieldValueType;

  return { id: newDocRef.id, ...docData };
};

export const updateDocFn = async <
  FieldValueType extends { [key: string]: unknown }
>(
  collectionName: string,
  documentId: string,
  data: WithFieldValue<FieldValueType>
) => {
  const userId = auth.currentUser?.uid;
  if (userId === undefined) throw Error("認証情報がありません。");

  const collectionRef = collection(
    db,
    "users",
    userId,
    collectionName
  ) as CollectionReference<FieldValueType>;
  const docRef = doc(collectionRef, documentId);
  await updateDoc(docRef, data);
  const docSnapshot = await getDoc(docRef);
  const updatedData = docSnapshot.data() as Required<FieldValueType>;

  return { id: docRef.id, ...updatedData };
};

export const deleteDocFn = async <FieldValueType>(
  collectionName: string,
  documentId: string
) => {
  const userId = auth.currentUser?.uid;
  if (userId === undefined) throw Error("認証情報がありません。");

  const collectionRef = collection(
    db,
    "users",
    userId,
    collectionName
  ) as CollectionReference<FieldValueType>;
  const docRef = doc(collectionRef, documentId);
  await deleteDoc(docRef);
  const docSnapshot = await getDoc(docRef);

  return docSnapshot.data() as FieldValueType;
};

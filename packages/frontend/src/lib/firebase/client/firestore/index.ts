import {
  getFirestore,
  collection,
  collectionGroup,
  query,
  orderBy,
  where,
  limit,
  startAt,
  startAfter,
  endAt,
  endBefore,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  serverTimestamp,
  Timestamp,
  DocumentData,
  QueryConstraint,
} from 'firebase/firestore';
import { DB } from 'src/types/firebase/client/firestore';

export const getDBRef = (path: string, pathSegments: string[], options?: DB.Options) => {
  const db = getFirestore();
  return doc(db, path, ...pathSegments).withConverter(options && options.converter);
};

export const getDBCollection = async (
  path: string,
  pathSegments: string[],
  field: DB.Field,
  options?: DB.Options
) => {
  const db = getFirestore();
  const queryConstraints = [
    where(field.fieldPath, field.opStr, field.value),
    options &&
      options.whereA &&
      where(options.whereA.fieldPath, options.whereA.opStr, options.whereA.value),
    options &&
      options.whereB &&
      where(options.whereB.fieldPath, options.whereB.opStr, options.whereB.value),
    options &&
      options.whereC &&
      where(options.whereC.fieldPath, options.whereC.opStr, options.whereC.value),
    options && options.orderBy && orderBy(options.orderBy.fieldPath, options.orderBy.directionStr),
    options && options.startAt && startAt(options.startAt),
    options && options.startAfter && startAfter(options.startAfter),
    options && options.endAt && endAt(options.endAt),
    options && options.endBefore && endBefore(options.endBefore),
    options && options.limit && limit(options.limit),
  ].filter(x => x) as unknown as QueryConstraint[];
  const q = query(collection(db, path, ...pathSegments), ...queryConstraints).withConverter(
    options && options.converter
  );
  const querySnapshot = await getDocs(q);
  const docs: DocumentData[] = [];
  querySnapshot.forEach(doc => {
    if (doc.exists()) {
      docs.push(doc.data());
    }
  });
  return docs;
};

export const getDBCollectionGroup = async (path: string, field: DB.Field, options?: DB.Options) => {
  const db = getFirestore();
  const queryConstraints = [
    where(field.fieldPath, field.opStr, field.value),
    options &&
      options.whereA &&
      where(options.whereA.fieldPath, options.whereA.opStr, options.whereA.value),
    options &&
      options.whereB &&
      where(options.whereB.fieldPath, options.whereB.opStr, options.whereB.value),
    options &&
      options.whereC &&
      where(options.whereC.fieldPath, options.whereC.opStr, options.whereC.value),
    options && options.orderBy && orderBy(options.orderBy.fieldPath, options.orderBy.directionStr),
    options && options.startAt && startAt(options.startAt),
    options && options.startAfter && startAfter(options.startAfter),
    options && options.endAt && endAt(options.endAt),
    options && options.endBefore && endBefore(options.endBefore),
    options && options.limit && limit(options.limit),
  ].filter(x => x) as unknown as QueryConstraint[];
  const q = query(collectionGroup(db, path), ...queryConstraints).withConverter(
    options && options.converter
  );
  const querySnapshot = await getDocs(q);
  const docs: DocumentData[] = [];
  querySnapshot.forEach(doc => {
    if (doc.exists()) {
      docs.push(doc.data());
    }
  });
  return docs;
};

export const getDBQuery = (path: string, field: DB.Field, options?: DB.Options) => {
  const db = getFirestore();
  const queryConstraints = [
    where(field.fieldPath, field.opStr, field.value),
    options &&
      options.whereA &&
      where(options.whereA.fieldPath, options.whereA.opStr, options.whereA.value),
    options &&
      options.whereB &&
      where(options.whereB.fieldPath, options.whereB.opStr, options.whereB.value),
    options &&
      options.whereC &&
      where(options.whereC.fieldPath, options.whereC.opStr, options.whereC.value),
    options && options.orderBy && orderBy(options.orderBy.fieldPath, options.orderBy.directionStr),
    options && options.startAt && startAt(options.startAt),
    options && options.startAfter && startAfter(options.startAfter),
    options && options.endAt && endAt(options.endAt),
    options && options.endBefore && endBefore(options.endBefore),
    options && options.limit && limit(options.limit),
  ].filter(x => x) as unknown as QueryConstraint[];
  return query(collection(db, path), ...queryConstraints).withConverter(
    options && options.converter
  );
};

export const setDBDoc = async (path: string, pathSegments: string[], value: Partial<unknown>) => {
  const timestamp = serverTimestamp();
  const doc = {
    ...value,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  await setDoc(getDBRef(path, pathSegments, {}), doc);
  return doc;
};

export const updateDBDoc = async (
  path: string,
  pathSegments: string[],
  value: Partial<unknown>
) => {
  const timestamp = serverTimestamp();
  return await updateDoc(getDBRef(path, pathSegments), {
    ...value,
    updatedAt: timestamp,
  });
};

export const deleteDBDoc = async (path: string, pathSegments: string[]) => {
  return await deleteDoc(getDBRef(path, pathSegments));
};

export const getDBDocSnap = async (path: string, pathSegments: string[], options?: DB.Options) => {
  const docRef = getDBRef(path, pathSegments, options);
  return await getDoc(docRef);
};

export const getDBDoc = async (path: string, pathSegments: string[], options?: DB.Options) => {
  const docRef = getDBRef(path, pathSegments, options);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
};

export const getDBDocs = async (path: string, field: DB.Field, options?: DB.Options) => {
  const q = getDBQuery(path, field, options);
  const querySnapshot = await getDocs(q);
  const docs: DocumentData[] = [];
  querySnapshot.forEach(doc => {
    if (doc.exists()) {
      docs.push(doc.data());
    }
  });
  return docs;
};

export const getTimestamp = async (date: string | number | Date) => {
  return Timestamp.fromDate(new Date(date)); //"December 10, 1815"
};

export const getServerTimestamp = () => {
  return serverTimestamp();
};

import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { serverEnv } from '@env';

export const initAdminFirebase = () => {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(serverEnv.firebase),
      storageBucket: `${serverEnv.firebase.project_id}.appspot.com`,
      // databaseURL: firebase.databaseURL,
    });
  }
};

export const verifyIdToken = async (token: string) => {
  const auth = getAuth();
  return await auth.verifyIdToken(token);
};

export const getAdminServerTimestamp = () => {
  return FieldValue.serverTimestamp();
};

export const convertServerTimestamp = (timestamp: Date) => {
  return Timestamp.fromDate(timestamp);
};

export const convertClientTimestamp = (timestamp: Timestamp): Date => {
  return timestamp.toDate();
};

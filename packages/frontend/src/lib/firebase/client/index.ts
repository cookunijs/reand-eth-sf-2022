import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/functions';
import 'firebase/firestore';
import 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { publicEnv } from '@env';
import firebaseJson from '@configs/firebase.json';

export const notInitializedApp = () => {
  if (getApps().length > 0) return false;
  return true;
};

export const initFirebase = () => {
  if (typeof window !== 'undefined' && getApps().length === 0) {
    const firebaseConfig = {
      ...firebaseJson.environment[
        publicEnv.env === 'prod'
          ? 'production'
          : publicEnv.env === 'staging'
          ? 'staging'
          : 'development'
      ],
    };

    initializeApp(firebaseConfig);
    const auth = getAuth();
    const functions = getFunctions();
    functions.region = firebaseJson.region;
    setPersistence(auth, browserLocalPersistence);
    if (process.env.NODE_ENV === 'production') {
      getAnalytics();
      setPersistence(auth, browserLocalPersistence);
    }
  }
};

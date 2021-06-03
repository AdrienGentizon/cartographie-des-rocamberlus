import firebase from 'firebase/app';
import 'firebase/auth';
import getEnv from './getEnv';

export const app = firebase.initializeApp({
  apiKey: getEnv().REACT_APP_FIREBASE_API_KEY,
  authDomain: getEnv().REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: getEnv().REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: getEnv().REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: getEnv().REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: getEnv().REACT_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();

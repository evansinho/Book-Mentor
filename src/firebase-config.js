import firebase from 'firebase';
import dotenv from 'dotenv';

dotenv.config();

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASE,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGE,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
});

const db = firebaseApp.firestore();

export default db;

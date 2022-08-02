// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyDLVo_qBmDyunTMZL7HCqTkPgE1ZZju5lY',
  authDomain: 'testing-e67ac.firebaseapp.com',
  databaseURL: 'https://testing-e67ac.firebaseio.com',
  projectId: 'testing-e67ac',
  storageBucket: 'testing-e67ac.appspot.com',
  messagingSenderId: '734808594155',
  appId: '1:734808594155:web:fe91542e991ffbb9'
};

// Initialize Firebase
const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage, doc, setDoc };

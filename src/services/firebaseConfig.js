import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDElrwy5CtSzsF_WTbofvIUu1OiqdkwlY",
  authDomain: "remedie-mobile.firebaseapp.com",
  projectId: "remedie-mobile",
  storageBucket: "remedie-mobile.appspot.com",
  messagingSenderId: "1099433114012",
  appId: "1:1099433114012:web:8f234af3a498c7302d7059",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

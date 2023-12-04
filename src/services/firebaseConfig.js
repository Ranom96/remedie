import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
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
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);

import { app } from "./firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export const auth = getAuth(app);

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(`Usuário logado? ${user}`);
  } else {
    console.log(`Usuário deslogado? ${user}`);
  }
});

export const login = async (email, senha) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, senha);
    return res;
  } catch (error) {
    return res;
  }
};

export const register = async (email, senha) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, senha);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  await signOut(auth);
};

import { app } from "./firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";

export const auth = getAuth(app);

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(`Usuário logado?`, user);
  } else {
    console.log(`Usuário deslogado?`, user);
  }
});

export const login = async (email, senha) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, senha);
    console.log(res);
    if (res) {
      return res;
    }
  } catch (error) {
    if (error.code == "auth/invalid-login-credentials") {
      throw "Credenciais inválidas";
    } else {
      throw error;
    }
  }
};

export const register = async (email, senha) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, senha);
    if (res) {
      await logout();
      return res;
    } else {
      throw res;
    }
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  await signOut(auth);
};

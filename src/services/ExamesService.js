import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export const listarExames = async () => {
  const exames = [];

  try {
    const res = await getDocs(collection(db, "exames"));
    if (res) {
      res.forEach((doc) => {
        exames.push({ key: doc.id, ...doc.data() });
      });
      return exames;
    }
  } catch (error) {
    throw error;
  }
};

export const addExame = async (data) => {
  try {
    await addDoc(collection(db, "exames"), {
      exame: data.exame,
      data: data.data,
      horario: data.horario,
      local: data.local,
      compareceu: data.compareceu,
      userId: data.userId,
    });
  } catch (error) {
    throw error;
  }
};

export const updateExame = async (data) => {
  const docRef = doc(db, "exames", data.id);
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();
  const dataTratada = {
    exame: data.exame === undefined ? docData.exame : data.exame,
    local: data.local === undefined ? docData.local : data.local,
    data: data.data === undefined ? docData.data : data.data,
    horario: data.horario === undefined ? docData.horario : data.horario,
    compareceu:
      data.compareceu === undefined ? docData.compareceu : data.compareceu,
  };

  try {
    await updateDoc(docRef, dataTratada);
  } catch (error) {
    throw error;
  }
};

export const removerExame = async (key) => {
  await deleteDoc(doc(db, "exames", key));
};

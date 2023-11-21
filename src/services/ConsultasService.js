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

export const listarConsultas = async () => {
  const consultas = [];

  try {
    const res = await getDocs(collection(db, "consultas"));

    if (res) {
      res.forEach((doc) => {
        consultas.push({ key: doc.id, ...doc.data() });
      });
      return consultas;
    }
  } catch (error) {
    throw error;
  }
};

export const addConsulta = async (data) => {
  try {
    await addDoc(collection(db, "consultas"), {
      data: data.data,
      horario: data.horario,
      local: data.local,
      medico: data.medico,
      especialidade: data.especialidade,
      compareceu: data.compareceu,
      userId: data.userId,
    });
  } catch (error) {
    throw error;
  }
};

export const updateConsulta = async (data) => {
  const docRef = doc(db, "consultas", data.id);
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();

  const dataTratada = {
    data: data.data === undefined ? docData.data : data.data,
    horario: data.horario === undefined ? docData.horario : data.horario,
    local: data.local === undefined ? docData.local : data.local,
    medico: data.medico === undefined ? docData.medico : data.medico,
    especialidade:
      data.especialidade === undefined
        ? docData.especialidade
        : data.especialidade,
    compareceu:
      data.compareceu === undefined ? docData.compareceu : data.compareceu,
  };
  try {
    await updateDoc(docRef, dataTratada);
  } catch (error) {
    throw error;
  }
};

export const removerConsulta = async (key) => {
  await deleteDoc(doc(db, "consultas", key));
};

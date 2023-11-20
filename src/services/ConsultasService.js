import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
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
      console.log(consultas);
      return consultas;
    } else {
      return "Nenhuma consulta cadastrada";
    }
  } catch (error) {
    console.log(error);
  }
};

export const addConsulta = async (data, userId) => {
  try {
    await addDoc(collection(db, "consultas"), {
      data: data.data,
      horario: data.horario,
      local: data.local,
      medico: data.medico,
      especialidade: data.especialidade,
      userId: userId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removerConsulta = async (key) => {
  await deleteDoc(doc(db, "consultas", key));
};

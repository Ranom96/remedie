import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export const listarRemedios = async () => {
  const remedios = [];

  try {
    const res = await getDocs(collection(db, "remedios"));
    res.forEach((doc) => {
      remedios.push({ key: doc.id, ...doc.data() });
    });
    return remedios;
  } catch (error) {
    console.log(error);
  }
};

export const addRemedio = async (data, userId) => {
  try {
    await addDoc(collection(db, "remedios"), {
      medicamento: data.medicamento,
      dosagem: data.dosagem,
      horario: data.horario,
      tomado: false,
      userId: userId,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteRemedio = async (key) => {
  await deleteDoc(doc(db, "remedios", key));
};

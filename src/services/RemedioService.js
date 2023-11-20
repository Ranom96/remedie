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
    if (res) {
      res.forEach((doc) => {
        remedios.push({ key: doc.id, ...doc.data() });
      });
      console.log(remedios);
      return remedios;
    } else {
      return "Nenhum remédio cadastrado";
    }
  } catch (error) {
    console.log(error);
  }
};

export const addRemedio = async (data, userId) => {
  try {
    const res = await addDoc(collection(db, "reemedios"), {
      medicamento: data.medicamento,
      dosagem: data.dosagem,
      horario: data.horario,
      userId: userId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRemedio = async (key) => {
  await deleteDoc(doc(db, "remedios", key));
};

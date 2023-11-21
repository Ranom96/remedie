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

export const addRemedio = async (data) => {
  try {
    await addDoc(collection(db, "remedios"), {
      medicamento: data.medicamento,
      dosagem: data.dosagem,
      horario: data.horario,
      tomado: data.tomado,
      userId: data.userId,
    });
  } catch (error) {
    throw error;
  }
};

export const updateRemedio = async (data) => {
  const docRef = doc(db, "remedios", data.id);
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();
  console.log(docData);
  try {
    await updateDoc(docRef, {
      medicamento: data.medicamento ? data.medicamento : docData.medicamento,
      dosagem: data.dosagem ? data.dosagem : docData.dosagem,
      horario: data.horario ? data.horario : docData.horario,
      tomado: data.tomado ? data.tomado : docData.tomado,
    });
    console.log(docData);
  } catch (error) {
    throw error;
  }
};

export const deleteRemedio = async (key) => {
  await deleteDoc(doc(db, "remedios", key));
};

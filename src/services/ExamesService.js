import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
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
      console.log(exames);
      return exames;
    } else {
      return "Nenhum exame cadastrado";
    }
  } catch (error) {
    console.log(error);
  }
};

export const addExame = async (data, userId) => {
  try {
    await addDoc(collection(db, "exames"), {
      exame: data.exame,
      especialidade: data.especialidade,
      data: data.data,
      horario: data.horario,
      local: data.local,
      userId: userId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removerExame = async (key) => {
  await deleteDoc(doc(db, "exames", key));
};

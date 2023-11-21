import { createContext, useState } from "react";
import {
  listarRemedios,
  addRemedio,
  deleteRemedio,
  updateRemedio,
} from "../services/RemedioService";

const RemediosContext = createContext({
  remedios: [],
  listarRemedios: () => {},
  addRemedio: () => {},
  atualizarRemedio: () => {},
  removerRemedio: () => {},
});

export function RemediosProvider({ children }) {
  const [meusRemedios, setMeusRemedios] = useState([]);

  async function inserir(remedio) {
    try {
      await addRemedio(remedio);
      setMeusRemedios([...meusRemedios, remedio]);
    } catch (err) {
      throw err.message;
    }
  }

  async function list() {
    try {
      const data = await listarRemedios();
      setMeusRemedios([...data]);
    } catch (err) {
      throw err.message;
    }
  }

  async function update(data) {
    try {
      await updateRemedio(data);
    } catch (error) {
      throw error;
    }
  }
  async function remover(key) {
    try {
      await deleteRemedio(key);
      setMeusRemedios((valorAntigo) =>
        valorAntigo.filter((remedio) => remedio.id !== key)
      );
    } catch (err) {
      throw Error(err.message);
    }
  }

  const contexto = {
    remedios: meusRemedios,
    addRemedio: inserir,
    listarRemedios: list,
    atualizarRemedio: update,
    removerRemedio: remover,
  };

  return (
    <RemediosContext.Provider value={contexto}>
      {children}
    </RemediosContext.Provider>
  );
}

export default RemediosContext;

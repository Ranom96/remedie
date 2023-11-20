import { createContext, useState } from "react";
import {
  listarRemedios,
  addRemedio,
  deleteRemedio,
} from "../services/RemedioService";

const RemediosContext = createContext({
  remedios: [],
  listarRemedios: () => {},
  addRemedio: () => {},
  removerRemedio: () => {},
});

export function RemediosContextProvider({ children }) {
  const [meusRemedios, setMeusRemedios] = useState([]);

  async function inserir(remedio) {
    try {
      await addRemedio(remedio);
      setMeusRemedios([...meusRemedios, remedio]);
    } catch (err) {
      throw Error(err.message);
    }
  }

  async function listar() {
    try {
      const data = await listarRemedios();
      setMeusRemedios(await data);
    } catch (err) {
      throw Error(err.message);
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
    listRemedios: listar,
    removerRemedio: remover,
  };

  return (
    <RemediosContext.Provider value={contexto}>
      {children}
    </RemediosContext.Provider>
  );
}

export default RemediosContext;

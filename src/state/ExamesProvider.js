import { createContext, useState } from "react";
import {
  listarExames,
  addExame,
  updateExame,
  removerExame,
} from "../services/ExamesService";

const ExamesContext = createContext({
  exames: [],
  listarExames: () => {},
  addExame: () => {},
  atualizarExame: () => {},
  removerExame: () => {},
});

export function ExamesProvider(props) {
  const [meusExames, setMeusExames] = useState([]);

  async function inserir(exame) {
    try {
      await addExame(exame);
      setMeusExames([...meusExames, exame]);
    } catch (err) {
      throw err.message;
    }
  }

  async function list() {
    try {
      const data = await listarExames();
      setMeusExames([...data]);
    } catch (err) {
      throw err.message;
    }
  }

  async function update(data) {
    try {
      await updateExame(data);
      list();
    } catch (error) {
      throw error;
    }
  }

  async function remover(key) {
    try {
      await removerExame(key);
      list();
    } catch (err) {
      throw err.message;
    }
  }

  const contexto = {
    exames: meusExames,
    addExame: inserir,
    atualizarExame: update,
    listarExames: list,
    removerExame: remover,
  };

  return (
    <ExamesContext.Provider value={contexto}>
      {props.children}
    </ExamesContext.Provider>
  );
}

export default ExamesContext;

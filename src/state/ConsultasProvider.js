import { createContext, useState } from "react";
import {
  listarConsultas,
  addConsulta,
  removerConsulta,
  updateConsulta,
} from "../services/ConsultasService";

const ConsultasContext = createContext({
  consultas: [],
  listarConsultas: () => {},
  addConsulta: () => {},
  atualizarConsulta: () => {},
  removerConsulta: () => {},
});

export function ConsultasProvider(props) {
  const [minhasConsultas, setMinhasConsultas] = useState([]);

  async function inserir(consulta) {
    try {
      await addConsulta(consulta);
      setMinhasConsultas([...minhasConsultas, consulta]);
    } catch (err) {
      throw err.message;
    }
  }

  async function list() {
    try {
      const data = await listarConsultas();
      setMinhasConsultas([...data]);
    } catch (err) {
      throw err.message;
    }
  }

  async function update(data) {
    try {
      await updateConsulta(data);
      list();
    } catch (error) {
      throw error;
    }
  }

  async function remover(key) {
    try {
      await removerConsulta(key);
      list();
    } catch (err) {
      throw err.message;
    }
  }

  const contexto = {
    consultas: minhasConsultas,
    addConsulta: inserir,
    atualizarConsulta: update,
    listarConsultas: list,
    removerConsulta: remover,
  };

  return (
    <ConsultasContext.Provider value={contexto}>
      {props.children}
    </ConsultasContext.Provider>
  );
}

export default ConsultasContext;

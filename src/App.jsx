import { useEffect, useState } from "react";
import Exemplo from "./components/Exemplo";
import { listarNoticias, listarFontes } from "./components/DataBase";
import TabelaNoticias from "./components/TabelaUi";
import "./App.css";

export default function App() {
  const [noticias, setNoticias] = useState([]);
  const [fontes, setFonte] = useState([]);

  useEffect(() => {
    listarNoticias().then((dados) => {
      setNoticias(dados);
    });
  }, []);

  return (
  <div className="app">
    <h1 className="titulo">
        Noticias novas
    </h1>

    <div className="importador">
      <Exemplo>
        Novas noticias aqui
      </Exemplo>
    </div>

    <div>
      <select className="fonteNoticia">
        {fontes.map((fonte) => {
          return <option 
            value={fonte.nome}
            onChange={null}
          >
            {fonte.nome}
          </option>
        })}
      </select>
    </div>

    <TabelaNoticias noticias={noticias} />
  </div>
  );
}
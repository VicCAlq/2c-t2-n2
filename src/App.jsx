import { useEffect, useState } from "react";
import { listarNoticias, listarFontes } from "./components/database";
import Exemplo from "./components/Exemplo";
import TabelaNoticias from "./components/TabelaNoticias";
import "./App.css";

export default function App() {
  const [noticias, setNoticias] = useState([]);
  const [fontes, setFontes] = useState([]);

  useEffect(() => {
    listarNoticias().then((dados) => {
      setNoticias(dados);
    });
  }, []);

  return (
  <div className="app">
    <h1 className="titulo">
      Notícias Do Amanhã!
    </h1>

    <div className="importador">
      <Exemplo>
        Veja Notícias Novas!
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

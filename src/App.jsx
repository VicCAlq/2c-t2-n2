import { useEffect, useState } from "react";
import { listarNoticias } from "./components/database";
import Exemplo from "./components/Exemplo";
import TabelaNoticias from "./components/TabelaNoticias";
import "./App.css";

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#eec",
    alignItems: "center",
    justifyContent: "center",
  },

  divTitulo: {
    backgroundColor: "rgba(80, 80, 13, 1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100px",
    marginLeft: "250px",
    width: "900px",
    borderRadius: "25px",
    color: "#e8e8f0ff",
  },
};

export default function App() {
  const [noticias, setNoticias] = useState([]);

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

    <TabelaNoticias noticias={noticias} />
  </div>
  );
}

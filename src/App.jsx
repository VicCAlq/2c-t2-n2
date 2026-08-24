import { useEffect, useState } from "react";
import { listarNoticias, listarFontes } from "./components/database";
import Exemplo from "./components/Exemplo";
import TabelaNoticias from "./components/TabelaNoticias";
import "./App.css";

export default function App() {
  const [noticias, setNoticias] = useState([]);
  const [fontes, setFontes] = useState([]);
  const [fonteSelecionada, setFonteSelecionada] = useState("");

  async function carregarDados() {
    try {
      const [dadosNoticias, dadosFontes] = await Promise.all([
        listarNoticias(),
        listarFontes(),
      ]);

      setNoticias(dadosNoticias);
      setFontes(dadosFontes);
    } catch (erro) {
      console.error("Erro ao carregar os dados:", erro);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const noticiasFiltradas = fonteSelecionada
    ? noticias.filter((noticia) => noticia.nomeFonte === fonteSelecionada)
    : noticias;

  return (
    <div className="app">
      <h1 className="titulo">Notícias Do Amanhã!</h1>

      <div className="importador">
        <Exemplo aoImportar={carregarDados}>Veja Notícias Novas!</Exemplo>
      </div>

      <div>
        <label htmlFor="fonteNoticia">Filtrar por fonte: </label>

        <select
          id="fonteNoticia"
          className="fonteNoticia"
          value={fonteSelecionada}
          onChange={(evento) => setFonteSelecionada(evento.target.value)}
        >
          <option value="">Todas as fontes</option>

          {fontes.map((fonte) => (
            <option key={fonte.id} value={fonte.nome}>
              {fonte.nome}
            </option>
          ))}
        </select>
      </div>

      <TabelaNoticias noticias={noticiasFiltradas} />
    </div>
  );
}

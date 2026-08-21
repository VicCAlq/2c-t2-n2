import { useState, useEffect } from "react";
import {
  adicionarFonte,
  listarFontes,
  adicionarNoticia,
  listarNoticias,
} from "./database";
import { baixarFeedRSS } from "./leitorRSS";

export function useAgregador() {
  const [noticias, setNoticias] = useState([]);
  const [endereco, setEndereco] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [filtroFonte, setFiltroFonte] = useState("Todas");

  useEffect(() => {
    carregarNoticias();
  }, []);

  async function carregarNoticias() {
    const lista = await listarNoticias();
    setNoticias(lista);
  }

  async function adicionarFonteHandler(e) {
    e.preventDefault();
    if (!endereco) return;

    setCarregando(true);
    setErro("");

    try {
      const feed = await baixarFeedRSS(endereco);

      const fonte = {
        nome: feed.titulo,
        endereco: endereco,
        descricao: feed.descricao,
        categoria: feed.noticias[0]?.categorias[0] || "Geral",
      };

      await adicionarFonte(fonte);

      for (const item of feed.noticias) {
        await adicionarNoticia({
          nome: item.titulo,
          endereco: item.link,
          descricao: item.descricao,
          dataDePublicacao: item.dataPublicacao,
          categoria: item.categorias[0] || "Geral",
          fonte: fonte.nome,
        });
      }

      setEndereco("");
      await carregarNoticias();
    } catch (err) {
      setErro("Não foi possível carregar essa fonte de notícias.");
    }

    setCarregando(false);
  }

  const categorias = ["Todas", ...new Set(noticias.map((n) => n.categoria))];
  const fontes = ["Todas", ...new Set(noticias.map((n) => n.fonte))];

  const noticiasFiltradas = noticias.filter((n) => {
    const categoriaOk =
      filtroCategoria === "Todas" || n.categoria === filtroCategoria;
    const fonteOk = filtroFonte === "Todas" || n.fonte === filtroFonte;
    return categoriaOk && fonteOk;
  });

  return {
    endereco,
    setEndereco,
    carregando,
    erro,
    categorias,
    fontes,
    filtroCategoria,
    setFiltroCategoria,
    filtroFonte,
    setFiltroFonte,
    noticiasFiltradas,
    adicionarFonteHandler,
  };
}

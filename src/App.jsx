import { useState, useEffect } from 'react';
import { Noticias } from './classes/Noticias';
import { baixarFeedRSS } from './components/leitorRSS';
import { InputComBotao } from './classes/Inputar';
import TabelaNoticias from './classes/TabelaNoticias';

export default function App() {
  const [noticias, setNoticias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

  useEffect(() => {
    carregarNoticiasIniciais();
  }, []);

  async function carregarNoticiasIniciais() {
    try {
      const resultado = await baixarFeedRSS(
        "https://g1.globo.com/dynamo/rss2.xml"
      );

      const noticiasConvertidas = resultado.noticias.map((noticia) => {
        return new Noticias(
          noticia.titulo,
          noticia.link,
          noticia.descricao,
          noticia.dataPublicacao,
          noticia.categorias
        );
      });

      setNoticias(noticiasConvertidas);

    } catch (erro) {
      console.error("Erro ao carregar notícias:", erro);
    }
  }

  async function adicionarFeed(valor) {
    try {
      const resultado = await baixarFeedRSS(valor);

      const novasNoticias = resultado.noticias.map((noticia) => {
        return new Noticias(
          noticia.titulo,
          noticia.link,
          noticia.descricao,
          noticia.dataPublicacao,
          noticia.categorias
        );
      });

      setNoticias((noticiasAnteriores) => [
        ...noticiasAnteriores,
        ...novasNoticias
      ]);

    } catch (erro) {
      console.error("Erro ao adicionar feed:", erro);
      alert("Não foi possível carregar esse RSS.");
    }
  }

  const categorias = [
    "Todas",
    ...new Set(
      noticias.flatMap((noticia) => noticia.categoria || [])
    ),
  ];

  const noticiasFiltradas =
    categoriaSelecionada === "Todas"
      ? noticias
      : noticias.filter((noticia) =>
          noticia.categoria.includes(categoriaSelecionada)
        );

  return (
    <div>
      <h1>Agregador de Notícias - Time 4</h1>

      <p>O site mais confiável da internet!!!</p>

      <InputComBotao meConfirma={adicionarFeed} />

      <div>
        {categorias.map((categoria) => (
          <button
            key={categoria}
            onClick={() => setCategoriaSelecionada(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      <h2>
        Categoria escolhida: {categoriaSelecionada}
      </h2>

      <TabelaNoticias noticias={noticiasFiltradas} />
    </div>
  );
}
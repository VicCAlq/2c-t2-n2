import { useState, useEffect } from 'react';
import { Noticias } from './classes/Noticias';
import { baixarFeedRSS } from './components/leitorRSS';

const styles = {
  container: {
    padding: "20px",
  },

  button: {
    margin: "5px",
    padding: "10px",
    cursor: "pointer",
  },
};

export default function App() {

  const [noticias, setNoticias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

  useEffect(() => {

    async function carregarNoticias() {

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

    carregarNoticias();

  }, []);


  const categorias = [
    "Todas",
    ...new Set(
      noticias.flatMap(
        (noticia) => noticia.categoria || []
      )
    ),
  ];


  const noticiasFiltradas =
    categoriaSelecionada === "Todas"
      ? noticias
      : noticias.filter((noticia) =>
          noticia.categoria.includes(categoriaSelecionada)
        );


  return (
    <div style={styles.container}>

      <h1>Agregador de Notícias - Time 4
      </h1>
      <p>O site mais confiável da internet!!!</p>

      <div>

        {categorias.map((categoria) => (

          <button
            key={categoria}
            style={styles.button}
            onClick={() =>
              setCategoriaSelecionada(categoria)
            }
          >
            {categoria}
          </button>

        ))}

      </div>


      <h2>
        Categoria Escolhida: {categoriaSelecionada}
      </h2>


      {noticiasFiltradas.map((noticia, index) => (

        <div key={index}>

          <h2>{noticia.nome}</h2>

          <p>{noticia.descricao}</p>

          <p>
            <strong>Categoria:</strong>{" "}
            {noticia.categoria.join(", ")}
          </p>

          <p>
            <strong>Data:</strong>{" "}
            {new Date(
              noticia.dataDePublicacao
            ).toLocaleDateString("pt-BR")}
          </p>

          <a
            href={noticia.endereco}
            target="_blank"
            rel="noopener noreferrer"
          >
            Acessar Notícia (seu fofoqueiro)
          </a>

          <hr />

        </div>

      ))}

    </div>
  );
}
import { useState } from "react"
import { baixarFeedRSS } from "./leitorRSS"
import { adicionarFonte, adicionarNoticia } from "./database"
import { Noticia } from "./ClassesCriadas"

export default function Exemplo({ children }) {

  const [feed, setFeed] = useState("O feed RSS vai aparecer aqui")
  const [fonte, setFonte] = useState("A fonte de notícias vai aparecer aqui")
  const [carregando, setCarregando] = useState("")
  const [endereco, setEndereco] = useState("")

  async function exibirFeed(endereco) {
    if (!endereco.trim()) {
      setFeed("Digite um endereço de RSS.");
      return;
    }

    setFeed("");
    setFonte("");
    setCarregando(<h2>Carregando feed</h2>);  

    try {
      const res = await baixarFeedRSS(endereco);

      const listaDeNoticias = res.noticias;
      const fontes = res.fonte;
      await adicionarFonte(fontes);

      for (const noticia of listaDeNoticias) {
        const novaNoticia = new Noticia(
          noticia.titulo,
          res.fonte.titulo,
          noticia.link,
          noticia.descricao,
          noticia.dataPublicacao,
          noticia.categorias
        );
        await adicionarNoticia(novaNoticia);
      }

      setFeed(
        <div style={{ margin: "20px auto" }}>
          {res.noticias.map((noticia) => (
            <div
              key={noticia.link}
              className="noticia-importada"
            >
              <p>{res.fonte.titulo}</p>
              <h3>{noticia.titulo}</h3>
            </div>
          ))}
        </div>
      );
    } catch (erro) {
      setFeed(
        <div className="mensagem-erro-container">
          <p className="mensagem-erro">
            Não foi possível importar esse endereço.
            <br />
            Motivo: {erro.message}
          </p>
        </div>
      );
    } finally {
      setCarregando("");
    }
  }

  return (
    <>
      <h2>{children}</h2>

      <div className="formulario-feed">
        <input
          className="campo-endereco"
          type="text"
          placeholder="Cole o endereço do feed RSS"
          onChange={(e) => setEndereco(e.target.value)}
        />

        <button
          className="botao-importar"
          onClick={() => {
            setFeed("");
            setFonte("");
            setCarregando(<h2>Carregando feed</h2>);
            exibirFeed(endereco);
          }}
        >
          Importar feed
        </button>
      </div>

      {carregando}
      <div className="feed">
        {feed}
      </div>
    </>
  );
}



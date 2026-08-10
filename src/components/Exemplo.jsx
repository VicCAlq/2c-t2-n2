import { useState } from "react"
import { baixarFeedRSS } from "./leitorRSS"
import { adicionarNoticia } from "./database"
import { Noticia } from "./ClassesCriadas"

export default function Exemplo({ children }) {

  const [feed, setFeed] = useState("O feed RSS vai aparecer aqui")
  const [fonte, setFonte] = useState("A fonte de notícias vai aparecer aqui")
  const [carregando, setCarregando] = useState("")
  const [endereco, setEndereco] = useState("")

  async function exibirFeed(endereco) {
    setFeed("")
    setFonte("")
    setCarregando(<h2>Carregando feed</h2>)
    await baixarFeedRSS(endereco)
    .then(res => {

    const listaDeNoticias = res.noticias

      for(let noticia of listaDeNoticias){
        const novaNoticia = new Noticia(
          noticia.titulo,
          res.fonte.titulo,
          noticia.link,
          noticia.descricao,
          noticia.dataPublicacao,
          noticia.categorias
        )

        adicionarNoticia(novaNoticia)
      }
      
      

      console.log(res)
      setFeed(<div style={{ margin: "20px auto", borderRadius: "10px", backgroundColor: "teal"}}>
        {res.noticias.map(noticia => {
          <div
            style={{backgroundColor: "#aaa", width: "80vw", padding: "5px"}}
          >
            <p>{res.fonte.titulo}</p>
            <h3>{noticia.titulo}</h3>
          </div>
        })}
      </div>)
      // setFonte(<div>
      //   <p>Título: {res.fonte.titulo}</p>
      //   <p>Link: {res.fonte.link}</p>
      //   <p>Descrição: {res.fonte.descricao}</p>
      // </div>)
    })
    setCarregando("")
  }

  return(<>
    <h2>{children}</h2>
    <input
      type="text"
      onChange={(e) => setEndereco(e.target.value)}
    />
    <button
      onClick={() => {
        setFeed("")
        setFonte("")
        setCarregando(<h2>Carregando feed</h2>)
        exibirFeed(endereco)
      }}
    >Importar feed</button>
    {carregando}
    {feed}
  </>)
}



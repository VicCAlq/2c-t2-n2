import { useState } from "react"
import { baixarFeedRSS } from "./leitorRSS"

export default function Exemplo({ children }) {

  const [feed, setFeed] = useState("O feed RSS vai aparecer aqui")
  const [fonte, setFonte] = useState("A fonte de notícias vai aparecer aqui")
  const [carregando, setCarregando] = useState("")

  async function exibirFeed(endereco) {
    setFeed("")
    setFonte("")
    setCarregando(<h2>Carregando feed</h2>)
    await baixarFeedRSS(endereco)
    .then(res => {
      console.log(res)
      // setFeed(JSON.stringify(res.noticias))
      setFonte(<div>
        <p>Título: {res.fonte.titulo}</p>
        <p>Link: {res.fonte.link}</p>
        <p>Descrição: {res.fonte.descricao}</p>
      </div>)
    })
    setCarregando("")
  }

  return(<>
    <h2>{children}</h2>
    <button
      onClick={() => {
        setFeed("")
        setFonte("")
        setCarregando(<h2>Carregando feed</h2>)
        exibirFeed('https://g1.globo.com/dynamo/natureza/rss2.xml&#39;)
      }}
    >Globo</button>
    <button
      onClick={() => {
        setFeed("")
        setFonte("")
        setCarregando(<h2>Carregando feed</h2>)
        exibirFeed('http://tecnologia.uol.com.br/ultnot/index.xml&#39;)}}
    >UOL</button>
    {carregando}
    <p>{fonte}</p>
    <p>{feed}</p>
  </>)

}

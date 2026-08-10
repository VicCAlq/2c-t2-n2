import { useState } from 'react'
import { listarFontes } from './database.js'

export default function Tabela() {
    const [fontesListadas, defFontesListadas] = useState(null)
    const [placeholder, defPlaceholder] = useState(<small>Nada aqui</small>)

    const carregarFontes = async () => {
        defPlaceholder(<p>Carregando...</p>)

        await listarFontes().then((lista) => {
            defFontesListadas(lista)
        })
    }
    
    return (
        <>
        <button onClick={ () => carregarFontes() }>Carregar fontes</button>
        <button onClick={ () => null }>Filtrar fontes por categoria</button>
        <button onClick={ () => null }>Filtrar notícias por categoria</button>
        <table>
            <thead>
                <tr><th>Fontes</th></tr>
            </thead>
            <tbody>
                { fontesListadas?.map(fonte => <tr><td>{fonte}</td></tr>) || <tr><td>{ placeholder }</td></tr> }
            </tbody>
        </table>
        </>
    )
}

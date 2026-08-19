
export default function TabelaNoticias({ noticias }) {

    return (
        <div className="tabela-container">
            <table className="tabela">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Fonte</th>
                        <th>Descrição</th>
                        <th>Data de publicação</th>
                        <th>Categorias</th>
                    </tr>
                </thead>

                <tbody>
                    {noticias.map((noticia) => (
                        <tr key={noticia.id ?? noticia.link}>
                            <td>{noticia.nome}</td>
                            <td>{noticia.nomeFonte}</td>
                            <td>{noticia.descricao}</td>
                            <td>{noticia.dataPublicacao}</td>
                            <td>
                                {noticia.categorias?.join(", ")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

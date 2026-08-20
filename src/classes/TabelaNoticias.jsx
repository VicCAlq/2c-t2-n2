function TabelaNoticias({ noticias }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Data de Publicação</th>
                    <th>Categoria</th>
                    <th>Link</th>
                </tr>
            </thead>

            <tbody>
                {noticias.map((noticia, index) => (
                    <tr key={index}>
                        <td>{noticia.titulo}</td>

                        <td>{noticia.descricao}</td>

                        <td>{noticia.dataPublicacao}</td>

                        <td>
                            {noticia.categorias.join(", ")}
                        </td>

                        <td>
                            <a href={noticia.link} target="_blank">
                                Ver notícia
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TabelaNoticias;
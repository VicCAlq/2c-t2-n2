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
            <td>{noticia.nome}</td>
            <td>{noticia.descricao}</td>
            <td>{noticia.dataDePublicacao}</td>
            <td>{noticia.categoria.join(", ")}</td>
            <td>
              <a
                href={noticia.endereco}
                target="_blank"
                rel="noopener noreferrer"
              >
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
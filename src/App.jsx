import { useAgregador } from "./components/useAgregador";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#1c2333",
    color: "#e8ebf5",
    padding: "32px",
    fontFamily: "sans-serif",
  },
  titulo: {
    color: "#7fd9c4",
  },
  form: {
    display: "flex",
    gap: "8px",
    margin: "24px 0",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #3a4460",
    backgroundColor: "#252c42",
    color: "#e8ebf5",
  },
  botao: {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#7fd9c4",
    color: "#1c2333",
    fontWeight: "bold",
    cursor: "pointer",
  },
  erro: {
    color: "#ff8080",
  },
  filtros: {
    display: "flex",
    gap: "12px",
    margin: "16px 0",
  },
  select: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #3a4460",
    backgroundColor: "#252c42",
    color: "#e8ebf5",
  },
  tabela: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    padding: "10px",
    borderBottom: "2px solid #7fd9c4",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #2f3750",
  },
  link: {
    color: "#7fd9c4",
  },
};

export default function App() {
  const {
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
  } = useAgregador();

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Agregador de Notícias</h1>

      <form style={styles.form} onSubmit={adicionarFonteHandler}>
        <input
          style={styles.input}
          type="text"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          placeholder="Cole aqui o link do feed RSS"
        />
        <button style={styles.botao} type="submit" disabled={carregando}>
          {carregando ? "Carregando..." : "Adicionar fonte"}
        </button>
      </form>

      {erro && <p style={styles.erro}>{erro}</p>}

      <div style={styles.filtros}>
        <select
          style={styles.select}
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>

        <select
          style={styles.select}
          value={filtroFonte}
          onChange={(e) => setFiltroFonte(e.target.value)}
        >
          {fontes.map((nome) => (
            <option key={nome} value={nome}>
              {nome}
            </option>
          ))}
        </select>
      </div>

      <table style={styles.tabela}>
        <thead>
          <tr>
            <th style={styles.th}>Título</th>
            <th style={styles.th}>Fonte</th>
            <th style={styles.th}>Categoria</th>
            <th style={styles.th}>Data</th>
            <th style={styles.th}>Link</th>
          </tr>
        </thead>
        <tbody>
          {noticiasFiltradas.map((noticia) => (
            <tr key={noticia.id}>
              <td style={styles.td}>{noticia.nome}</td>
              <td style={styles.td}>{noticia.fonte}</td>
              <td style={styles.td}>{noticia.categoria}</td>
              <td style={styles.td}>
                {new Date(noticia.dataDePublicacao).toLocaleDateString()}
              </td>
              <td style={styles.td}>
                <a
                  style={styles.link}
                  href={noticia.endereco}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ler
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

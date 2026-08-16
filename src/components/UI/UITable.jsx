import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { listarNoticias, listarFontes, filtrarNoticiasPorFonte, filtrarNoticiasPorCategoria } from '../db/database.js';

function UITable() {
  const [noticias, setNoticias] = useState([]);
  const [fontes, setFontes] = useState([]);
  const [filtroFonte, setFiltroFonte] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');

  useEffect(() => {
    async function carregarDados() {
      const dados = await listarNoticias();
      const fontesData = await listarFontes();
      
      setNoticias(dados);
      setFontes(fontesData);
    }

    carregarDados();
  }, []);

  useEffect(() => {
    async function aplicarFiltros() {
      let filtradas = await listarNoticias();

      if (filtroFonte) {
        filtradas = await filtrarNoticiasPorFonte(filtroFonte);
      }

      if (filtroCategoria) {
        filtradas = await filtrarNoticiasPorCategoria(filtroCategoria);
        if (filtroFonte) {
          filtradas = filtradas.filter(item => item.nomeFonte === filtroFonte);
        }
      }

      setNoticias(filtradas);
    }

    aplicarFiltros();
  }, [filtroFonte, filtroCategoria]);

  const categorias = [...new Set(noticias.flatMap(n => n.categorias || []))];

  return (
    <>
      <div className="mb-3">
        <Form.Select 
          value={filtroFonte} 
          onChange={(e) => setFiltroFonte(e.target.value)}
          className="mb-2"
        >
          <option value="">Filtrar por Fonte</option>
          {fontes.map((fonte) => (
            <option key={fonte.id} value={fonte.nome}>
              {fonte.nome}
            </option>
          ))}
        </Form.Select>

        <Form.Select 
          value={filtroCategoria} 
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="">Filtrar por Categoria</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </Form.Select>
      </div>

      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Endereço</th>
            <th>Descrição</th>
            <th>Data de Publicação</th>
            <th>Categoria</th>
          </tr>
        </thead>

        <tbody>
          {noticias.map((noticia, index) => (
            <tr key={noticia.id}>
              <td>{index + 1}</td>
              <td>{noticia.nome}</td>
              <td>
                <a
                  href={noticia.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {noticia.link}
                </a>
              </td>
              <td>{noticia.descricao}</td>
              <td>
                {new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR')}
              </td>
              <td>
                {noticia.categorias?.join(', ') || 'Sem categoria'}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default UITable;
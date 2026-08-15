import Table from 'react-bootstrap/Table';

function UITable() {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Titulo</th>
          <th>Endereço</th>
          <th>Descrição</th>
          <th>Data de Publicação</th>
          <th>Categoria</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>2023-01-01</td>
          <td>categoria1</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>2023-01-02</td>
          <td>categoria2</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default UITable;
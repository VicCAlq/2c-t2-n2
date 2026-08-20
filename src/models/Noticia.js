export class Noticia {
  constructor(nome, endereco, descricao = '', dataDePublicacao = null, categoria = 'Geral', fonte = 'Portal', id = undefined) {
    if (id !== undefined) {
      this.id = id;
    }
    this.nome = nome || 'Sem título';
    this.endereco = endereco || '';
    this.descricao = descricao || '';
    
    const dataIso = dataDePublicacao ? new Date(dataDePublicacao).toISOString() : new Date().toISOString();
    this.dataDePublicacao = dataIso;
    this.dataPublicacao = dataIso;
    
    this.categoria = typeof categoria === 'string' ? categoria : (Array.isArray(categoria) && categoria[0] ? categoria[0] : 'Geral');
    this.categorias = Array.isArray(categoria) ? categoria : [this.categoria];
    
    this.fonte = fonte || 'Geral';
  }
}

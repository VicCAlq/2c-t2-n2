export class FonteNoticia {
  constructor(nome, endereco, descricao = '', categoria = 'Geral', id = undefined) {
    if (id !== undefined) {
      this.id = id;
    }
    this.nome = nome || 'Fonte Sem Nome';
    this.endereco = endereco || '';
    this.descricao = descricao || '';
    this.categoria = categoria || 'Geral';
  }
}

export class FonteNoticia {
  constructor(nome, endereco, descricao = '', categoria = 'Geral') {
    this.nome = nome;
    this.endereco = endereco;
    this.descricao = descricao;
    this.categoria = categoria;
  }
}

export class Noticia {
    constructor(nome, nomeFonte, link, descricao, dataPublicacao, categorias){
        this.nome = nome;
        this.nomeFonte = nomeFonte;
        this.link = link;
        this.descricao = descricao;
        this.dataPublicacao = dataPublicacao;
        this.categorias = categorias;
    }
}
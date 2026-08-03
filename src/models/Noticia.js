function gerarIdDinamico(prefixo, str) {
  if (!str) return prefixo + '_' + Math.random().toString(36).substring(2, 9);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return `${prefixo}_${Math.abs(hash).toString(36)}`;
}

export class Noticia {
  constructor(nome, endereco, descricao = '', dataDePublicacao = new Date().toISOString(), categoria = 'Geral', fonte = '') {
    this.id = gerarIdDinamico('noticia', endereco || nome);
    this.nome = nome;
    this.endereco = endereco;
    this.descricao = descricao;
    this.dataDePublicacao = dataDePublicacao;
    this.categoria = categoria;
    this.fonte = fonte;
  }
}

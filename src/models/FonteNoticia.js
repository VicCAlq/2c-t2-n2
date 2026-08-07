function gerarIdDinamico(prefixo, str) {
  if (!str) return prefixo + '_' + Math.random().toString(36).substring(2, 9);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return `${prefixo}_${Math.abs(hash).toString(36)}`;
}

export class FonteNoticia {
  constructor(nome, endereco, descricao = '', categoria = 'Geral') {
    this.id = gerarIdDinamico('fonte', nome + endereco);
    this.nome = nome;
    this.endereco = endereco;
    this.descricao = descricao;
    this.categoria = categoria;
  }
}

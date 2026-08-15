class FontesNoticias {
    constructor(nome, endereco, descricao, categoria) {
        this.nome = nome;
        this.endereco = endereco;
        this.descricao = descricao;
        this.categoria = categoria;
    }
}

class Noticias {
    constructor(nome, endereco, descricao, dataDePublicacao,  categoria, fonte) {
        this.nome = nome;
        this.endereco = endereco;
        this.descricao = descricao;
        this.dataDePublicacao = dataDePublicacao;
        this.categoria = categoria;
        this.fonte = fonte;
    }
}

export { FontesNoticias, Noticias };
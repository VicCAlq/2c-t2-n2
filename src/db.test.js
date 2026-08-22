import { describe, it, expect } from 'vitest';
import { FonteNoticia } from './models/FonteNoticia';
import { Noticia } from './models/Noticia';
import { connectarDB, adicionarFonte, listarFontes, removerFonte, adicionarNoticia, listarNoticias, filtrarNoticiasPorFonte, filtrarNoticiasPorCategoria, removerNoticia } from './utils/db';

describe('Modelos FonteNoticia e Noticia', () => {
  it('deve instanciar FonteNoticia com valores padrões', () => {
    const fonte = new FonteNoticia('G1', 'https://g1.globo.com/rss/');
    expect(fonte.nome).toBe('G1');
    expect(fonte.endereco).toBe('https://g1.globo.com/rss/');
    expect(fonte.categoria).toBe('Geral');
  });

  it('deve instanciar Noticia com suporte a categorias e datas', () => {
    const noticia = new Noticia('Título Teste', 'https://g1.globo.com/item', 'Descrição', new Date().toISOString(), 'Tecnologia', 'G1');
    expect(noticia.nome).toBe('Título Teste');
    expect(noticia.categoria).toBe('Tecnologia');
    expect(noticia.categorias).toEqual(['Tecnologia']);
    expect(noticia.dataDePublicacao).toBeDefined();
    expect(noticia.dataPublicacao).toBe(noticia.dataDePublicacao);
  });

  it('deve exportar todas as funções de IndexedDB requeridas', () => {
    expect(typeof connectarDB).toBe('function');
    expect(typeof adicionarFonte).toBe('function');
    expect(typeof listarFontes).toBe('function');
    expect(typeof removerFonte).toBe('function');
    expect(typeof adicionarNoticia).toBe('function');
    expect(typeof listarNoticias).toBe('function');
    expect(typeof filtrarNoticiasPorFonte).toBe('function');
    expect(typeof filtrarNoticiasPorCategoria).toBe('function');
    expect(typeof removerNoticia).toBe('function');
  });
});

import { baixarFeedRSS } from './leitorRSS.js';
import { FonteNoticia, Noticia } from './Classes.js';

import { adicionarFonte, adicionarNoticia } from '../db/database.js';

async function AddFeed(endereco, categoria = 'Geral') {
  const feed = await baixarFeedRSS(endereco);

  const fonte = new FonteNoticia(
    feed.titulo,
    endereco,
    feed.descricao,
    categoria
  );

  await adicionarFonte(fonte);

  for (const noticiaRSS of feed.noticias) {
    const noticia = new Noticia(
      noticiaRSS.titulo,
      fonte.nome,
      noticiaRSS.link,
      noticiaRSS.descricao,
      noticiaRSS.dataPublicacao,
      noticiaRSS.categorias
    );

    await adicionarNoticia(noticia);
  }

  console.log(`Feed RSS adicionado com sucesso: ${feed.titulo}`);
}

export default AddFeed;
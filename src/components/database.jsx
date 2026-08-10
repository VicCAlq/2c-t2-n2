import { openDB } from 'idb';

const DB_NOME = 'agregador';
const DB_VERSAO = 1;

function connectarDB() {
  return openDB(DB_NOME, DB_VERSAO, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('fontes')) {
        const fontes = db.createObjectStore('fontes', { keyPath: 'id', autoIncrement: true });
        fontes.createIndex('nome', 'nome', { unique: false });
      }

      if (!db.objectStoreNames.contains('noticias')) {
        const noticias = db.createObjectStore('noticias', { keyPath: 'id', autoIncrement: true });
        noticias.createIndex('nome', 'nome', { unique: false });
        noticias.createIndex('fonte', 'fonte', { unique: false });
        noticias.createIndex('categorias', 'categorias', { unique: false });
        noticias.createIndex('dataPublicacao', 'dataPublicacao', { unique: false });
      }
    },
  });
}

async function adicionarFonte(fonte) {
  const db = await connectarDB();
  return db.add('fontes', fonte);
}

async function listarFontes() {
  const db = await connectarDB();
  return db.getAll('fontes');
}

async function removerFonte(id) {
  const db = await connectarDB();
  return db.delete('fontes', id);
}

async function adicionarNoticia(noticia) {
  const db = await connectarDB();
  return db.add('noticias', noticia);
}

async function listarNoticias() {
  const db = await connectarDB();
  return db.getAll('noticias');
}

async function filtrarNoticiasPorFonte(fonte) {
  const db = await connectarDB();
  return db.getAllFromIndex('noticias', 'fonte', fonte);
}

async function filtrarNoticiasPorCategoria(categoria) {
  const db = await connectarDB();
  const todas = await db.getAll('noticias');
  return todas.filter(n => n.categorias.includes(categoria));
}

async function removerNoticia(id) {
  const db = await connectarDB();
  return db.delete('noticias', id);
}

export {
  connectarDB,
  adicionarFonte,
  listarFontes,
  removerFonte,
  adicionarNoticia,
  listarNoticias,
  filtrarNoticiasPorFonte,
  filtrarNoticiasPorCategoria,
  removerNoticia,
};
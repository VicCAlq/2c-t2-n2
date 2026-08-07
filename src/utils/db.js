import { openDB } from 'idb';

const DB_NAME = 'noticias_app_db';
const DB_VERSION = 1;

export async function obterDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('fontes')) {
        db.createObjectStore('fontes', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('noticias')) {
        db.createObjectStore('noticias', { keyPath: 'id' });
      }
    },
  });
}

export async function carregarFontesIDB() {
  try {
    const db = await obterDB();
    return await db.getAll('fontes');
  } catch (error) {
    console.error('Erro ao carregar fontes do IndexedDB:', error);
    return [];
  }
}

export async function salvarFontesIDB(fontes) {
  try {
    const db = await obterDB();
    const tx = db.transaction('fontes', 'readwrite');
    await tx.objectStore('fontes').clear();
    for (const fonte of fontes) {
      await tx.objectStore('fontes').put(fonte);
    }
    await tx.done;
  } catch (error) {
    console.error('Erro ao salvar fontes no IndexedDB:', error);
  }
}

export async function carregarNoticiasIDB() {
  try {
    const db = await obterDB();
    return await db.getAll('noticias');
  } catch (error) {
    console.error('Erro ao carregar notícias do IndexedDB:', error);
    return [];
  }
}

export async function salvarNoticiasIDB(noticias) {
  try {
    const db = await obterDB();
    const tx = db.transaction('noticias', 'readwrite');
    await tx.objectStore('noticias').clear();
    for (const noticia of noticias) {
      await tx.objectStore('noticias').put(noticia);
    }
    await tx.done;
  } catch (error) {
    console.error('Erro ao salvar notícias no IndexedDB:', error);
  }
}

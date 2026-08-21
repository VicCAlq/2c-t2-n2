import { FonteNoticia } from '../models/FonteNoticia';
import { Noticia } from '../models/Noticia';

const PROXY_FETCHERS = [
  async (url) => {
    const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.text();
  },
  async (url) => {
    const res = await fetch(`https://corsproxy.io/?url=${encodeURIComponent(url)}`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.text();
  },
  async (url) => {
    const res = await fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.text();
  },
  async (url) => {
    const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    if (json && json.contents) return json.contents;
    throw new Error('Conteúdo vazio');
  },
  async (url) => {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.text();
  }
];

function decodificarTexto(str) {
  if (!str) return '';
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value.trim();
}

function limparHTML(htmlStr) {
  if (!htmlStr) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = htmlStr;
  const textoLimpo = tmp.textContent || tmp.innerText || '';
  return decodificarTexto(textoLimpo).replace(/\s+/g, ' ').trim();
}

async function fetchComProxy(endereco) {
  let urlNormalizada = endereco.trim();
  if (!urlNormalizada.startsWith('http://') && !urlNormalizada.startsWith('https://')) {
    urlNormalizada = `https://${urlNormalizada}`;
  }

  let ultimoErro = null;

  for (const fetcher of PROXY_FETCHERS) {
    try {
      const texto = await fetcher(urlNormalizada);
      if (texto && (
        texto.includes('<rss') || 
        texto.includes('<feed') || 
        texto.includes('<xml') || 
        texto.includes('<?xml') ||
        texto.includes('<channel') ||
        texto.includes('<item') ||
        texto.includes('<entry')
      )) {
        return texto;
      }
    } catch (err) {
      ultimoErro = err;
    }
  }

  throw new Error(ultimoErro?.message ? `Não foi possível carregar o feed: ${ultimoErro.message}` : 'Não foi possível carregar o feed RSS. Verifique o link e tente novamente.');
}

function lerRSS(textoXML, urlOrigem, categoriaManual = '') {
  const parser = new DOMParser();
  const doc = parser.parseFromString(textoXML, 'text/xml');

  const parseErro = doc.querySelector('parsererror');
  if (parseErro && !doc.querySelector('item') && !doc.querySelector('entry')) {
    throw new Error('Formato XML inválido: certifique-se de que a URL aponta para um feed RSS/Atom.');
  }

  const formatoAtom = doc.documentElement.nodeName === 'feed' || doc.querySelector('entry') !== null;

  let titulo = '';
  let descricao = '';
  let link = urlOrigem;
  let noticiasArray = [];

  if (formatoAtom) {
    titulo = decodificarTexto(doc.querySelector('feed > title, title')?.textContent) || 'Fonte de Notícias';
    descricao = decodificarTexto(doc.querySelector('feed > subtitle, subtitle')?.textContent) || 'Feed de notícias Atom';
    
    const altLink = doc.querySelector('feed > link[rel="alternate"]')?.getAttribute('href') ||
                    doc.querySelector('feed > link:not([rel])')?.getAttribute('href');
    if (altLink) link = altLink;

    const entries = doc.querySelectorAll('entry');
    entries.forEach(entry => {
      let valorLink = entry.querySelector('link[rel="alternate"]')?.getAttribute('href') ||
                      entry.querySelector('link:not([rel])')?.getAttribute('href') ||
                      entry.querySelector('link')?.getAttribute('href') ||
                      entry.querySelector('id')?.textContent || urlOrigem;
      
      valorLink = valorLink ? valorLink.trim() : urlOrigem;

      const content = entry.querySelector('content')?.textContent || '';
      const summary = entry.querySelector('summary')?.textContent || '';
      const cat = entry.querySelector('category')?.getAttribute('term') || 
                  entry.querySelector('category')?.getAttribute('label') || 
                  entry.querySelector('category')?.textContent || 
                  categoriaManual || 'Geral';

      const descTexto = limparHTML(summary || content).substring(0, 300);
      const tituloItem = decodificarTexto(entry.querySelector('title')?.textContent) || 'Sem título';
      const dataPub = entry.querySelector('published')?.textContent || 
                      entry.querySelector('updated')?.textContent || 
                      new Date().toISOString();

      noticiasArray.push({
        nome: tituloItem,
        endereco: valorLink,
        descricao: descTexto || 'Nenhum resumo disponível.',
        dataDePublicacao: dataPub,
        categoria: cat || 'Geral'
      });
    });
  } else {
    const canal = doc.querySelector('channel') || doc.documentElement;
    titulo = decodificarTexto(canal.querySelector('title')?.textContent) || 'Fonte de Notícias';
    descricao = decodificarTexto(canal.querySelector('description')?.textContent) || 'Feed de notícias RSS';
    
    const canalLink = canal.querySelector('link')?.textContent;
    if (canalLink && canalLink.trim().startsWith('http')) {
      link = canalLink.trim();
    }

    const itens = doc.querySelectorAll('item');
    itens.forEach(item => {
      const linkElem = item.querySelector('link');
      let itemLink = linkElem?.textContent?.trim() || linkElem?.getAttribute('href')?.trim();
      const guid = item.querySelector('guid')?.textContent?.trim();

      if (!itemLink || !itemLink.startsWith('http')) {
        if (guid && guid.startsWith('http')) {
          itemLink = guid;
        } else {
          itemLink = urlOrigem;
        }
      }

      const itemDesc = item.querySelector('description')?.textContent || '';
      const conteudoEncoded = item.querySelector('content\\:encoded, encoded')?.textContent || '';

      const descTexto = limparHTML(conteudoEncoded || itemDesc).substring(0, 300);
      const catElem = item.querySelector('category')?.textContent;
      const cat = catElem?.trim() || categoriaManual || 'Geral';
      const tituloItem = decodificarTexto(item.querySelector('title')?.textContent) || 'Sem título';
      const dataPub = item.querySelector('pubDate')?.textContent || 
                      item.querySelector('dc\\:date, date')?.textContent || 
                      new Date().toISOString();

      noticiasArray.push({
        nome: tituloItem,
        endereco: itemLink,
        descricao: descTexto || 'Nenhum resumo disponível.',
        dataDePublicacao: dataPub,
        categoria: cat || 'Geral'
      });
    });
  }

  const categoriaFonte = categoriaManual || (noticiasArray[0]?.categoria) || 'Tecnologia';
  const nomeFinalFonte = titulo.trim() || 'Fonte RSS';
  const fonteObj = new FonteNoticia(nomeFinalFonte, urlOrigem, descricao, categoriaFonte);

  const noticiasInstancias = noticiasArray.slice(0, 50).map(n => 
    new Noticia(
      n.nome,
      n.endereco,
      n.descricao,
      n.dataDePublicacao,
      n.categoria,
      nomeFinalFonte
    )
  );

  return {
    fonte: fonteObj,
    noticias: noticiasInstancias
  };
}

async function baixarFeedRSS(url, categoriaManual = '') {
  const textoXML = await fetchComProxy(url);
  return lerRSS(textoXML, url, categoriaManual);
}

export { fetchComProxy, lerRSS, baixarFeedRSS };

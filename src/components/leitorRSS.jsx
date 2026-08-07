/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-assignment */
import { FonteNoticia } from '../models/FonteNoticia';
import { Noticia } from '../models/Noticia';

const PROXY = 'https://corsproxy.io/?url=';

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
  return decodificarTexto(textoLimpo);
}

async function fetchComProxy(endereco) {
  
  let erroMaisRecente = null;

  try {
    const proxyEndereco = PROXY + encodeURIComponent(endereco);
    const resposta = await fetch(proxyEndereco, {
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    });

    if (!resposta.ok) {
      erroMaisRecente = new Error(`HTTP status ${resposta.status}`);
    } else {
      const texto = await resposta.text();
      return texto;
    }
  } catch (err) {
    erroMaisRecente = err;
  }
  try {
    const resposta = await fetch(endereco);
    if (resposta.ok) {
      return await resposta.text();
    }
  // eslint-disable-next-line no-empty
  } catch (e) {
  }

  throw erroMaisRecente || new Error('Não foi possível carregar o feed. Verifique o endereço URL.');
}

function lerRSS(textoXML, urlOrigem, categoriaManual = '') {
  const parser = new DOMParser();
  const doc = parser.parseFromString(textoXML, 'text/xml');

  const parseErro = doc.querySelector('parsererror');
  if (parseErro) {
    throw new Error('XML inválido: não foi possível ler a estrutura do RSS feed.');
  }

  const formatoAtom = doc.documentElement.nodeName === 'feed';

  let titulo = '';
  let descricao = '';
  let link = urlOrigem;
  let noticiasArray = [];

  if (formatoAtom) {
    titulo = decodificarTexto(doc.querySelector('feed > title')?.textContent) || 'Fonte RSS';
    descricao = decodificarTexto(doc.querySelector('feed > subtitle')?.textContent) || 'Feed de notícias Atom';
    const altLink = doc.querySelector('feed > link[rel="alternate"]')?.getAttribute('href') ||
                     doc.querySelector('feed > link:not([rel])')?.getAttribute('href');
    if (altLink) link = altLink;

    const entries = doc.querySelectorAll('entry');
    entries.forEach(entry => {
      let valorLink = entry.querySelector('link[rel="alternate"]')?.getAttribute('href') ||
                        entry.querySelector('link:not([rel])')?.getAttribute('href') ||
                        entry.querySelector('link')?.getAttribute('href') ||
                        entry.querySelector('id')?.textContent || urlOrigem;
      
      valorLink = valorLink.trim();

      const content = entry.querySelector('content')?.textContent || '';
      const summary = entry.querySelector('summary')?.textContent || '';
      const cat = entry.querySelector('category')?.getAttribute('term') || entry.querySelector('category')?.textContent || categoriaManual || 'Geral';

      const descTexto = limparHTML(summary || content).substring(0, 280);

      noticiasArray.push({
        nome: decodificarTexto(entry.querySelector('title')?.textContent) || 'Sem título',
        endereco: valorLink,
        descricao: descTexto || 'Sem descrição disponível.',
        dataDePublicacao: entry.querySelector('updated')?.textContent || entry.querySelector('published')?.textContent || new Date().toISOString(),
        categoria: cat || 'Geral'
      });
    });
  } else {
    const canal = doc.querySelector('channel') || doc.documentElement;
    titulo = decodificarTexto(canal.querySelector('title')?.textContent) || 'Fonte RSS';
    descricao = decodificarTexto(canal.querySelector('description')?.textContent) || 'Feed de notícias RSS';
    const canalLink = canal.querySelector('link')?.textContent;
    if (canalLink) link = canalLink.trim();

    const itens = doc.querySelectorAll('item');
    itens.forEach(item => {
      let itemLink = item.querySelector('link')?.textContent?.trim();
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

      const descTexto = limparHTML(conteudoEncoded || itemDesc).substring(0, 280);
      const catElem = item.querySelector('category')?.textContent;
      const cat = catElem || categoriaManual || 'Geral';

      noticiasArray.push({
        nome: decodificarTexto(item.querySelector('title')?.textContent) || 'Sem título',
        endereco: itemLink,
        descricao: descTexto || 'Sem descrição disponível.',
        dataDePublicacao: item.querySelector('pubDate')?.textContent || item.querySelector('dc\\:date, date')?.textContent || new Date().toISOString(),
        categoria: cat || 'Geral'
      });
    });
  }

  const categoriaFonte = categoriaManual || (noticiasArray[0]?.categoria) || 'Tecnologia';
  const fonteObj = new FonteNoticia(titulo, link, descricao, categoriaFonte);

  const noticiasInstancias = noticiasArray.slice(0, 30).map(n => 
    new Noticia(
      n.nome,
      n.endereco,
      n.descricao,
      n.dataDePublicacao,
      n.categoria,
      fonteObj.nome
    )
  );

  return {
    fonte: fonteObj,
    noticias: noticiasInstancias
  };
}

export async function baixarFeedRSS(url, categoriaManual = '') {
  const textoXML = await fetchComProxy(url);
  return lerRSS(textoXML, url, categoriaManual);
}

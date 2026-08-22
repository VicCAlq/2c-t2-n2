import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import FormFonteNoticia from './components/FormFonteNoticia';
import FiltrosTabela from './components/FiltrosTabela';
import TabelaNoticias from './components/TabelaNoticias';
import ModalNoticia from './components/ModalNoticia';
import GerenciadorFontes from './components/GerenciadorFontes';

import { FonteNoticia } from './models/FonteNoticia';
import { Noticia } from './models/Noticia';
import { baixarFeedRSS } from './components/leitorRSS';
import { 
  carregarFontesIDB, 
  salvarFontesIDB, 
  carregarNoticiasIDB, 
  salvarNoticiasIDB,
  removerFonte as removerFonteIDB,
  limparTudoDB
} from './utils/db';

export default function App() {
  const [fontes, setFontes] = useState([]);
  const [noticias, setNoticias] = useState([]);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [fonteSelecionada, setFonteSelecionada] = useState('');
  const [termoBusca, setTermoBusca] = useState('');
  
  const [noticiaModal, setNoticiaModal] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [dbCarregado, setDbCarregado] = useState(false);

  useEffect(() => {
    async function inicializarLimpo() {
      if (!localStorage.getItem('n2_limpo_v2')) {
        await limparTudoDB();
        localStorage.setItem('n2_limpo_v2', 'true');
        setFontes([]);
        setNoticias([]);
        setDbCarregado(true);
        return;
      }

      try {
        const fontesIDB = await carregarFontesIDB();
        const noticiasIDB = await carregarNoticiasIDB();

        if (fontesIDB && fontesIDB.length > 0) {
          setFontes(fontesIDB.map(f => new FonteNoticia(f.nome, f.endereco, f.descricao, f.categoria, f.id)));
        } else {
          setFontes([]);
        }

        if (noticiasIDB && noticiasIDB.length > 0) {
          setNoticias(noticiasIDB.map(n => new Noticia(n.nome, n.endereco, n.descricao, n.dataDePublicacao || n.dataPublicacao, n.categoria, n.fonte, n.id)));
        } else {
          setNoticias([]);
        }
      } catch (_) {
        setFontes([]);
        setNoticias([]);
      } finally {
        setDbCarregado(true);
      }
    }
    inicializarLimpo();
  }, []);

  useEffect(() => {
    if (dbCarregado) {
      salvarFontesIDB(fontes);
    }
  }, [fontes, dbCarregado]);

  useEffect(() => {
    if (dbCarregado) {
      salvarNoticiasIDB(noticias);
    }
  }, [noticias, dbCarregado]);

  const categoriasUnicas = useMemo(() => {
    const conjunto = new Set();
    fontes.forEach(f => f.categoria && conjunto.add(f.categoria));
    noticias.forEach(n => n.categoria && conjunto.add(n.categoria));
    return Array.from(conjunto).sort();
  }, [fontes, noticias]);

  const handleAdicionarFonte = async ({ endereco, nome, categoria, descricao }) => {
    setCarregando(true);
    try {
      const resultado = await baixarFeedRSS(endereco);

      // Monta objeto de fonte com os dados retornados ou os fornecidos pelo usuário
      const nomeFonte = nome.trim() || resultado.titulo || 'Fonte RSS';
      const categoriaFonte = categoria.trim() || resultado.noticias?.[0]?.categorias?.[0] || 'Geral';
      const descricaoFonte = descricao.trim() || resultado.descricao || '';

      const novaFonte = new FonteNoticia(nomeFonte, endereco.trim(), descricaoFonte, categoriaFonte);

      setFontes(prev => [novaFonte, ...prev.filter(f => f.endereco !== endereco.trim())]);

      // Converte as notícias do novo formato para Noticia
      const noticiasProcessadas = (resultado.noticias || []).map(item =>
        new Noticia(
          item.titulo,
          item.link,
          item.descricao,
          item.dataPublicacao,
          item.categorias?.[0] || categoriaFonte,
          nomeFonte
        )
      );

      if (noticiasProcessadas.length > 0) {
        setNoticias(prev => {
          const linksExistentes = new Set(prev.map(n => n.endereco));
          const apenasNovas = noticiasProcessadas.filter(n => !linksExistentes.has(n.endereco));
          return [...apenasNovas, ...prev];
        });
      }
    } catch (err) {
      throw new Error(err.message || 'Não foi possível ler o feed RSS informado.');
    } finally {
      setCarregando(false);
    }
  };

  const handleAtualizarFeeds = async () => {
    if (fontes.length === 0) return;

    setCarregando(true);
    let novasNoticiasAcumuladas = [];

    for (const fonte of fontes) {
      if (fonte.endereco && fonte.endereco.startsWith('http')) {
        try {
          const res = await baixarFeedRSS(fonte.endereco);
          if (res && res.noticias) {
            const convertidas = res.noticias.map(item =>
              new Noticia(
                item.titulo,
                item.link,
                item.descricao,
                item.dataPublicacao,
                item.categorias?.[0] || fonte.categoria || 'Geral',
                fonte.nome
              )
            );
            novasNoticiasAcumuladas.push(...convertidas);
          }
        } catch (_) {}
      }
    }

    if (novasNoticiasAcumuladas.length > 0) {
      setNoticias(prev => {
        const linksExistentes = new Set(prev.map(item => item.endereco));
        const apenasNovas = novasNoticiasAcumuladas.filter(n => !linksExistentes.has(n.endereco));
        if (apenasNovas.length > 0) return [...apenasNovas, ...prev];
        return prev;
      });
    }
    setCarregando(false);
  };

  const handleRemoverFonte = async (idOuNome) => {
    const novasFontes = fontes.filter(f => f.id !== idOuNome && f.nome !== idOuNome);
    setFontes(novasFontes);
    if (novasFontes.length === 0) {
      setNoticias([]);
      await limparTudoDB();
    } else if (typeof idOuNome === 'number') {
      try {
        await removerFonteIDB(idOuNome);
      } catch (_) {}
    }
  };

  const handleLimparTudo = async () => {
    await limparTudoDB();
    setFontes([]);
    setNoticias([]);
    setCategoriaSelecionada('');
    setFonteSelecionada('');
    setTermoBusca('');
  };

  const handleLimparFiltros = () => {
    setCategoriaSelecionada('');
    setFonteSelecionada('');
    setTermoBusca('');
  };

  const noticiasFiltradas = useMemo(() => {
    return noticias.filter(noticia => {
      if (!noticia) return false;

      if (categoriaSelecionada && noticia.categoria && noticia.categoria.toLowerCase() !== categoriaSelecionada.toLowerCase()) {
        return false;
      }
      if (fonteSelecionada && noticia.fonte && noticia.fonte.toLowerCase() !== fonteSelecionada.toLowerCase()) {
        return false;
      }
      if (termoBusca.trim()) {
        const termo = termoBusca.toLowerCase();
        const noNome = noticia.nome ? noticia.nome.toLowerCase().includes(termo) : false;
        const naDescricao = noticia.descricao ? noticia.descricao.toLowerCase().includes(termo) : false;
        if (!noNome && !naDescricao) return false;
      }
      return true;
    });
  }, [noticias, categoriaSelecionada, fonteSelecionada, termoBusca]);

  const noticiaDestaque = noticiasFiltradas[0] || noticias[0];

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-page)' }}>
      <Header 
        totalNoticias={noticias.length}
        totalFontes={fontes.length}
        aoAtualizarFeeds={handleAtualizarFeeds}
        aoLimparTudo={handleLimparTudo}
        carregando={carregando}
        noticiaDestaque={noticiaDestaque}
      />

      <main className="nf-container">
        <FormFonteNoticia 
          aoAdicionarFonte={handleAdicionarFonte}
          carregando={carregando}
        />

        <FiltrosTabela 
          categorias={categoriasUnicas}
          fontes={fontes}
          categoriaSelecionada={categoriaSelecionada}
          setCategoriaSelecionada={setCategoriaSelecionada}
          fonteSelecionada={fonteSelecionada}
          setFonteSelecionada={setFonteSelecionada}
          termoBusca={termoBusca}
          setTermoBusca={setTermoBusca}
          aoLimparFiltros={handleLimparFiltros}
        />

        <TabelaNoticias 
          noticias={noticiasFiltradas}
          aoSelecionarNoticia={setNoticiaModal}
          aoLimparFiltros={handleLimparFiltros}
        />

        <GerenciadorFontes 
          fontes={fontes}
          aoRemoverFonte={handleRemoverFonte}
          aoLimparTudo={handleLimparTudo}
        />

        <ModalNoticia 
          noticia={noticiaModal}
          aoFechar={() => setNoticiaModal(null)}
        />
      </main>
    </div>
  );
}

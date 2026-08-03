/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import FormFonteNoticia from './components/FormFonteNoticia';
import FiltrosTabela from './components/FiltrosTabela';
import TabelaNoticias from './components/TabelaNoticias';
import ModalNoticia from './components/ModalNoticia';
import GerenciadorFontes from './components/GerenciadorFontes';

import { FonteNoticia } from './models/FonteNoticia';
import { Noticia } from './models/Noticia';
import { fontesIniciais, noticiasIniciais } from './data/dadosIniciais';
import { baixarFeedRSS } from './components/leitorRSS';
import { Toaster, toast } from 'sonner';

export default function App() {
  const [fontes, setFontes] = useState(() => {
    try {
      const salvas = localStorage.getItem('n2_fontes');
      if (salvas) {
        const parsed = JSON.parse(salvas);
        return parsed.map(f => new FonteNoticia(f.nome, f.endereco, f.descricao, f.categoria));
      }
    } catch (_) { /* localStorage indisponível */ }
    return fontesIniciais;
  });

  const [noticias, setNoticias] = useState(() => {
    try {
      const salvas = localStorage.getItem('n2_noticias');
      if (salvas) {
        const parsed = JSON.parse(salvas);
        return parsed.map(n => new Noticia(n.nome, n.endereco, n.descricao, n.dataDePublicacao, n.categoria, n.fonte));
      }
    } catch (_) { /* localStorage indisponível */ }
    return noticiasIniciais;
  });

  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [fonteSelecionada, setFonteSelecionada] = useState('');
  const [termoBusca, setTermoBusca] = useState('');
  
  const [noticiaModal, setNoticiaModal] = useState(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('n2_fontes', JSON.stringify(fontes));
    } catch (_) { /* ignora */ }
  }, [fontes]);

  useEffect(() => {
    try {
      localStorage.setItem('n2_noticias', JSON.stringify(noticias));
    } catch (_) { /* ignora */ }
  }, [noticias]);

  const categoriasUnicas = useMemo(() => {
    const conjunto = new Set();
    fontes.forEach(f => f.categoria && conjunto.add(f.categoria));
    noticias.forEach(n => n.categoria && conjunto.add(n.categoria));
    return Array.from(conjunto).sort();
  }, [fontes, noticias]);

  const handleAdicionarFonte = async ({ endereco, nome, categoria, descricao }) => {
    setCarregando(true);
    try {
      const resultadoRSS = await baixarFeedRSS(endereco, categoria);

      if (resultadoRSS && resultadoRSS.fonte) {
        const novaFonte = resultadoRSS.fonte;
        if (nome) novaFonte.nome = nome;
        if (categoria) novaFonte.categoria = categoria;
        if (descricao) novaFonte.descricao = descricao;

        setFontes(prev => [novaFonte, ...prev.filter(f => f.id !== novaFonte.id)]);

        setNoticias(prev => {
          const idsExistentes = new Set(prev.map(n => n.id));
          const apenasNovas = resultadoRSS.noticias.filter(n => !idsExistentes.has(n.id));
          return [...apenasNovas, ...prev];
        });
      }
    // eslint-disable-next-line no-unused-vars
    } catch (_) {
      const nomeFonte = nome || `Fonte ${fontes.length + 1}`;
      const novaFonte = new FonteNoticia(nomeFonte, endereco, descricao || 'Fonte adicionada manualmente.', categoria || 'Geral');
      
      const noticiaManual = new Noticia(
        `Destaque de ${novaFonte.nome}`,
        endereco,
        `Esta notícia foi vinculada à fonte de notícias (${novaFonte.nome}).`,
        new Date().toISOString(),
        novaFonte.categoria,
        novaFonte.nome
      );

      setFontes(prev => [novaFonte, ...prev]);
      setNoticias(prev => [noticiaManual, ...prev]);
    } finally {
      setCarregando(false);
    }
  };

  const handleAtualizarFeeds = async () => {
    setCarregando(true);
    toast.info('Sincronizando feeds RSS...');
    let novasNoticiasAcumuladas = [];

    for (const fonte of fontes) {
      if (fonte.endereco && fonte.endereco.startsWith('http')) {
        try {
          const res = await baixarFeedRSS(fonte.endereco, fonte.categoria);
          if (res && res.noticias) {
            novasNoticiasAcumuladas.push(...res.noticias);
          }
        } catch (_) { /* ignora falha  */ }
      }
    }

    if (novasNoticiasAcumuladas.length > 0) {
      setNoticias(prev => {
        const idsExistentes = new Set(prev.map(item => item.id));
        const noticiasVerdadeiramenteNovas = novasNoticiasAcumuladas.filter(n => !idsExistentes.has(n.id));

        if (noticiasVerdadeiramenteNovas.length > 0) {
          toast.success(`${noticiasVerdadeiramenteNovas.length} nova(s) notícia(s) adicionada(s)!`);
          return [...noticiasVerdadeiramenteNovas, ...prev];
        } else {
          toast.success('Sincronização concluída. Todas as notícias já estavam atualizadas.');
          return prev;
        }
      });
    } else {
      toast.success('Todas as notícias já estão atualizadas.');
    }
    setCarregando(false);
  };

  const handleRemoverFonte = (idOuNome) => {
    setFontes(prev => prev.filter(f => f.id !== idOuNome && f.nome !== idOuNome));
    toast.info('Fonte removida.');
  };

  const handleLimparFiltros = () => {
    setCategoriaSelecionada('');
    setFonteSelecionada('');
    setTermoBusca('');
    toast.info('Filtros limpos.');
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

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '24px 16px 60px' }}>
      <Toaster position="bottom-right" richColors />

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <Header 
          totalNoticias={noticias.length}
          totalFontes={fontes.length}
          aoAtualizarFeeds={handleAtualizarFeeds}
          carregando={carregando}
        />

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
        />

        <ModalNoticia 
          noticia={noticiaModal}
          aoFechar={() => setNoticiaModal(null)}
        />
      </div>
    </div>
  );
}

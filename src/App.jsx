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
      const resultadoRSS = await baixarFeedRSS(endereco, categoria);

      if (resultadoRSS && resultadoRSS.fonte) {
        const novaFonte = resultadoRSS.fonte;
        if (nome) novaFonte.nome = nome;
        if (categoria) novaFonte.categoria = categoria;
        if (descricao) novaFonte.descricao = descricao;

        setFontes(prev => [novaFonte, ...prev.filter(f => f.endereco !== novaFonte.endereco)]);

        if (resultadoRSS.noticias && resultadoRSS.noticias.length > 0) {
          setNoticias(prev => {
            const linksExistentes = new Set(prev.map(n => n.endereco));
            const apenasNovas = resultadoRSS.noticias.filter(n => !linksExistentes.has(n.endereco));
            return [...apenasNovas, ...prev];
          });
        }
      }
    } catch (_) {
      const nomeFonte = nome || `Fonte ${fontes.length + 1}`;
      const novaFonte = new FonteNoticia(nomeFonte, endereco, descricao || 'Fonte de notícias adicionada.', categoria || 'Geral');
      
      const noticiaManual = new Noticia(
        `Destaque de ${novaFonte.nome}`,
        endereco,
        `Esta matéria foi vinculada à fonte (${novaFonte.nome}).`,
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
    if (fontes.length === 0) {
      return;
    }

    setCarregando(true);
    let novasNoticiasAcumuladas = [];

    for (const fonte of fontes) {
      if (fonte.endereco && fonte.endereco.startsWith('http')) {
        try {
          const res = await baixarFeedRSS(fonte.endereco, fonte.categoria);
          if (res && res.noticias) {
            novasNoticiasAcumuladas.push(...res.noticias);
          }
        } catch (_) {}
      }
    }

    if (novasNoticiasAcumuladas.length > 0) {
      setNoticias(prev => {
        const linksExistentes = new Set(prev.map(item => item.endereco));
        const noticiasVerdadeiramenteNovas = novasNoticiasAcumuladas.filter(n => !linksExistentes.has(n.endereco));

        if (noticiasVerdadeiramenteNovas.length > 0) {
          return [...noticiasVerdadeiramenteNovas, ...prev];
        }
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
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--g1-gray-bg)' }}>
      <Header 
        totalNoticias={noticias.length}
        totalFontes={fontes.length}
        aoAtualizarFeeds={handleAtualizarFeeds}
        aoLimparTudo={handleLimparTudo}
        carregando={carregando}
        noticiaDestaque={noticiaDestaque}
      />

      <main className="portal-container">
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

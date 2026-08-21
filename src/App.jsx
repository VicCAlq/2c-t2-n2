import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ModalAvisoRGB from './components/ModalAvisoRGB';
import ModalNoticia from './components/ModalNoticia';
import TabelaNoticias from './components/TabelaNoticias';
import { CoverflowCarousel } from './components/ui/coverflow-carousel';
import { XCircle } from 'lucide-react';

import { FonteNoticia } from './models/FonteNoticia';
import { Noticia } from './models/Noticia';
import { fontesIniciais } from './data/dadosIniciais';
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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [modoVitinho, setModoVitinho] = useState(false);
  const [modalRGBOpen, setModalRGBOpen] = useState(false);

  useEffect(() => {
    async function inicializarApp() {
      try {
        const fontesIDB = await carregarFontesIDB();
        const noticiasIDB = await carregarNoticiasIDB();

        let fontesIniciaisParaUsar = [];

        if (fontesIDB && fontesIDB.length > 0) {
          fontesIniciaisParaUsar = fontesIDB.map(f => new FonteNoticia(f.nome, f.endereco, f.descricao, f.categoria, f.id));
        } else {
          fontesIniciaisParaUsar = fontesIniciais;
        }

        setFontes(fontesIniciaisParaUsar);

        if (noticiasIDB && noticiasIDB.length > 0) {
          setNoticias(noticiasIDB.map(n => new Noticia(n.nome, n.endereco, n.descricao, n.dataDePublicacao || n.dataPublicacao, n.categoria, n.fonte, n.id)));
        } else {
          setNoticias([]);
        }
      } catch (_) {
        setFontes(fontesIniciais);
        setNoticias([]);
      } finally {
        setDbCarregado(true);
      }
    }
    inicializarApp();
  }, []);

  useEffect(() => {
    if (dbCarregado && fontes.length > 0 && noticias.length === 0) {
      handleAtualizarFeeds();
    }
  }, [dbCarregado]);

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
        novaFonte.endereco = endereco.trim();

        const nomeFinal = novaFonte.nome;
        const noticiasProcessadas = (resultadoRSS.noticias || []).map(item => {
          if (nomeFinal) item.fonte = nomeFinal;
          if (categoria && (!item.categoria || item.categoria === 'Geral')) {
            item.categoria = categoria;
          }
          return item;
        });

        setFontes(prev => [novaFonte, ...prev.filter(f => f.endereco !== novaFonte.endereco)]);

        if (noticiasProcessadas.length > 0) {
          setNoticias(prev => {
            const linksExistentes = new Set(prev.map(n => n.endereco));
            const apenasNovas = noticiasProcessadas.filter(n => !linksExistentes.has(n.endereco));
            return [...apenasNovas, ...prev];
          });
        }
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
        const noticiasNovas = novasNoticiasAcumuladas.filter(n => !linksExistentes.has(n.endereco));

        if (noticiasNovas.length > 0) {
          return [...noticiasNovas, ...prev];
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

  const coverflowSlides = useMemo(() => {
    const defaultImages = [
      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=640&h=640&fit=crop',
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=640&h=640&fit=crop',
      'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=640&h=640&fit=crop',
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=640&h=640&fit=crop',
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=640&h=640&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=640&h=640&fit=crop'
    ];

    if (noticiasFiltradas.length > 0) {
      return noticiasFiltradas.slice(0, 10).map((n, idx) => ({
        src: n.imagemUrl || defaultImages[idx % defaultImages.length],
        alt: n.nome,
        title: n.nome,
        subtitle: n.descricao ? n.descricao.substring(0, 90) + '...' : n.fonte,
        category: n.categoria || 'RSS',
        noticiaOriginal: n,
        meta: [
          { label: 'Fonte', value: n.fonte || 'RSS' },
          { label: 'Categoria', value: n.categoria || 'Geral' }
        ]
      }));
    }

    return [
      {
        src: defaultImages[0],
        alt: 'Agregador de Notícias RSS',
        title: 'Agregador RSS: Notícias em Tempo Real',
        subtitle: 'Cadastre feeds RSS no menu lateral para visualizar notícias ao vivo e salvas no IndexedDB',
        category: 'AO VIVO',
        meta: [{ label: 'Status', value: 'Aguardando Feeds' }]
      }
    ];
  }, [noticiasFiltradas]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${modoVitinho ? 'modo-vitinho' : 'bg-slate-100'}`}>
      
      <Header
        totalNoticias={noticias.length}
        totalFontes={fontes.length}
        aoAtualizarFeeds={handleAtualizarFeeds}
        aoLimparTudo={handleLimparTudo}
        carregando={carregando}
        noticiaDestaque={noticiaDestaque}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        modoVitinho={modoVitinho}
        onOpenModalRGB={() => setModalRGBOpen(true)}
        onToggleModoVitinhoOff={() => setModoVitinho(false)}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        categorias={categoriasUnicas}
        categoriaSelecionada={categoriaSelecionada}
        setCategoriaSelecionada={setCategoriaSelecionada}
        fontes={fontes}
        fonteSelecionada={fonteSelecionada}
        setFonteSelecionada={setFonteSelecionada}
        termoBusca={termoBusca}
        setTermoBusca={setTermoBusca}
        modoVitinho={modoVitinho}
        onOpenModalRGB={() => setModalRGBOpen(true)}
        onToggleModoVitinhoOff={() => setModoVitinho(false)}
        aoAdicionarFonte={handleAdicionarFonte}
        aoRemoverFonte={handleRemoverFonte}
        aoLimparTudo={handleLimparTudo}
        carregando={carregando}
      />

      {modoVitinho && (
        <button
          onClick={() => setModoVitinho(false)}
          className="fixed bottom-6 right-6 z-[9990] bg-red-600 hover:bg-red-700 text-white font-black px-5 py-3 rounded-full shadow-2xl animate-bounce flex items-center gap-2 border-2 border-white text-xs uppercase tracking-wider transition transform hover:scale-110 cursor-pointer"
          title="Desativar Modo Vitinho RGB imediatamente"
        >
          <XCircle className="w-5 h-5" /> DESATIVAR MODO RGB 
        </button>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6 w-full transition-all">
        
        <section className="mb-8 bg-slate-900 text-white rounded-2xl p-4 md:p-6 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#cc0000] text-white font-black text-xs px-2.5 py-0.5 uppercase tracking-wider rounded">
                DESTAQUES RSS
              </span>
              <h2 className="text-sm font-bold text-slate-300 hidden sm:inline">
             
              </h2>
            </div>
     
          </div>

          <CoverflowCarousel
            slides={coverflowSlides}
            showCaption={true}
            showPagination={true}
            showNavigation={true}
            onSlideClick={(slide) => {
              if (slide.noticiaOriginal) {
                setNoticiaModal(slide.noticiaOriginal);
              }
            }}
          />
        </section>

        <section>
          <TabelaNoticias
            noticias={noticiasFiltradas}
            aoSelecionarNoticia={setNoticiaModal}
            aoLimparFiltros={handleLimparFiltros}
          />
        </section>
      </main>

      <ModalAvisoRGB
        isOpen={modalRGBOpen}
        onClose={() => setModalRGBOpen(false)}
        onConfirm={() => setModoVitinho(true)}
      />

      <ModalNoticia
        noticia={noticiaModal}
        aoFechar={() => setNoticiaModal(null)}
      />
    </div>
  );
}

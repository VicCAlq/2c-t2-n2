import { useState } from 'react';
import { 
  Rss, 
  Search, 
  Plus, 
  Sparkles, 
  Trash2, 
  X, 
  Flame, 
  Tv, 
  Globe, 
  TrendingUp, 
  Cpu, 
  Trophy, 
  Palette,
  Check,
  XCircle,
  Loader2
} from 'lucide-react';

export default function Sidebar({
  isOpen,
  onClose,
  categorias = [],
  categoriaSelecionada,
  setCategoriaSelecionada,
  fontes = [],
  fonteSelecionada,
  setFonteSelecionada,
  termoBusca,
  setTermoBusca,
  modoVitinho,
  onOpenModalRGB,
  onToggleModoVitinhoOff,
  aoAdicionarFonte,
  aoRemoverFonte,
  aoLimparTudo,
  carregando
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFontesList, setShowFontesList] = useState(false);

  const [urlInput, setUrlInput] = useState('');
  const [nomeInput, setNomeInput] = useState('');
  const [catInput, setCatInput] = useState('Geral');
  const [descInput, setDescInput] = useState('');
  const [formErro, setFormErro] = useState('');

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setFormErro('');
    if (!urlInput.trim()) {
      setFormErro('Informe a URL do feed RSS');
      return;
    }
    try {
      await aoAdicionarFonte({
        endereco: urlInput.trim(),
        nome: nomeInput.trim(),
        categoria: catInput,
        descricao: descInput.trim()
      });
      setUrlInput('');
      setNomeInput('');
      setDescInput('');
      setShowAddForm(false);
    } catch (err) {
      setFormErro(err.message || 'Erro ao carregar feed RSS');
    }
  };

  const getCatIcon = (catName) => {
    const l = catName.toLowerCase();
    if (l.includes('pol') || l.includes('mun')) return <Globe className="w-4 h-4 text-blue-600" />;
    if (l.includes('econ') || l.includes('fin')) return <TrendingUp className="w-4 h-4 text-amber-600" />;
    if (l.includes('tec') || l.includes('soft')) return <Cpu className="w-4 h-4 text-indigo-600" />;
    if (l.includes('esp') || l.includes('fut')) return <Trophy className="w-4 h-4 text-emerald-600" />;
    if (l.includes('cult') || l.includes('art')) return <Palette className="w-4 h-4 text-rose-600" />;
    return <Tv className="w-4 h-4 text-slate-500" />;
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-[9990] bg-slate-900/60 backdrop-blur-xs transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-[9995] h-full w-80 max-w-[85vw] bg-white text-slate-900 border-r border-slate-200 shadow-2xl transition-transform duration-300 flex flex-col justify-between overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${modoVitinho ? 'sidebar-rgb' : ''}`}
      >
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="bg-[#cc0000] px-3 py-1 text-white font-black text-lg tracking-tighter shadow-xs flex items-center gap-1">
              <Rss className="w-5 h-5" /> RSS <span className="font-light">READER</span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              OPÇÕES
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-200 transition"
            title="Fechar menu lateral"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-5 flex-1">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Pesquisar Notícias
            </label>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                placeholder="Buscar palavra-chave..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#cc0000] focus:bg-white"
              />
              {termoBusca && (
                <button
                  onClick={() => setTermoBusca('')}
                  className="absolute right-3 text-slate-400 hover:text-slate-700 text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-800 flex items-center gap-1.5">
                MODO VITINHO 
              </span>
              {modoVitinho ? (
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  ATIVO
                </span>
              ) : (
                <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  DESLIGADO
                </span>
              )}
            </div>
            
            {modoVitinho ? (
              <button
                onClick={onToggleModoVitinhoOff}
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition border border-red-700 flex items-center justify-center gap-1 shadow-sm"
              >
                <XCircle className="w-4 h-4" /> Desativar Modo RGB 
              </button>
            ) : (
              <button
                onClick={onOpenModalRGB}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs transition flex items-center justify-center gap-1.5"
              >
                Ativar Modo RGB 
              </button>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>Editorias RSS</span>
              <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-1.5 py-0.5 rounded">
                {categorias.length}
              </span>
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setCategoriaSelecionada('');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition ${
                  categoriaSelecionada === ''
                    ? 'bg-[#cc0000] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Todas as Editorias
                </span>
                {categoriaSelecionada === '' && <Check className="w-3.5 h-3.5" />}
              </button>

              {categorias.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCategoriaSelecionada(cat);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    categoriaSelecionada.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#cc0000] text-white shadow-xs font-bold'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {getCatIcon(cat)} {cat}
                  </span>
                  {categoriaSelecionada.toLowerCase() === cat.toLowerCase() && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Filtrar por Fonte RSS
            </label>
            <select
              value={fonteSelecionada}
              onChange={(e) => {
                setFonteSelecionada(e.target.value);
                onClose();
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-[#cc0000]"
            >
              <option value="">Todas as Fontes ({fontes.length})</option>
              {fontes.map((f, idx) => (
                <option key={idx} value={f.nome}>
                  {f.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="border-t border-slate-200 pt-4 space-y-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
            >
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#cc0000]" /> Cadastrar Fonte RSS
              </span>
              <span className="text-xs text-slate-400">{showAddForm ? '▲' : '▼'}</span>
            </button>

            {showAddForm && (
              <form onSubmit={handleAddSubmit} className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                    URL do Feed RSS *
                  </label>
                  <input
                    type="url"
                    required
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://exemplo.com/rss"
                    className="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-900 focus:outline-none focus:border-[#cc0000]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                    Nome da Fonte
                  </label>
                  <input
                    type="text"
                    value={nomeInput}
                    onChange={(e) => setNomeInput(e.target.value)}
                    placeholder="Ex: G1 Tecnologia"
                    className="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-900 focus:outline-none focus:border-[#cc0000]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                    Editoria
                  </label>
                  <select
                    value={catInput}
                    onChange={(e) => setCatInput(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-900 focus:outline-none focus:border-[#cc0000]"
                  >
                    <option value="Geral">Geral</option>
                    <option value="Política">Política</option>
                    <option value="Economia">Economia</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Esportes">Esportes</option>
                    <option value="Mundo">Mundo</option>
                    <option value="Cultura">Cultura</option>
                  </select>
                </div>
                {formErro && (
                  <p className="text-[11px] text-red-600 bg-red-50 p-2 rounded border border-red-200">
                    {formErro}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={carregando}
                  className="w-full py-2 bg-[#cc0000] hover:bg-red-700 disabled:bg-red-400 text-white font-bold text-xs rounded transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  {carregando ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Carregando Feed RSS...
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" /> Adicionar & Salvar Feed
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {fontes.length > 0 && (
            <div className="border-t border-slate-200 pt-4 space-y-2">
              <button
                onClick={() => setShowFontesList(!showFontesList)}
                className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100 transition"
              >
                <span className="flex items-center gap-2">
                  <Rss className="w-4 h-4 text-[#cc0000]" /> Fontes Salvas IDB ({fontes.length})
                </span>
                <span className="text-xs text-slate-400">{showFontesList ? '▲' : '▼'}</span>
              </button>

              {showFontesList && (
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {fontes.map((f, idx) => (
                    <div
                      key={f.id || idx}
                      className="bg-white p-2 rounded border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div className="overflow-hidden">
                        <p className="font-bold text-slate-800 truncate">{f.nome}</p>
                        <p className="text-[10px] text-slate-500 truncate">{f.categoria || 'Geral'}</p>
                      </div>
                      <button
                        onClick={() => aoRemoverFonte(f.id || f.nome)}
                        className="text-slate-400 hover:text-red-600 p-1"
                        title="Remover fonte"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
          {fontes.length > 0 && (
            <button
              onClick={aoLimparTudo}
              className="w-full py-2 bg-white hover:bg-red-50 text-red-600 font-bold text-xs rounded border border-red-200 transition flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" /> Limpar Banco de Dados
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

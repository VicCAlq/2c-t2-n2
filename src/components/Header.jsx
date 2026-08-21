import { Menu, RefreshCw, Clock, Sparkles, Newspaper, Rss, XCircle } from 'lucide-react';
import { formatarTempoRelativo } from '../utils/formatadorData';

export default function Header({
  totalNoticias,
  totalFontes,
  aoAtualizarFeeds,
  carregando,
  noticiaDestaque,
  onToggleSidebar,
  modoVitinho,
  onOpenModalRGB,
  onToggleModoVitinhoOff
}) {
  const dataHoje = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  const dataCapitalizada = dataHoje.charAt(0).toUpperCase() + dataHoje.slice(1);

  return (
    <header className={`w-full sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm ${modoVitinho ? 'header-rgb' : ''}`}>
      <div className="bg-[#cc0000] text-white py-1 px-4 text-[11px] font-bold uppercase tracking-wider">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">

           
          </div>
          <div className="flex items-center gap-4 text-[11px] font-medium opacity-90">
            <span>{dataCapitalizada}</span>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-slate-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition shadow-sm"
              title="Abrir/Fechar"
            >
              <Menu className="w-4 h-4 text-red-500" />

            </button>

            <a href="#" className="flex items-center group">
              <div className="bg-[#cc0000] text-white font-black text-2xl md:text-3xl px-3 py-0.5 tracking-tighter leading-none shadow-sm flex items-center gap-1">
                <Rss className="w-6 h-6 inline-block" /> RSS
              </div>
              <div className="bg-slate-900 text-white font-black text-2xl md:text-3xl px-2 py-0.5 tracking-tighter leading-none">
                NEWS
              </div>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1">
                <Newspaper className="w-4 h-4 text-[#cc0000]" /> Notícias: <strong className="text-slate-900">{totalNoticias}</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Rss className="w-4 h-4 text-[#cc0000]" /> Feeds RSS: <strong className="text-slate-900">{totalFontes}</strong>
              </span>
            </div>

            {modoVitinho ? (
              <button
                onClick={onToggleModoVitinhoOff}
                className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider shadow-md animate-pulse transition"
                title="Clique para desativar o Modo RGB imediatamente"
              >
                <XCircle className="w-4 h-4" /> DESATIVAR MODO RGB 
              </button>
            ) : (
              <button
                onClick={onOpenModalRGB}
                className="hidden sm:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition border border-slate-700 shadow-sm"
              >
              Modo Vitinho
              </button>
            )}

            <button
              onClick={aoAtualizarFeeds}
              disabled={carregando || totalFontes === 0}
              className="flex items-center gap-1.5 bg-[#cc0000] hover:bg-red-700 disabled:bg-slate-200 disabled:text-slate-400 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${carregando ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{carregando ? 'Atualizando...' : 'Atualizar Feeds'}</span>
            </button>
          </div>
        </div>
      </div>

      {noticiaDestaque && (
        <div className="bg-slate-50 border-b border-slate-200 py-2 px-4 text-xs">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <span className="bg-[#cc0000] text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-widest whitespace-nowrap rounded-sm">
              ÚLTIMAS NOTÍCIAS
            </span>
            <div className="flex-1 overflow-hidden truncate flex items-center gap-2">
              <span className="font-bold text-[#cc0000] whitespace-nowrap">
                [{noticiaDestaque.fonte || 'RSS'}]
              </span>
              <span className="text-slate-800 truncate font-semibold">
                {noticiaDestaque.nome}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-slate-500 text-[11px] whitespace-nowrap">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatarTempoRelativo(noticiaDestaque.dataDePublicacao)}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

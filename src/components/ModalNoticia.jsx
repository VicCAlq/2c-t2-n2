import { X, ExternalLink, Calendar, Rss, Share2, Copy } from 'lucide-react';
import { formatarDataCompleta, formatarTempoRelativo } from '../utils/formatadorData';

export default function ModalNoticia({ noticia, aoFechar }) {
  if (!noticia) return null;

  const copiarLinkModal = () => {
    if (noticia.endereco) {
      navigator.clipboard.writeText(noticia.endereco);
      alert('Link copiado!');
    }
  };

  return (
    <div className="fixed inset-0 z-[9995] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200" onClick={aoFechar}>
      <div 
        className="relative w-full max-w-2xl bg-slate-900 rounded-2xl border-2 border-red-600 p-6 md:p-8 text-white shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          type="button"
          onClick={aoFechar}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span className="bg-red-600 text-white text-xs font-black px-2.5 py-0.5 uppercase tracking-wider rounded">
            {noticia.categoria || 'CNN BRASIL'}
          </span>
          <span className="text-xs font-extrabold text-slate-300 flex items-center gap-1">
            <Rss className="w-3.5 h-3.5 text-red-500" /> {noticia.fonte || 'CNN Brasil'}
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-black text-white leading-tight mb-4">
          {noticia.nome}
        </h2>

        <div className="flex items-center justify-between text-xs text-slate-400 border-y border-slate-800 py-3 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-red-500" />
            <span>Publicado {formatarTempoRelativo(noticia.dataDePublicacao)} ({formatarDataCompleta(noticia.dataDePublicacao)})</span>
          </div>

          <button
            type="button"
            onClick={copiarLinkModal}
            className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
          >
            <Share2 className="w-3.5 h-3.5" /> Compartilhar
          </button>
        </div>

        <div className="mb-6 leading-relaxed text-slate-200 text-sm md:text-base space-y-4">
          <p className="whitespace-pre-line">
            {noticia.descricao || 'Nenhum resumo adicional disponível para esta notícia.'}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
          <button
            onClick={aoFechar}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition"
          >
            Fechar
          </button>
          <a 
            href={noticia.endereco} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center gap-1.5"
          >
            Abrir Notícia no Portal CNN <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

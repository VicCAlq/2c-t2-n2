import { Calendar, Rss, ExternalLink, Copy, Flame } from 'lucide-react';
import { formatarTempoRelativo } from '../utils/formatadorData';

export default function TabelaNoticias({ noticias = [], aoSelecionarNoticia, aoLimparFiltros }) {
  const getCategoriaBadgeClass = (categoria) => {
    if (!categoria) return 'bg-slate-700 text-white';
    const catLower = categoria.toLowerCase();
    if (catLower.includes('tec') || catLower.includes('soft') || catLower.includes('ia')) return 'bg-indigo-600 text-white';
    if (catLower.includes('mun') || catLower.includes('pol') || catLower.includes('int')) return 'bg-[#cc0000] text-white';
    if (catLower.includes('inov') || catLower.includes('start')) return 'bg-purple-600 text-white';
    if (catLower.includes('esp') || catLower.includes('fut')) return 'bg-emerald-600 text-white';
    if (catLower.includes('econ') || catLower.includes('fin')) return 'bg-amber-600 text-white';
    if (catLower.includes('cult') || catLower.includes('art')) return 'bg-rose-600 text-white';
    return 'bg-slate-800 text-white';
  };

  const copiarLink = (e, url) => {
    e.stopPropagation();
    if (url) {
      navigator.clipboard.writeText(url);
      alert('Link da notícia copiado!');
    }
  };

  if (!noticias || noticias.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-800 shadow-xs">
        <h3 className="text-lg font-bold text-slate-800 mb-2">
          Nenhuma notícia encontrada
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          Não há matérias que correspondam aos filtros aplicados.
        </p>
        {aoLimparFiltros && (
          <button
            onClick={aoLimparFiltros}
            className="px-5 py-2.5 bg-[#cc0000] hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-xs"
          >
            Limpar Filtros de Busca
          </button>
        )}
      </div>
    );
  }

  const noticiaHero = noticias[0];
  const demaisNoticias = noticias.slice(1);

  return (
    <div className="space-y-6">
      {noticiaHero && (
        <article
          onClick={() => aoSelecionarNoticia(noticiaHero)}
          className="bg-white border border-slate-200 hover:border-[#cc0000] rounded-2xl p-6 md:p-8 shadow-sm transition cursor-pointer group border-t-4 border-t-[#cc0000]"
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold px-2.5 py-0.5 uppercase tracking-wider rounded ${getCategoriaBadgeClass(noticiaHero.categoria)}`}>
                {noticiaHero.categoria || 'GERAL'}
              </span>
              <span className="text-xs font-bold text-[#cc0000] flex items-center gap-1">
                <Flame className="w-4 h-4 text-[#cc0000]" /> MANCHETE
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {formatarTempoRelativo(noticiaHero.dataDePublicacao)}
            </span>
          </div>

          <h2 className="text-xl md:text-3xl font-black text-slate-900 group-hover:text-[#cc0000] transition-colors leading-tight mb-3">
            {noticiaHero.nome}
          </h2>

          {noticiaHero.descricao && (
            <p className="text-slate-600 text-sm md:text-base leading-relaxed line-clamp-3 mb-4">
              {noticiaHero.descricao}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <Rss className="w-4 h-4 text-[#cc0000]" />
              <span>Fonte: <strong className="text-slate-800">{noticiaHero.fonte || 'CNN Brasil'}</strong></span>
            </div>

            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={(e) => copiarLink(e, noticiaHero.endereco)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copiar Link
              </button>
              <a
                href={noticiaHero.endereco}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-[#cc0000] hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-1 shadow-xs"
              >
                Ler Matéria Integra <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </article>
      )}

      {demaisNoticias.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {demaisNoticias.map((item, idx) => (
            <article
              key={item.id || idx}
              onClick={() => aoSelecionarNoticia(item)}
              className="bg-white border border-slate-200 hover:border-[#cc0000] rounded-xl p-5 shadow-xs transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded ${getCategoriaBadgeClass(item.categoria)}`}>
                    {item.categoria || 'Geral'}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {formatarTempoRelativo(item.dataDePublicacao)}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#cc0000] transition-colors leading-snug line-clamp-2 mb-2">
                  {item.nome}
                </h3>

                {item.descricao && (
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                    {item.descricao}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] mt-2">
                <span className="text-slate-500 font-semibold truncate max-w-[140px]">
                  {item.fonte || 'CNN'}
                </span>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={(e) => copiarLink(e, item.endereco)}
                    className="text-slate-400 hover:text-slate-700 transition"
                    title="Copiar link"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={item.endereco}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#cc0000] hover:underline font-bold flex items-center gap-0.5"
                    title="Abrir no site original"
                  >
                    Abrir <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

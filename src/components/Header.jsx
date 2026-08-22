import { RefreshCw, Newspaper, Rss, Clock, Trash2 } from './Icons';
import { formatarTempoRelativo } from '../utils/formatadorData';

export default function Header({ totalNoticias, totalFontes, aoAtualizarFeeds, aoLimparTudo, carregando, noticiaDestaque }) {
  const dataHoje = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  const dataCapitalizada = dataHoje.charAt(0).toUpperCase() + dataHoje.slice(1);

  return (
    <header>
      <div className="nf-header">
        <div className="nf-header-inner">

          <a href="#" className="nf-logo">
            <div className="nf-logo-icon">67</div>
            <div className="nf-logo-text">
              <span className="nf-logo-name">ResenhaNews</span>
              <span className="nf-logo-sub">{dataCapitalizada}</span>
            </div>
          </a>


          <div className="nf-header-actions">
            <span className="nf-stat-chip">
              <Newspaper size={13} color="var(--accent)" />
              <strong>{totalNoticias}</strong> notícias
            </span>
            <span className="nf-stat-chip">
              <Rss size={13} color="var(--accent)" />
              <strong>{totalFontes}</strong> fontes
            </span>

            {totalFontes > 0 && (
              <button
                className="btn-secondary"
                onClick={aoAtualizarFeeds}
                disabled={carregando}
              >
                <RefreshCw size={14} className={carregando ? 'spin-anim' : ''} />
                {carregando ? 'Atualizando...' : 'Atualizar'}
              </button>
            )}

            {(totalFontes > 0 || totalNoticias > 0) && (
              <button
                className="btn-danger"
                onClick={aoLimparTudo}
                title="Limpar todas as notícias e fontes"
              >
                <Trash2 size={14} />
                Limpar
              </button>
            )}
          </div>
        </div>
      </div>

      {noticiaDestaque && (
        <div className="nf-ticker">
          <span className="nf-ticker-badge">Última hora</span>
          <Clock size={13} style={{ opacity: 0.75, flexShrink: 0 }} />
          <span className="nf-ticker-text">
            <strong>{noticiaDestaque.fonte}:</strong> {noticiaDestaque.nome}
          </span>
          <span className="nf-ticker-time">
            {formatarTempoRelativo(noticiaDestaque.dataDePublicacao)}
          </span>
        </div>
      )}
    </header>
  );
}

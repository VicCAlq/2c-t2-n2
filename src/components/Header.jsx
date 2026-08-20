import { motion } from 'framer-motion';
import { RefreshCw, Newspaper, Rss, Clock, Trash2 } from 'lucide-react';
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
    <header style={{ marginBottom: '20px' }}>
      <div className="g1-top-bar">
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>g1 • o portal de notícias da globo</span>
          <span style={{ fontSize: '0.75rem' }}>{dataCapitalizada}</span>
        </div>
      </div>

      <div className="g1-header">
        <div className="g1-header-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <motion.a 
              href="#" 
              className="g1-logo-badge"
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
            >
              g1 <span>notícias</span>
            </motion.a>

            <div style={{ borderLeft: '2px solid var(--border-strong)', paddingLeft: '16px' }}>
              <h1 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--g1-dark)', margin: 0, lineHeight: 1.1 }}>
                g1 notícias
              </h1>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>
                Jornalismo em tempo real
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Newspaper size={15} color="#c8102e" />
                <span>Notícias: <strong style={{ color: 'var(--g1-dark)' }}>{totalNoticias}</strong></span>
              </div>
              <span>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Rss size={15} color="#c8102e" />
                <span>Fontes: <strong style={{ color: 'var(--g1-dark)' }}>{totalFontes}</strong></span>
              </div>
            </div>

            {totalFontes > 0 && (
              <button 
                className="btn-g1-secondary"
                onClick={aoAtualizarFeeds}
                disabled={carregando}
                style={{ opacity: carregando ? 0.7 : 1 }}
              >
                <RefreshCw size={14} className={carregando ? 'spin-anim' : ''} />
                {carregando ? 'Atualizando...' : 'Atualizar'}
              </button>
            )}

            {(totalFontes > 0 || totalNoticias > 0) && (
              <button 
                className="btn-g1-secondary"
                onClick={aoLimparTudo}
                title="Limpar todas as notícias e fontes"
                style={{ color: '#b91c1c', borderColor: '#fecaca' }}
              >
                <Trash2 size={14} />
                Limpar Tudo
              </button>
            )}
          </div>
        </div>
      </div>

      {noticiaDestaque && (
        <div className="ticker-bar">
          <span className="ticker-badge">ÚLTIMA HORA</span>
          <Clock size={14} color="#fca5a5" />
          <span className="ticker-text">
            <strong>{noticiaDestaque.fonte}:</strong> {noticiaDestaque.nome}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#9ca3af', marginLeft: 'auto', whiteSpace: 'nowrap' }}>
            {formatarTempoRelativo(noticiaDestaque.dataDePublicacao)}
          </span>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-anim {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </header>
  );
}

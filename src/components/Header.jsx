import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export default function Header({ totalNoticias, totalFontes, aoAtualizarFeeds, carregando }) {
  return (
    <header style={{ marginBottom: '32px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '24px' }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: '16px'
      }}>
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text-muted)'
            }}>
            </span>
          </div>
          
          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontSize: '2.2rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            margin: 0,
            letterSpacing: '-0.02em',
            lineHeight: '1.2'
          }}>
           ManuScript
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px' }}>
Bagulhozinho De Vitu         </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <div>
              <span>Notícias: </span>
              <strong style={{ color: 'var(--text-primary)' }}>{totalNoticias}</strong>
            </div>
            <span>•</span>
            <div>
              <span>Fontes: </span>
              <strong style={{ color: 'var(--text-primary)' }}>{totalFontes}</strong>
            </div>
          </div>

          <button 
            className="btn-secondary"
            onClick={aoAtualizarFeeds}
            disabled={carregando}
            style={{ opacity: carregando ? 0.7 : 1 }}
          >
            <RefreshCw size={14} className={carregando ? 'spin-anim' : ''} />
            {carregando ? 'Atualizando...' : 'Atualizar'}
          </button>
        </motion.div>
      </div>

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

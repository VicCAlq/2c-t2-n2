import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar } from 'lucide-react';

export default function ModalNoticia({ noticia, aoFechar }) {
  if (!noticia) return null;

  const formatarData = (dataStr) => {
    try {
      const data = new Date(dataStr);
      if (isNaN(data.getTime())) return dataStr;
      return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'full',
        timeStyle: 'short'
      }).format(data);
    } catch {
      return dataStr;
    }
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={aoFechar}>
        <motion.div 
          className="modal-content"
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Fechar */}
          <button 
            type="button"
            onClick={aoFechar}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: '#f5f4f0',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>

          {/* Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span className="badge-category cat-geral">
              {noticia.categoria || 'Geral'}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              • {noticia.fonte || 'Fonte de Notícia'}
            </span>
          </div>

          {/* Título */}
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)',
            fontSize: '1.5rem',
            lineHeight: '1.3',
            marginBottom: '12px'
          }}>
            {noticia.nome}
          </h2>

          {/* Data */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            marginBottom: '20px',
            paddingBottom: '14px',
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            <Calendar size={14} color="#78716c" />
            <span>{formatarData(noticia.dataDePublicacao)}</span>
          </div>

          {/* Conteúdo */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
              {noticia.descricao || 'Nenhum resumo disponível para este artigo.'}
            </p>
          </div>

          {/* Botões */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button className="btn-secondary" onClick={aoFechar}>
              Fechar
            </button>
            <a 
              href={noticia.endereco} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
            >
              Abrir Artigo Original <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

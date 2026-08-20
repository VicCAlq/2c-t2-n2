import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ExternalLink, ChevronDown, ChevronUp, Database } from 'lucide-react';

export default function GerenciadorFontes({ fontes, aoRemoverFonte, aoLimparTudo }) {
  const [aberto, setAberto] = useState(false);

  return (
    <motion.div 
      className="g1-panel"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      style={{ padding: '16px', marginTop: '24px' }}
    >
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none'
        }}
        onClick={() => setAberto(!aberto)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Database size={18} color="#c8102e" />
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 900, color: 'var(--g1-dark)', margin: 0 }}>
              Fontes Cadastradas ({fontes.length})
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>
              Lista de veículos e fontes ativas
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {fontes.length > 0 && (
            <button 
              type="button" 
              className="btn-g1-secondary" 
              onClick={(e) => { e.stopPropagation(); aoLimparTudo(); }}
              style={{ padding: '3px 8px', fontSize: '0.75rem', color: '#b91c1c', borderColor: '#fecaca' }}
            >
              <Trash2 size={12} /> Limpar Tudo
            </button>
          )}

          <button 
            type="button" 
            className="btn-g1-secondary" 
            style={{ padding: '3px 8px', fontSize: '0.75rem' }}
          >
            {aberto ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {aberto ? 'Ocultar Fontes' : 'Exibir Fontes'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}
          >
            {fontes.length === 0 ? (
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                Nenhuma fonte cadastrada no momento.
              </p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                {fontes.map((fonte, index) => (
                  <div
                    key={fonte.id || index}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid var(--border-strong)',
                      borderRadius: '0px',
                      padding: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '8px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span className="badge-category cat-geral">
                          {fonte.categoria}
                        </span>
                        <a 
                          href={fonte.endereco} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '3px' }}
                        >
                          URL <ExternalLink size={10} />
                        </a>
                      </div>

                      <h4 style={{ color: 'var(--g1-dark)', fontSize: '0.9rem', marginBottom: '2px', fontWeight: '800' }}>
                        {fonte.nome}
                      </h4>

                      <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: '1.35' }}>
                        {fonte.descricao || 'Sem descrição.'}
                      </p>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '6px',
                      borderTop: '1px solid var(--border-light)'
                    }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '160px' }}>
                        {fonte.endereco}
                      </span>

                      <button
                        type="button"
                        onClick={() => aoRemoverFonte(fonte.id || fonte.nome)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#b91c1c',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px',
                          fontSize: '0.72rem',
                          fontWeight: '800'
                        }}
                      >
                        <Trash2 size={12} /> Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

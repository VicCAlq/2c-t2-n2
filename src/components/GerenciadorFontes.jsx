import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Trash2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

export default function GerenciadorFontes({ fontes, aoRemoverFonte }) {
  const [aberto, setAberto] = useState(false);

  return (
    <motion.div 
      className="minimal-panel"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      style={{ padding: '20px', marginTop: '32px' }}
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
          <Layers size={18} color="#57534e" />
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: 'var(--text-primary)', margin: 0 }}>
              Fontes Cadastradas ({fontes.length})
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>
              Lista de objetos da classe FonteNoticia
            </p>
          </div>
        </div>

        <button 
          type="button" 
          className="btn-secondary" 
          style={{ padding: '4px 10px', fontSize: '0.8rem' }}
        >
          {aberto ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {aberto ? 'Ocultar' : 'Expandir'}
        </button>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              {fontes.map((fonte, index) => (
                <div
                  key={fonte.id || index}
                  style={{
                    background: '#faf9f5',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '10px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span className="badge-category cat-geral">
                        {fonte.categoria}
                      </span>
                      <a 
                        href={fonte.endereco} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '3px' }}
                      >
                        URL <ExternalLink size={11} />
                      </a>
                    </div>

                    <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '4px', fontWeight: '600', fontFamily: 'var(--font-heading)' }}>
                      {fonte.nome}
                    </h4>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                      {fonte.descricao || 'Sem descrição cadastrada.'}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '8px',
                    borderTop: '1px solid var(--border-subtle)'
                  }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>
                      {fonte.endereco}
                    </span>

                    {fontes.length > 1 && (
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
                          fontSize: '0.75rem'
                        }}
                      >
                        <Trash2 size={12} /> Remover
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

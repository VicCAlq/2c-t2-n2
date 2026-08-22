import { useState } from 'react';
import { Trash2, ExternalLink, ChevronDown, ChevronUp, Database } from './Icons';

export default function GerenciadorFontes({ fontes, aoRemoverFonte, aoLimparTudo }) {
  const [aberto, setAberto] = useState(false);

  return (
    <div
      className="nf-card"
      style={{ padding: '16px 22px', marginTop: '24px' }}
    >

      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', userSelect: 'none'
        }}
        onClick={() => setAberto(!aberto)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Database size={17} color="var(--accent)" />
          <div>
            <h3 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Fontes Cadastradas
              <span style={{ marginLeft: '6px', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                ({fontes.length})
              </span>
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.77rem', margin: 0 }}>
              Veículos e feeds RSS ativos
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {fontes.length > 0 && (
            <button
              type="button"
              className="btn-danger"
              onClick={(e) => { e.stopPropagation(); aoLimparTudo(); }}
              style={{ padding: '4px 10px', fontSize: '0.76rem' }}
            >
              <Trash2 size={12} /> Limpar Tudo
            </button>
          )}

          <button
            type="button"
            className="btn-secondary"
            style={{ padding: '4px 10px', fontSize: '0.76rem' }}
          >
            {aberto ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {aberto ? 'Ocultar' : 'Exibir'}
          </button>
        </div>
      </div>

      {aberto && (
        <div
          style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}
          className="fade-in"
        >
          {fontes.length === 0 ? (
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>
              Nenhuma fonte cadastrada no momento.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
              {fontes.map((fonte, index) => (
                <div
                  key={fonte.id || index}
                  style={{
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '10px',
                    transition: 'box-shadow 0.18s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span className="badge cat-geral">{fonte.categoria || 'Geral'}</span>
                      <a
                        href={fonte.endereco}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'var(--text-muted)', fontSize: '0.74rem', fontWeight: 600,
                          display: 'flex', alignItems: 'center', gap: '3px',
                          textDecoration: 'none', transition: 'color 0.15s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                      >
                        URL <ExternalLink size={10} />
                      </a>
                    </div>

                    <h4 style={{ color: 'var(--text-primary)', fontSize: '0.88rem', marginBottom: '3px', fontWeight: 700 }}>
                      {fonte.nome}
                    </h4>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.77rem', lineHeight: '1.4', margin: 0 }}>
                      {fonte.descricao || 'Sem descrição.'}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: '8px', borderTop: '1px solid var(--border)'
                  }}>
                    <span style={{
                      fontSize: '0.7rem', color: 'var(--text-muted)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      maxWidth: '160px'
                    }}>
                      {fonte.endereco}
                    </span>

                    <button
                      type="button"
                      onClick={() => aoRemoverFonte(fonte.id || fonte.nome)}
                      style={{
                        background: 'none', border: 'none', color: 'var(--danger)',
                        cursor: 'pointer', display: 'flex', alignItems: 'center',
                        gap: '3px', fontSize: '0.72rem', fontWeight: 700,
                        transition: 'opacity 0.15s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      <Trash2 size={12} /> Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

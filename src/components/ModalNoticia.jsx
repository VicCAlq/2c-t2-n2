import { X, ExternalLink, Calendar, Rss, Share2 } from './Icons';
import { formatarDataCompleta, formatarTempoRelativo } from '../utils/formatadorData';

export default function ModalNoticia({ noticia, aoFechar }) {
  if (!noticia) return null;

  const copiarLinkModal = () => {
    if (noticia.endereco) {
      navigator.clipboard.writeText(noticia.endereco);
    }
  };

  return (
    <div className="modal-overlay" onClick={aoFechar}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          type="button"
          onClick={aoFechar}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#f1f5f9',
            border: '1px solid var(--border-light)',
            color: 'var(--text-dark)',
            borderRadius: '0px',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span className="badge-category cat-geral">
            {noticia.categoria || 'Geral'}
          </span>
          <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--uol-yellow-dark)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Rss size={13} /> {noticia.fonte || 'UOL'}
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          color: 'var(--uol-dark)',
          fontSize: '1.5rem',
          fontWeight: 900,
          lineHeight: 1.25,
          marginBottom: '12px'
        }}>
          {noticia.nome}
        </h2>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          marginBottom: '16px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} color="#64748b" />
            <span>Publicado {formatarTempoRelativo(noticia.dataDePublicacao)} ({formatarDataCompleta(noticia.dataDePublicacao)})</span>
          </div>

          <button
            type="button"
            onClick={copiarLinkModal}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--uol-yellow-dark)',
              fontSize: '0.78rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Share2 size={13} /> Compartilhar
          </button>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
            {noticia.descricao || 'Nenhum resumo disponível para este artigo.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid var(--border-light)', paddingTop: '14px' }}>
          <button className="btn-uol-secondary" onClick={aoFechar}>
            Fechar
          </button>
          <a 
            href={noticia.endereco} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-uol-primary"
          >
            Ler Notícia Completa <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

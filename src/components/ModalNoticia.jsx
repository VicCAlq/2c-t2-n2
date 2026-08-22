import { X, ExternalLink, Calendar, Rss, Share2 } from './Icons';
import { formatarDataCompleta, formatarTempoRelativo } from '../utils/formatadorData';

export default function ModalNoticia({ noticia, aoFechar }) {
  if (!noticia) return null;

  const copiarLinkModal = () => {
    if (noticia.endereco) {
      navigator.clipboard.writeText(noticia.endereco);
    }
  };

  const getCategoriaClass = (categoria) => {
    if (!categoria) return 'cat-geral';
    const c = categoria.toLowerCase();
    if (c.includes('tec') || c.includes('soft') || c.includes('ia')) return 'cat-tecnologia';
    if (c.includes('mun') || c.includes('pol') || c.includes('int')) return 'cat-mundo';
    if (c.includes('inov') || c.includes('start') || c.includes('cien')) return 'cat-inovacao';
    if (c.includes('esp') || c.includes('fut') || c.includes('jog')) return 'cat-esportes';
    if (c.includes('econ') || c.includes('fin') || c.includes('mer')) return 'cat-economia';
    if (c.includes('cult') || c.includes('art') || c.includes('cin')) return 'cat-cultura';
    return 'cat-geral';
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
            position: 'absolute', top: '16px', right: '16px',
            background: 'var(--bg-subtle)', border: '1px solid var(--border)',
            color: 'var(--text-secondary)', borderRadius: 'var(--radius)',
            width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'background 0.15s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-subtle)'}
        >
          <X size={15} />
        </button>


        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span className={`badge ${getCategoriaClass(noticia.categoria)}`}>
            {noticia.categoria || 'Geral'}
          </span>
          <span style={{
            fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)',
            display: 'inline-flex', alignItems: 'center', gap: '4px'
          }}>
            <Rss size={12} /> {noticia.fonte || 'Desconhecida'}
          </span>
        </div>


        <h2 style={{
          fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)',
          lineHeight: 1.25, marginBottom: '14px', letterSpacing: '-0.02em'
        }}>
          {noticia.nome}
        </h2>


        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: '0.8rem', color: 'var(--text-muted)',
          marginBottom: '18px', paddingBottom: '14px',
          borderBottom: '1px solid var(--border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={13} />
            <span>
              Publicado {formatarTempoRelativo(noticia.dataDePublicacao)}
              &nbsp;({formatarDataCompleta(noticia.dataDePublicacao)})
            </span>
          </div>

          <button
            type="button"
            onClick={copiarLinkModal}
            style={{
              background: 'none', border: 'none', color: 'var(--accent)',
              fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '4px',
              transition: 'opacity 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <Share2 size={13} /> Compartilhar
          </button>
        </div>


        <div style={{ marginBottom: '26px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.97rem', lineHeight: '1.65', whiteSpace: 'pre-line' }}>
            {noticia.descricao || 'Nenhum resumo disponível para este artigo.'}
          </p>
        </div>


        <div style={{
          display: 'flex', gap: '10px', justifyContent: 'flex-end',
          borderTop: '1px solid var(--border)', paddingTop: '16px'
        }}>
          <button className="btn-secondary" onClick={aoFechar}>
            Fechar
          </button>
          <a
            href={noticia.endereco}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Ler Notícia Completa <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

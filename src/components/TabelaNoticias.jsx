import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Rss, ArrowUpRight, Copy, Flame } from 'lucide-react';
import { formatarTempoRelativo } from '../utils/formatadorData';

export default function TabelaNoticias({ noticias, aoSelecionarNoticia, aoLimparFiltros }) {
  const getCategoriaClass = (categoria) => {
    if (!categoria) return 'cat-geral';
    const catLower = categoria.toLowerCase();
    if (catLower.includes('tec') || catLower.includes('soft') || catLower.includes('ia')) return 'cat-tecnologia';
    if (catLower.includes('mun') || catLower.includes('pol') || catLower.includes('int')) return 'cat-mundo';
    if (catLower.includes('inov') || catLower.includes('start') || catLower.includes('cien')) return 'cat-inovacao';
    if (catLower.includes('esp') || catLower.includes('fut') || catLower.includes('jog')) return 'cat-esportes';
    if (catLower.includes('econ') || catLower.includes('fin') || catLower.includes('mer')) return 'cat-economia';
    if (catLower.includes('cult') || catLower.includes('art') || catLower.includes('cin')) return 'cat-cultura';
    return 'cat-geral';
  };

  const copiarLink = (e, url) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
  };

  if (!noticias || noticias.length === 0) {
    return (
      <motion.div 
        className="g1-panel"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ padding: '40px 20px', textAlign: 'center', background: '#ffffff' }}
      >
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '14px', fontWeight: '600' }}>
          Nenhuma notícia encontrada para os filtros aplicados.
        </p>
        {aoLimparFiltros && (
          <button className="btn-g1-secondary" onClick={aoLimparFiltros}>
            Limpar Filtros de Pesquisa
          </button>
        )}
      </motion.div>
    );
  }

  const noticiaHero = noticias[0];
  const demaisNoticias = noticias.slice(1);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {noticiaHero && (
        <div 
          className="hero-news-card"
          onClick={() => aoSelecionarNoticia(noticiaHero)}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={`badge-category ${getCategoriaClass(noticiaHero.categoria)}`}>
                {noticiaHero.categoria || 'Geral'}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--g1-red)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Flame size={14} color="#c8102e" /> DESTAQUE
              </span>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {formatarTempoRelativo(noticiaHero.dataDePublicacao)}
            </span>
          </div>

          <h2 className="hero-title">
            {noticiaHero.nome}
          </h2>

          {noticiaHero.descricao && (
            <p className="hero-description">
              {noticiaHero.descricao}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <Rss size={13} color="#c8102e" />
              <span>Fonte: <strong style={{ color: 'var(--g1-dark)' }}>{noticiaHero.fonte || 'G1'}</strong></span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
              <button 
                type="button"
                className="btn-g1-secondary"
                onClick={(e) => copiarLink(e, noticiaHero.endereco)}
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              >
                <Copy size={13} /> Copiar
              </button>
              <a
                href={noticiaHero.endereco}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-g1-primary"
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              >
                Abrir Matéria <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      )}

      {demaisNoticias.length > 0 && (
        <div className="news-table-desktop news-table-container">
          <table className="news-table">
            <thead>
              <tr>
                <th style={{ width: '45%' }}>Título & Resumo</th>
                <th style={{ width: '18%' }}>Fonte</th>
                <th style={{ width: '15%' }}>Editoria</th>
                <th style={{ width: '14%' }}>Publicação</th>
                <th style={{ width: '8%', textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {demaisNoticias.map((item, idx) => (
                  <motion.tr
                    key={item.id || idx}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1, delay: idx * 0.01 }}
                    onClick={() => aoSelecionarNoticia(item)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span className="news-item-title">
                          {item.nome}
                        </span>
                        {item.descricao && (
                          <span style={{
                            fontSize: '0.8rem',
                            color: 'var(--text-muted)',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: '1.35'
                          }}>
                            {item.descricao}
                          </span>
                        )}
                      </div>
                    </td>

                    <td>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', color: 'var(--text-dark)', fontWeight: '700' }}>
                        <Rss size={13} color="#c8102e" />
                        <span>{item.fonte || 'Geral'}</span>
                      </div>
                    </td>

                    <td>
                      <span className={`badge-category ${getCategoriaClass(item.categoria)}`}>
                        {item.categoria || 'Geral'}
                      </span>
                    </td>

                    <td>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        <Calendar size={13} color="#64748b" />
                        <span>{formatarTempoRelativo(item.dataDePublicacao)}</span>
                      </div>
                    </td>

                    <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={(e) => copiarLink(e, item.endereco)}
                          title="Copiar Link"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                        >
                          <Copy size={14} />
                        </button>

                        <a
                          href={item.endereco}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Abrir matéria original"
                          style={{
                            color: 'var(--g1-red)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '4px'
                          }}
                        >
                          <ArrowUpRight size={16} />
                        </a>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      <div className="news-cards-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <AnimatePresence>
          {demaisNoticias.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="g1-panel"
              style={{ padding: '14px', cursor: 'pointer' }}
              onClick={() => aoSelecionarNoticia(item)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span className={`badge-category ${getCategoriaClass(item.categoria)}`}>
                  {item.categoria || 'Geral'}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {formatarTempoRelativo(item.dataDePublicacao)}
                </span>
              </div>

              <h4 style={{
                fontSize: '0.98rem',
                fontWeight: '800',
                color: 'var(--g1-dark)',
                marginBottom: '4px',
                lineHeight: '1.3'
              }}>
                {item.nome}
              </h4>

              {item.descricao && (
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: '1.35',
                  marginBottom: '10px'
                }}>
                  {item.descricao}
                </p>
              )}

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '8px',
                borderTop: '1px solid var(--border-light)',
                fontSize: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-dark)', fontWeight: '700' }}>
                  <Rss size={12} color="#c8102e" />
                  <span>{item.fonte || 'Geral'}</span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={(e) => copiarLink(e, item.endereco)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: '700' }}
                  >
                    Copiar
                  </button>
                  <a
                    href={item.endereco}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--g1-red)', fontWeight: '800', textDecoration: 'none' }}
                  >
                    Abrir <ArrowUpRight size={12} style={{ verticalAlign: 'middle' }} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .news-table-desktop {
            display: none !important;
          }
          .news-cards-mobile {
            display: flex !important;
          }
        }
        @media (min-width: 768px) {
          .news-table-desktop {
            display: block !important;
          }
          .news-cards-mobile {
            display: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
}

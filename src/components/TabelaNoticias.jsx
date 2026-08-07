import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Rss, ArrowUpRight, Copy } from 'lucide-react';
import { formatarTempoRelativo } from '../utils/formatadorData';
import { toast } from 'sonner';

export default function TabelaNoticias({ noticias, aoSelecionarNoticia, aoLimparFiltros }) {
  const getCategoriaClass = (categoria) => {
    if (!categoria) return 'cat-geral';
    const catLower = categoria.toLowerCase();
    if (catLower.includes('tec') || catLower.includes('soft') || catLower.includes('ia')) return 'cat-tecnologia';
    if (catLower.includes('mun') || catLower.includes('pol') || catLower.includes('int')) return 'cat-mundo';
    if (catLower.includes('inov') || catLower.includes('start') || catLower.includes('cien')) return 'cat-inovacao';
    if (catLower.includes('esp') || catLower.includes('fut') || catLower.includes('jog')) return 'cat-esportes';
    return 'cat-geral';
  };

  const copiarLink = (e, url) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    toast.success('Link da notícia copiado!');
  };

  if (!noticias || noticias.length === 0) {
    return (
      <motion.div 
        className="minimal-panel"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ padding: '48px 20px', textAlign: 'center', background: '#ffffff' }}
      >
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }}>
          Nenhuma notícia encontrada para os filtros aplicados.
        </p>
        {aoLimparFiltros && (
          <button className="btn-secondary" onClick={aoLimparFiltros}>
            Limpar Filtros
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {/* Visualização de Tabela para Desktop / Tablet (>= 768px) */}
      <div className="news-table-desktop news-table-container">
        <table className="news-table">
          <thead>
            <tr>
              <th style={{ width: '42%' }}>Notícia</th>
              <th style={{ width: '18%' }}>Fonte</th>
              <th style={{ width: '15%' }}>Categoria</th>
              <th style={{ width: '17%' }}>Publicação</th>
              <th style={{ width: '8%', textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {noticias.map((item, idx) => (
                <motion.tr
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.02 }}
                  onClick={() => aoSelecionarNoticia(item)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Título & Resumo */}
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <span style={{
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem',
                        fontFamily: 'var(--font-heading)',
                        lineHeight: '1.35'
                      }}>
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
                          lineHeight: '1.4'
                        }}>
                          {item.descricao}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Fonte */}
                  <td>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      <Rss size={13} color="#78716c" />
                      <span>{item.fonte || 'Fonte Externa'}</span>
                    </div>
                  </td>

                  {/* Categoria */}
                  <td>
                    <span className={`badge-category ${getCategoriaClass(item.categoria)}`}>
                      {item.categoria || 'Geral'}
                    </span>
                  </td>

                  {/* Data Relativa (date-fns) */}
                  <td>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <Calendar size={13} color="#78716c" />
                      <span>{formatarTempoRelativo(item.dataDePublicacao)}</span>
                    </div>
                  </td>

                  {/* Ações */}
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
                          color: 'var(--text-secondary)',
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

      {/* Visualização Adaptativa para Telas Menores / Mobile (< 768px) */}
      <div className="news-cards-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <AnimatePresence>
          {noticias.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="minimal-panel"
              style={{ padding: '16px', cursor: 'pointer' }}
              onClick={() => aoSelecionarNoticia(item)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className={`badge-category ${getCategoriaClass(item.categoria)}`}>
                  {item.categoria || 'Geral'}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {formatarTempoRelativo(item.dataDePublicacao)}
                </span>
              </div>

              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                color: 'var(--text-primary)',
                marginBottom: '6px',
                lineHeight: '1.35'
              }}>
                {item.nome}
              </h4>

              {item.descricao && (
                <p style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: '1.4',
                  marginBottom: '12px'
                }}>
                  {item.descricao}
                </p>
              )}

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '10px',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '0.78rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                  <Rss size={12} color="#78716c" />
                  <span>{item.fonte || 'Fonte'}</span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }} onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={(e) => copiarLink(e, item.endereco)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    Copiar Link
                  </button>
                  <a
                    href={item.endereco}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent-main)', fontWeight: '600', textDecoration: 'none' }}
                  >
                    Abrir <ArrowUpRight size={13} style={{ verticalAlign: 'middle' }} />
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

import { Calendar, Rss, ArrowUpRight, Copy, Flame } from './Icons';
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
      <div 
        className="uol-panel"
        style={{ padding: '40px 20px', textAlign: 'center', background: '#ffffff' }}
      >
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '14px', fontWeight: '600' }}>
          Nenhuma notícia encontrada para os filtros aplicados.
        </p>
        {aoLimparFiltros && (
          <button className="btn-uol-secondary" onClick={aoLimparFiltros}>
            Limpar Filtros de Pesquisa
          </button>
        )}
      </div>
    );
  }

  const noticiaHero = noticias[0];
  const demaisNoticias = noticias.slice(1);

  return (
    <div>
      {noticiaHero && (
        <div 
          style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #eaeaea', display: 'flex', gap: '30px', cursor: 'pointer' }}
          onClick={() => aoSelecionarNoticia(noticiaHero)}
        >
          {/* Main news left side */}
          <div style={{ flex: '1' }}>
            <h2 style={{ fontFamily: 'Arial, sans-serif', fontSize: '2.8rem', fontWeight: 'bold', color: '#111', lineHeight: '1.05', marginBottom: '15px', letterSpacing: '-0.03em' }}>
              {noticiaHero.nome}
            </h2>

            {noticiaHero.descricao && (
              <p style={{ fontSize: '1.15rem', color: '#737373', lineHeight: '1.4', marginBottom: '20px' }}>
                {noticiaHero.descricao}
              </p>
            )}

            {/* Simulated bullet points for extra news (UOL style) */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid #eaeaea', paddingTop: '15px' }}>
              {demaisNoticias.slice(0, 3).map((item, idx) => (
                 <li key={idx} style={{ marginBottom: '10px', fontSize: '0.95rem', color: '#333' }}>
                    <span style={{ color: '#E2A300', fontWeight: 'bold', marginRight: '5px' }}>•</span> 
                    {item.nome}
                 </li>
              ))}
            </ul>
          </div>

          {/* Right side ad / generic UOL red block */}
          <div style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '15px' }} onClick={(e) => e.stopPropagation()}>
            {/* Fake Canal UOL Block */}
            <div style={{ border: '1px solid #e5e5e5', background: '#f9f9f9', height: '250px', position: 'relative' }}>
              <div style={{ background: '#c8102e', color: '#fff', padding: '8px 12px', fontWeight: 'bold', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>canal NEWSPLEZE</span>
                <span style={{ fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }}></span> AO VIVO</span>
              </div>
              <div style={{ padding: '20px', textAlign: 'center', color: '#aaa', fontSize: '0.8rem', marginTop: '50px' }}>
                Vídeo / Ao vivo <br/> (Simulação)
              </div>
            </div>
            
            {/* Action buttons for hero */}
             <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button 
                type="button"
                className="btn-uol-secondary"
                onClick={(e) => copiarLink(e, noticiaHero.endereco)}
                style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '0' }}
              >
                <Copy size={13} /> COPIAR
              </button>
              <a
                href={noticiaHero.endereco}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-uol-primary"
                style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '0' }}
              >
                ABRIR MATÉRIA <ArrowUpRight size={13} />
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
                <th style={{ width: '45%' }}>MAIS NOTÍCIAS</th>
                <th style={{ width: '18%' }}>FONTE</th>
                <th style={{ width: '15%' }}>EDITORIA</th>
                <th style={{ width: '14%' }}>PUBLICADO</th>
                <th style={{ width: '8%', textAlign: 'right' }}>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {/* Omit the first 3 since they are in the hero bullets now */}
              {demaisNoticias.slice(3).map((item, idx) => (
                <tr
                  key={item.id || idx}
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
                      <Rss size={13} color="#E2A300" />
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
                          color: 'var(--uol-yellow-dark)',
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="news-cards-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {demaisNoticias.map((item, idx) => (
          <div
            key={item.id || idx}
            className="uol-panel"
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
              color: 'var(--uol-dark)',
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
                <Rss size={12} color="#E2A300" />
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
                  style={{ color: 'var(--uol-yellow-dark)', fontWeight: '800', textDecoration: 'none' }}
                >
                  Abrir <ArrowUpRight size={12} style={{ verticalAlign: 'middle' }} />
                </a>
              </div>
            </div>
          </div>
        ))}
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
    </div>
  );
}

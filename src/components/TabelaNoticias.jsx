import { Calendar, Rss, ArrowUpRight, Copy, Flame } from './Icons';
import { formatarTempoRelativo } from '../utils/formatadorData';

export default function TabelaNoticias({ noticias, aoSelecionarNoticia, aoLimparFiltros }) {
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

  const copiarLink = (e, url) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
  };


  if (!noticias || noticias.length === 0) {
    return (
      <div
        className="nf-card"
        style={{ padding: '48px 24px', textAlign: 'center' }}
      >
        <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '14px' }}>
          Nenhuma notícia encontrada para os filtros aplicados.
        </p>
        {aoLimparFiltros && (
          <button className="btn-secondary" onClick={aoLimparFiltros}>
            Limpar Filtros
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
        <div className="hero-card" onClick={() => aoSelecionarNoticia(noticiaHero)}>
          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={`badge ${getCategoriaClass(noticiaHero.categoria)}`}>
                {noticiaHero.categoria || 'Geral'}
              </span>
              <span className="hero-card-label">
                <Flame size={13} /> Destaque
              </span>
            </div>
            <span style={{ fontSize: '0.77rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              {formatarTempoRelativo(noticiaHero.dataDePublicacao)}
            </span>
          </div>

          <h2 className="hero-title">{noticiaHero.nome}</h2>

          {noticiaHero.descricao && (
            <p className="hero-description">{noticiaHero.descricao}</p>
          )}


          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderTop: '1px solid var(--border)', paddingTop: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <Rss size={13} color="var(--accent)" />
              <span>Fonte: <strong style={{ color: 'var(--text-primary)' }}>{noticiaHero.fonte || 'Desconhecida'}</strong></span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="btn-secondary"
                onClick={(e) => copiarLink(e, noticiaHero.endereco)}
                style={{ padding: '5px 11px', fontSize: '0.76rem' }}
              >
                <Copy size={13} /> Copiar
              </button>
              <a
                href={noticiaHero.endereco}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '5px 11px', fontSize: '0.76rem' }}
              >
                Abrir <ArrowUpRight size={13} />
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
                <th style={{ width: '46%' }}>Título & Resumo</th>
                <th style={{ width: '17%' }}>Fonte</th>
                <th style={{ width: '14%' }}>Editoria</th>
                <th style={{ width: '14%' }}>Publicação</th>
                <th style={{ width: '9%', textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {demaisNoticias.map((item, idx) => (
                <tr
                  key={item.id || idx}
                  onClick={() => aoSelecionarNoticia(item)}
                >
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <span className="news-item-title">{item.nome}</span>
                      {item.descricao && (
                        <span style={{
                          fontSize: '0.78rem',
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

                  <td>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.81rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      <Rss size={12} color="var(--accent)" />
                      {item.fonte || 'Geral'}
                    </div>
                  </td>

                  <td>
                    <span className={`badge ${getCategoriaClass(item.categoria)}`}>
                      {item.categoria || 'Geral'}
                    </span>
                  </td>

                  <td>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.77rem', color: 'var(--text-muted)' }}>
                      <Calendar size={12} />
                      {formatarTempoRelativo(item.dataDePublicacao)}
                    </div>
                  </td>

                  <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                      <button
                        type="button"
                        className="btn-icon"
                        onClick={(e) => copiarLink(e, item.endereco)}
                        title="Copiar link"
                      >
                        <Copy size={14} />
                      </button>
                      <a
                        href={item.endereco}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Abrir matéria"
                        className="btn-icon"
                        style={{ color: 'var(--accent)' }}
                      >
                        <ArrowUpRight size={15} />
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
            className="nf-card"
            style={{ padding: '16px', cursor: 'pointer', transition: 'box-shadow 0.18s' }}
            onClick={() => aoSelecionarNoticia(item)}
            onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className={`badge ${getCategoriaClass(item.categoria)}`}>
                {item.categoria || 'Geral'}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {formatarTempoRelativo(item.dataDePublicacao)}
              </span>
            </div>

            <h4 style={{
              fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)',
              marginBottom: '5px', lineHeight: '1.35'
            }}>
              {item.nome}
            </h4>

            {item.descricao && (
              <p style={{
                fontSize: '0.79rem', color: 'var(--text-muted)',
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                overflow: 'hidden', lineHeight: '1.4', marginBottom: '10px'
              }}>
                {item.descricao}
              </p>
            )}

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              paddingTop: '10px', borderTop: '1px solid var(--border)', fontSize: '0.76rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <Rss size={11} color="var(--accent)" />
                {item.fonte || 'Geral'}
              </div>

              <div style={{ display: 'flex', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
                <button
                  className="btn-icon"
                  onClick={(e) => copiarLink(e, item.endereco)}
                  style={{ fontSize: '0.76rem', padding: '2px 6px' }}
                >
                  <Copy size={12} />
                </button>
                <a
                  href={item.endereco}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon"
                  style={{ color: 'var(--accent)', fontSize: '0.76rem', padding: '2px 6px' }}
                >
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

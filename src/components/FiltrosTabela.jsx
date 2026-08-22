import { Filter, Rss, Search, X } from './Icons';

export default function FiltrosTabela({
  categorias,
  fontes,
  categoriaSelecionada,
  setCategoriaSelecionada,
  fonteSelecionada,
  setFonteSelecionada,
  termoBusca,
  setTermoBusca,
  aoLimparFiltros
}) {
  const possuiFiltroAtivo = categoriaSelecionada !== '' || fonteSelecionada !== '' || termoBusca !== '';

  return (
    <div
      className="nf-card"
      style={{ padding: '18px 22px', marginBottom: '20px' }}
    >

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          <Filter size={15} color="var(--accent)" />
          Editorias & Filtros
        </div>

        {possuiFiltroAtivo && (
          <button
            type="button"
            className="btn-secondary"
            onClick={aoLimparFiltros}
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          >
            <X size={12} /> Limpar
          </button>
        )}
      </div>


      <div className="category-pills" style={{ marginBottom: '16px' }}>
        <button
          type="button"
          className={`category-pill ${categoriaSelecionada === '' ? 'active' : ''}`}
          onClick={() => setCategoriaSelecionada('')}
        >
          Todas
        </button>
        {categorias.map((cat, idx) => (
          <button
            key={idx}
            type="button"
            className={`category-pill ${categoriaSelecionada.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
            onClick={() => setCategoriaSelecionada(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '12px'
      }}>
        <div>
          <label className="nf-label">Fonte</label>
          <div className="nf-input-icon-wrap">
            <Rss size={14} />
            <select
              className="nf-select"
              value={fonteSelecionada}
              onChange={(e) => setFonteSelecionada(e.target.value)}
            >
              <option value="">Todas as fontes ({fontes.length})</option>
              {fontes.map((fonte, idx) => (
                <option key={idx} value={fonte.nome}>{fonte.nome}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="nf-label">Pesquisar</label>
          <div className="nf-input-icon-wrap">
            <Search size={14} />
            <input
              type="text"
              className="nf-input"
              placeholder="Buscar por título ou resumo..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

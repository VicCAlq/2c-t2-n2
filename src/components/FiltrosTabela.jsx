import { motion } from 'framer-motion';
import { Filter, Rss, Search, X } from 'lucide-react';

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
    <motion.div 
      className="g1-panel"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      style={{ padding: '16px', marginBottom: '20px' }}
    >
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--g1-dark)' }}>
            <Filter size={15} color="#c8102e" />
            <span>Editorias & Filtros</span>
          </div>

          {possuiFiltroAtivo && (
            <button 
              type="button"
              className="btn-g1-secondary"
              onClick={aoLimparFiltros}
              style={{ padding: '3px 8px', fontSize: '0.75rem' }}
            >
              <X size={12} /> Limpar Filtros
            </button>
          )}
        </div>

        <div className="category-pills">
          <button
            type="button"
            className={`category-pill ${categoriaSelecionada === '' ? 'active' : ''}`}
            onClick={() => setCategoriaSelecionada('')}
          >
            Todas as Editorias
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
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '12px'
      }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '900', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
            Filtrar por Fonte
          </label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Rss size={14} color="#64748b" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
            <select
              className="custom-select"
              style={{ paddingLeft: '34px' }}
              value={fonteSelecionada}
              onChange={(e) => setFonteSelecionada(e.target.value)}
            >
              <option value="">Todas as Fontes ({fontes.length})</option>
              {fontes.map((fonte, idx) => (
                <option key={idx} value={fonte.nome}>
                  {fonte.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '900', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
            Pesquisar no Portal
          </label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={14} color="#64748b" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
            <input
              type="text"
              className="custom-input"
              style={{ paddingLeft: '34px' }}
              placeholder="Digite o termo de busca..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

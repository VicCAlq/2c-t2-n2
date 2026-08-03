import { motion } from 'framer-motion';
import { Filter, Tag, Rss, Search, X } from 'lucide-react';

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
      className="minimal-panel"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      style={{ padding: '20px', marginBottom: '20px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>
          <Filter size={15} color="#57534e" />
          <span>Filtros de Pesquisa</span>
        </div>

        {possuiFiltroAtivo && (
          <button 
            type="button"
            className="btn-secondary"
            onClick={aoLimparFiltros}
            style={{ padding: '4px 10px', fontSize: '0.78rem' }}
          >
            <X size={12} /> Limpar Filtros
          </button>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px'
      }}>
  
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Filtrar por Categoria
          </label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Tag size={14} color="#78716c" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
            <select
              className="custom-select"
              style={{ paddingLeft: '34px' }}
              value={categoriaSelecionada}
              onChange={(e) => setCategoriaSelecionada(e.target.value)}
            >
              <option value="">Todas as Categorias ({categorias.length})</option>
              {categorias.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

   
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Filtrar por Fonte
          </label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Rss size={14} color="#78716c" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
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
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Buscar Palavra-chave
          </label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={14} color="#78716c" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
            <input
              type="text"
              className="custom-input"
              style={{ paddingLeft: '34px' }}
              placeholder="Buscar título..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

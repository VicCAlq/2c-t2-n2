import { Filter, Rss, X } from './Icons';

export default function FiltrosTabela({
  categorias,
  fontes,
  categoriaSelecionada,
  setCategoriaSelecionada,
  fonteSelecionada,
  setFonteSelecionada,
  aoLimparFiltros
}) {
  const possuiFiltroAtivo = categoriaSelecionada !== '' || fonteSelecionada !== '';

  return (
    <div 
      style={{ 
        borderBottom: '1px solid #eaeaea', 
        padding: '12px 0', 
        marginBottom: '25px',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '15px'
      }}
    >
      {/* Editorias (Categories) left side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', fontWeight: 'bold', color: '#111', textTransform: 'uppercase' }}>
          <Filter size={13} color="#E2A300" />
          <span>Editorias:</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            style={{
              background: categoriaSelecionada === '' ? '#E2A300' : 'none',
              color: categoriaSelecionada === '' ? '#111' : '#555',
              border: categoriaSelecionada === '' ? '1px solid #E2A300' : '1px solid #ccc',
              padding: '4px 10px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => setCategoriaSelecionada('')}
          >
            TODAS
          </button>
          {categorias.map((cat, idx) => (
            <button
              key={idx}
              type="button"
              style={{
                background: categoriaSelecionada.toLowerCase() === cat.toLowerCase() ? '#E2A300' : 'none',
                color: categoriaSelecionada.toLowerCase() === cat.toLowerCase() ? '#111' : '#555',
                border: categoriaSelecionada.toLowerCase() === cat.toLowerCase() ? '1px solid #E2A300' : '1px solid #ccc',
                padding: '4px 10px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
              onClick={() => setCategoriaSelecionada(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Font Filter right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Rss size={12} color="#666" style={{ position: 'absolute', left: '8px', pointerEvents: 'none' }} />
          <select
            style={{ 
              padding: '5px 10px 5px 24px', 
              fontSize: '0.75rem', 
              border: '1px solid #ccc', 
              background: '#fff',
              outline: 'none',
              fontWeight: 'bold',
              color: '#333',
              height: '28px'
            }}
            value={fonteSelecionada}
            onChange={(e) => setFonteSelecionada(e.target.value)}
          >
            <option value="">TODAS AS FONTES ({fontes.length})</option>
            {fontes.map((fonte, idx) => (
              <option key={idx} value={fonte.nome}>
                {fonte.nome.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {possuiFiltroAtivo && (
          <button 
            type="button"
            onClick={aoLimparFiltros}
            style={{ 
              padding: '5px 10px', 
              fontSize: '0.7rem', 
              background: 'none', 
              border: '1px solid #b91c1c', 
              color: '#b91c1c', 
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              height: '28px'
            }}
          >
            <X size={10} /> LIMPAR
          </button>
        )}
      </div>
    </div>
  );
}

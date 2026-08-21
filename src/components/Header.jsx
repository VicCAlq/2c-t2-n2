import { RefreshCw, Newspaper, Rss, Clock, Trash2 } from './Icons';
import { formatarTempoRelativo } from '../utils/formatadorData';

export default function Header({ totalNoticias, totalFontes, aoAtualizarFeeds, aoLimparTudo, carregando, noticiaDestaque }) {
  const dataHoje = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  const dataCapitalizada = dataHoje.charAt(0).toUpperCase() + dataHoje.slice(1);

  return (
    <header style={{ marginBottom: '30px', fontFamily: 'Arial, sans-serif' }}>
      {/* 1. Barra Preta Superior */}
      <div style={{ backgroundColor: '#111', color: '#fff', fontSize: '0.65rem', fontWeight: 'bold', padding: '6px 0', letterSpacing: '0.05em' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '15px' }}>
          <span style={{ color: '#E2A300' }}>INGRESSO.COM</span>
          <span>BATE-PAPO</span>
          <span>UOL HOST</span>
          <span>PASSEI DIRETO</span>
          <span>UOL PLAY</span>
          <span>PAGBANK</span>
          <span>UOL ADS</span>
        </div>
      </div>

      {/* 2. Barra Branca do Logo e Ações */}
      <div style={{ backgroundColor: '#ffffff', padding: '20px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ position: 'relative' }}>
              <span style={{ color: '#E2A300', fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.05em' }}>UOL</span>
              <span style={{ position: 'absolute', bottom: '-2px', left: '0', fontSize: '0.65rem', fontWeight: 'bold', letterSpacing: '0.2em' }}>NOTÍCIAS</span>
            </div>
            
            {/* Stats as subtle info */}
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.7rem', color: '#666', borderLeft: '1px solid #eee', paddingLeft: '15px' }}>
              <span><strong style={{ color: '#000' }}>{totalNoticias}</strong> notícias carregadas</span>
              <span><strong style={{ color: '#000' }}>{totalFontes}</strong> fontes ativas</span>
            </div>
          </div>

          {/* Ações / Busca simulada */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             {totalFontes > 0 && (
              <button 
                onClick={aoAtualizarFeeds}
                disabled={carregando}
                style={{ 
                  background: 'none', border: '1px solid #ccc', padding: '6px 12px', fontSize: '0.7rem', fontWeight: 'bold',
                  cursor: 'pointer', color: '#333', display: 'flex', alignItems: 'center', gap: '4px', opacity: carregando ? 0.5 : 1
                }}
              >
                <RefreshCw size={12} className={carregando ? 'spin-anim' : ''} />
                {carregando ? 'ATUALIZANDO...' : 'ATUALIZAR FEEDS'}
              </button>
            )}
            
            {(totalFontes > 0 || totalNoticias > 0) && (
              <button 
                onClick={aoLimparTudo}
                style={{ 
                  background: 'none', border: '1px solid #ccc', padding: '6px 12px', fontSize: '0.7rem', fontWeight: 'bold',
                  cursor: 'pointer', color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '4px'
                }}
              >
                <Trash2 size={12} />
                LIMPAR TUDO
              </button>
            )}

            {/* Fake Search bar from UOL */}
            <div style={{ display: 'flex', alignItems: 'center', background: '#f5f5f5', padding: '6px 12px', border: '1px solid #eaeaea', color: '#999', fontSize: '0.75rem', gap: '6px', marginLeft: '10px' }}>
              <span style={{ fontWeight: 'bold' }}>BUSCAR NO UOL</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Barra de Menu de Categorias */}
      <div style={{ borderTop: '2px solid #111', borderBottom: '1px solid #eaeaea', padding: '10px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '15px', fontSize: '0.7rem', fontWeight: 'bold', color: '#555', textTransform: 'uppercase' }}>
          <span>PRODUTOS</span>
          <span>FLASH</span>
          <span>ELEIÇÕES</span>
          <span style={{ color: '#000' }}>NOTÍCIAS</span>
          <span>POLÍTICA</span>
          <span>CARROS</span>
          <span>ECONOMIA</span>
          <span>ESPORTE</span>
          <span>SPLASH</span>
          <span>UNIVERSA</span>
          <span>VIVA BEM</span>
          <span>TILT</span>
          <span>ECOA</span>
        </div>
      </div>

      {noticiaDestaque && (
        <div className="ticker-bar">
          <span className="ticker-badge">URGENTE</span>
          <Clock size={14} color="#E2A300" />
          <span className="ticker-text">
            <strong>{noticiaDestaque.fonte}:</strong> {noticiaDestaque.nome}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#9ca3af', marginLeft: 'auto', whiteSpace: 'nowrap' }}>
            {formatarTempoRelativo(noticiaDestaque.dataDePublicacao)}
          </span>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-anim {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </header>
  );
}

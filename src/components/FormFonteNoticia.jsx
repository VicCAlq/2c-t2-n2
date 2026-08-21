import { useState } from 'react';
import { Plus, Link as LinkIcon, Loader2 } from './Icons';

export default function FormFonteNoticia({ aoAdicionarFonte, carregando }) {
  const [endereco, setEndereco] = useState('');
  const [categoria, setCategoria] = useState('Tecnologia');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!endereco.trim()) {
      setErro('Insira o endereço URL.');
      return;
    }

    try {
      await aoAdicionarFonte({
        endereco: endereco.trim(),
        nome: '', // Removido campo nome
        categoria: categoria.trim() || 'Geral',
        descricao: '' // Removida descrição
      });

      setEndereco('');
    } catch (err) {
      setErro(err.message || 'Erro ao carregar a fonte.');
    }
  };

  return (
    <div 
      style={{ 
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '280px',
        zIndex: 9999,
        background: '#ffffff',
        border: '2px solid #111111',
        padding: '12px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '900', color: '#111', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              URL da Fonte RSS
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <LinkIcon size={12} color="#64748b" style={{ position: 'absolute', left: '8px', pointerEvents: 'none' }} />
              <input 
                type="url" 
                className="custom-input"
                style={{ padding: '6px 8px 6px 26px', fontSize: '0.75rem', borderRadius: '0' }}
                placeholder="https://feedurl.com/rss" 
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '900', color: '#111', marginBottom: '3px', textTransform: 'uppercase' }}>
              Editoria
            </label>
            <select 
              className="custom-select"
              style={{ padding: '5px', fontSize: '0.75rem', borderRadius: '0', height: '30px' }}
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="Tecnologia">Tecnologia</option>
              <option value="Mundo">Mundo</option>
              <option value="Inovação">Inovação</option>
              <option value="Esportes">Esportes</option>
              <option value="Economia">Economia</option>
              <option value="Cultura">Cultura</option>
              <option value="Geral">Geral</option>
            </select>
          </div>

          {erro && (
            <div style={{ color: '#b91c1c', fontSize: '0.7rem', background: '#fef2f2', padding: '4px 8px', border: '1px solid #fecaca' }}>
              {erro}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px' }}>
            <button 
              type="submit" 
              className="btn-uol-primary"
              disabled={carregando}
              style={{ padding: '5px 10px', fontSize: '0.7rem', borderRadius: '0', width: '100%', justifyContent: 'center' }}
            >
              {carregando ? <Loader2 size={12} className="spin-anim" /> : <Plus size={12} />}
              ADICIONAR FONTE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

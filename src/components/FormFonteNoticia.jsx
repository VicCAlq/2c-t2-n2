import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Link as LinkIcon, Loader2, Sparkles } from 'lucide-react';

export default function FormFonteNoticia({ aoAdicionarFonte, carregando }) {
  const [endereco, setEndereco] = useState('');
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('Tecnologia');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!endereco.trim()) {
      setErro('Insira o endereço (URL) da fonte de notícias.');
      return;
    }

    try {
      await aoAdicionarFonte({
        endereco: endereco.trim(),
        nome: nome.trim(),
        categoria: categoria.trim() || 'Geral',
        descricao: descricao.trim()
      });

      setEndereco('');
      setNome('');
      setDescricao('');
    } catch (err) {
      setErro(err.message || 'Erro ao carregar a fonte.');
    }
  };

  return (
    <motion.div 
      className="g1-panel"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      style={{ padding: '20px', marginBottom: '20px', borderLeft: '4px solid var(--g1-red)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <Sparkles size={18} color="#c8102e" />
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 900, color: 'var(--g1-dark)', margin: 0 }}>
          Cadastrar Fonte de Notícias
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-dark)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              URL da Fonte de Notícias
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <LinkIcon size={16} color="#64748b" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
              <input 
                type="url" 
                className="custom-input"
                style={{ paddingLeft: '38px' }}
                placeholder="Cole aqui a URL da fonte de notícias..." 
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '4px' }}>
                Nome da Fonte
              </label>
              <input 
                type="text" 
                className="custom-input"
                placeholder="Nome da fonte" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '4px' }}>
                Editoria
              </label>
              <select 
                className="custom-select"
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

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '4px' }}>
                Descrição
              </label>
              <input 
                type="text" 
                className="custom-input"
                placeholder="Breve resumo..." 
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>

          {erro && (
            <div style={{ color: '#b91c1c', fontSize: '0.8rem', background: '#fef2f2', padding: '8px 12px', borderRadius: '0px', border: '1px solid #fecaca' }}>
              {erro}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
            <button 
              type="submit" 
              className="btn-g1-primary"
              disabled={carregando}
            >
              {carregando ? <Loader2 size={16} className="spin-anim" /> : <Plus size={16} />}
              Adicionar Fonte
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}

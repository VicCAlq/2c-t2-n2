import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Link as LinkIcon, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

export default function FormFonteNoticia({ aoAdicionarFonte, carregando }) {
  const [endereco, setEndereco] = useState('');
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('Tecnologia');
  const [descricao, setDescricao] = useState('');
  const [opcoesAvancadas, setOpcoesAvancadas] = useState(false);
  const [erro, setErro] = useState('');

  const sugestoes = [
    { nome: 'G1 Tecnologia', url: 'https://g1.globo.com/rss/g1/tecnologia/', cat: 'Tecnologia' },
    { nome: 'BBC Brasil', url: 'https://feeds.bbci.co.uk/portuguese/rss.xml', cat: 'Mundo' },
    { nome: 'TechCrunch', url: 'https://techcrunch.com/feed/', cat: 'Inovação' },
    { nome: 'GE Esportes', url: 'https://ge.globo.com/rss/ge/', cat: 'Esportes' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!endereco.trim()) {
      setErro('Insira o endereço (URL) da fonte de notícias.');
      toast.error('Informe a URL da fonte de notícias.');
      return;
    }

    try {
      await aoAdicionarFonte({
        endereco: endereco.trim(),
        nome: nome.trim(),
        categoria: categoria.trim() || 'Geral',
        descricao: descricao.trim()
      });

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#292524', '#78716c', '#d6d3d1']
      });

      toast.success('Fonte de notícias adicionada com sucesso!');

      setEndereco('');
      setNome('');
      setDescricao('');
    } catch (err) {
      setErro(err.message || 'Erro ao carregar a fonte.');
      toast.error('Erro ao adicionar fonte.');
    }
  };

  return (
    <motion.div 
      className="minimal-panel"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ padding: '24px', marginBottom: '24px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>
          Adicionar Nova Fonte de Notícias
        </h2>

        <button 
          type="button"
          onClick={() => setOpcoesAvancadas(!opcoesAvancadas)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '0.82rem',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {opcoesAvancadas ? 'Ocultar campos opcionais' : 'Mais opções (Nome/Categoria)'}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Link da Fonte de Notícias (URL)
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <LinkIcon size={16} color="#78716c" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
              <input 
                type="url" 
                className="custom-input"
                style={{ paddingLeft: '38px' }}
                placeholder="Cole aqui o link do RSS ou site de notícias..." 
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required
              />
            </div>
          </div>

          {opcoesAvancadas && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Nome Personalizado (Opcional)
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
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Categoria
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
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Descrição (Opcional)
                </label>
                <input 
                  type="text" 
                  className="custom-input"
                  placeholder="Breve resumo da fonte" 
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
            </motion.div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Fontes sugeridas:
            </span>
            {sugestoes.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => { setEndereco(s.url); setNome(s.nome); setCategoria(s.cat); toast.info(`Atalho selecionado: ${s.nome}`); }}
                style={{
                  background: '#f5f4f0',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                + {s.nome}
              </button>
            ))}
          </div>

          {erro && (
            <div style={{ color: '#b91c1c', fontSize: '0.82rem', background: '#fef2f2', padding: '8px 12px', borderRadius: '6px', border: '1px solid #fecaca' }}>
              {erro}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
            <button 
              type="submit" 
              className="btn-primary"
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

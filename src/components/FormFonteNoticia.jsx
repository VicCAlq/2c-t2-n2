import { useState } from 'react';
import { Plus, Link as LinkIcon, Loader2, Sparkles } from './Icons';

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
    <div
      className="nf-card"
      style={{ padding: '22px 24px', marginBottom: '20px' }}
    >

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
        <Sparkles size={17} color="var(--accent)" />
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Adicionar Fonte RSS
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>


          <div>
            <label className="nf-label">URL da Fonte</label>
            <div className="nf-input-icon-wrap">
              <LinkIcon size={15} />
              <input
                type="url"
                className="nf-input"
                placeholder="Cole aqui a URL do feed RSS..."
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div>
              <label className="nf-label">Nome da Fonte</label>
              <input
                type="text"
                className="nf-input"
                placeholder="Ex: BBC Brasil"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div>
              <label className="nf-label">Editoria</label>
              <select
                className="nf-select"
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
              <label className="nf-label">Descrição (opcional)</label>
              <input
                type="text"
                className="nf-input"
                placeholder="Breve descrição da fonte..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>

          {erro && <div className="nf-error">{erro}</div>}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px' }}>
            <button type="submit" className="btn-primary" disabled={carregando}>
              {carregando ? <Loader2 size={15} className="spin-anim" /> : <Plus size={15} />}
              {carregando ? 'Carregando...' : 'Adicionar Fonte'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

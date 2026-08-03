import { FonteNoticia } from '../models/FonteNoticia';
import { Noticia } from '../models/Noticia';

export const fontesIniciais = [
  new FonteNoticia(
    'G1 Tecnologia',
    'https://g1.globo.com/rss/g1/tecnologia/',
    'Últimas notícias sobre inovação, tecnologia, inteligência artificial e gadgets.',
    'Tecnologia'
  ),
  new FonteNoticia(
    'BBC Brasil',
    'https://feeds.bbci.co.uk/portuguese/rss.xml',
    'Notícias internacionais, política, ciência e acontecimentos mundiais.',
    'Mundo'
  ),
  new FonteNoticia(
    'TechCrunch',
    'https://techcrunch.com/feed/',
    'As principais novidades sobre startups, venture capital e grandes empresas de tecnologia.',
    'Inovação'
  ),
  new FonteNoticia(
    'GE Esportes',
    'https://ge.globo.com/rss/ge/',
    'Cobertura completa dos principais eventos esportivos, jogos e transferências.',
    'Esportes'
  )
];

export const noticiasIniciais = [
  new Noticia(
    'Avanços em Inteligência Artificial Revolucionam Desenvolvimento de Software',
    'https://g1.globo.com/tecnologia/noticia/2026/08/03/inteligencia-artificial-desenvolvimento-software.ghtml',
    'Novas ferramentas de IA generativa aumentam a produtividade dos desenvolvedores e transformam a criação de aplicações web em tempo recorde.',
    new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    'Tecnologia',
    'G1 Tecnologia'
  ),
  new Noticia(
    'Missão Espacial Internacional Prepara Lançamento para Nova Estação Lunar',
    'https://www.bbc.com/portuguese/articles/c123456789space',
    'Cientistas e agências espaciais de diversos países unem forças para enviar novo módulo habitacional à órbita da Lua.',
    new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    'Mundo',
    'BBC Brasil'
  ),
  new Noticia(
    'Startups de Energia Limpa Recebem Aporte Recorde no Terceiro Trimestre',
    'https://techcrunch.com/2026/08/03/clean-energy-startups-record-funding/',
    'Investimentos em fontes renováveis e baterias de próxima geração superam $15 bilhões em rodadas de financiamento globais.',
    new Date(Date.now() - 1000 * 60 * 280).toISOString(),
    'Inovação',
    'TechCrunch'
  ),
  new Noticia(
    'Final do Campeonato Mundial Promete Quebrar Recorde de Audiência',
    'https://ge.globo.com/futebol/noticia/2026/08/03/final-campeonato-mundial-audiencia.ghtml',
    'Equipes finalistas chegam em momentos decisivos com grande expectativa de público e transmissão global.',
    new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    'Esportes',
    'GE Esportes'
  ),
  new Noticia(
    'Novos Computadores Quânticos Atingem Marca Histórica de Estabilidade',
    'https://g1.globo.com/tecnologia/noticia/2026/08/03/computacao-quantica-estabilidade-recorde.ghtml',
    'Pesquisadores conseguem manter a coerência quântica por períodos mais longos, abrindo espaço para supercomputação prática.',
    new Date(Date.now() - 1000 * 60 * 500).toISOString(),
    'Tecnologia',
    'G1 Tecnologia'
  ),
  new Noticia(
    'Cúpula Global sobre Mudanças Climáticas Define Metas para 2030',
    'https://www.bbc.com/portuguese/articles/c987654321climate',
    'Líderes de mais de 100 países assinam acordo histórico para aceleração da transição ecológica e descarbonização.',
    new Date(Date.now() - 1000 * 60 * 720).toISOString(),
    'Mundo',
    'BBC Brasil'
  )
];

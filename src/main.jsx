import { StrictMode } from 'react'

// Intercepta requisições globais para decodificar feeds RSS em ISO-8859-1 corretamente sem alterar o leitor
const originalFetch = window.fetch;
window.fetch = async function(...args) {
  const response = await originalFetch(...args);
  const cloned = response.clone();
  
  // Sobrescreve o método .text() para detectar o encoding declarado no XML e usar o decodificador correto
  response.text = async function() {
    const buffer = await cloned.arrayBuffer();
    const decoderUtf8 = new TextDecoder('utf-8');
    let text = decoderUtf8.decode(buffer);
    
    const match = text.match(/<\?xml[^>]*encoding=["']([^"']+)["']/i);
    if (match && match[1]) {
      const encoding = match[1].toLowerCase();
      if (encoding !== 'utf-8' && encoding !== 'utf8') {
        try {
          const decoderCustom = new TextDecoder(encoding);
          text = decoderCustom.decode(buffer);
        } catch (_) {}
      }
    }
    return text;
  };
  
  return response;
};
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

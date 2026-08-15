import React from 'react';

export function InputComBotao({ meConfirma }) {
    return (
        <div style={{ display: 'flex', gap: '8px' }}>
            <input
                type="text"
                placeholder="Escreva aqui ó"
                id="meuCampoDeTexto"
            />

            <button
                onClick={() =>
                    meConfirma(document.getElementById('meuCampoDeTexto').value)}>Enviar</button>
        </div>
    );
}
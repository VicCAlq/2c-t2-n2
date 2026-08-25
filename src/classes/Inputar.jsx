import { useState } from "react";

export function InputComBotao({ meConfirma }) {
  const [valor, setValor] = useState("");

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <input
        type="text"
        placeholder="Cole o link RSS aqui"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />

      <button
        onClick={() => {
          meConfirma(valor);
          setValor("");
        }}
      >
        Enviar
      </button>
    </div>
  );
}
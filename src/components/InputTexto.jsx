import { useState } from "react";

export default function InputTexto() {
  const [textoInserido, setTextoInserido] = useState("");
  return (
    <div>
      <input
        type="text"
        value={textoInserido}
        onChange={(e) => setTextoInserido(e.target.value)}
        placeholder="Digite aqui o novo texto"
      />
    </div>
  );
}

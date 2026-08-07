import { useState } from 'react'

export default function Formulario() {
	const [ativado, setAtivado] = useState(false)

	return (
		<section>
			<button id="botao-nova-fonte" onClick={ () => setAtivado(!ativado) }>Inserir nova fonte</button>
			<form className={ativado ? "ativo" : ""}>
				<label htmlFor="fonte">URL da nova fonte:</label>
				<input id="fonte" type="text" placeholder="www.fontenoticia.com" />
				<button type="submit">Enviar</button>
			</form>
		</section>
		
	)
}

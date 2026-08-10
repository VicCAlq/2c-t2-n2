import { useState } from 'react'
import { adicionarFonte } from './database'

export default function Formulario() {
	const [ativado, setAtivado] = useState(false)

	const enviarFormulario = (e) => {
		e.preventDefault()

		const novaFonte = new FormData(e.target).get("nova-fonte").toString().trim()

		if (novaFonte.length === 0)
			throw new Error("Não envie dados vazios.")

		if (!novaFonte.startsWith("www.") && !novaFonte.startsWith("https://"))
			throw new Error("Não envie a URL incompleta.")

		adicionarFonte(novaFonte)
	}

	return (
		<section>
			<button id="botao-nova-fonte" onClick={ () => setAtivado(!ativado) }>Inserir nova fonte</button>
			<form className={ ativado ? "ativo" : "" } onSubmit={ (e) => enviarFormulario(e) }>
				<label htmlFor="fonte">URL da nova fonte (completo, por getileza):</label>
				<input id="fonte" name="nova-fonte" type="text" placeholder="www.fontenoticia.com" />
				<button type="submit">Enviar</button>
			</form>
		</section>
		
	)
}

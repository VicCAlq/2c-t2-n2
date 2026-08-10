import Formulario from "./components/Formulario.jsx";
import Tabela from "./components/Tabela.jsx"
import "./App.css"

const styles = {
	container: {
		flex: 1,
		padding: "0 5px",
		backgroundColor: "rgba(210, 248, 255, 1)",
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: "#101015"
	}
};

export default function App() {
	return (
		<div style={styles.container}>
			<h1>UtraMostradorDeNotícias10000!!!</h1>
			<Formulario />
			<Tabela />
		</div>
	);
}

import Exemplo from "./components/Exemplo";

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#eec",
    alignItems: 'center',
    justifyContent: 'center',
  },
  divTitulo: {
    backgroundColor: "rgba(80, 80, 13, 1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100px",
    marginLeft: "250px",
    width: "900px",
    borderRadius: "25px",
    color: "#e8e8f0ff"
  },
};

export default function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.divTitulo}>Notícias Do Amanhã!</h1>
      <Exemplo>Veja Notícias Novas!</Exemplo>
    </div>
  );
}

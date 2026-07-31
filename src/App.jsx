import Exemplo from "./components/Exemplo";

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#eec",
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
      <h1>Crie seu aplicativo React aqui</h1>
      <Exemplo>Componente de exemplo aqui</Exemplo>
    </div>
  );
}

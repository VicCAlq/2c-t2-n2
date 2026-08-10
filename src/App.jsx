import Exemplo from "./components/UI/UIModal";
import UINavBar from "./components/UI/UINavBar";  
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <UINavBar> </UINavBar>
      <Exemplo>Componente de exemplo aqui</Exemplo>
    </div>
  );
}

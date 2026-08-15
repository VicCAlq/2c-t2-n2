import Exemplo from "./components/UI/UIModal";
import UINavBar from "./components/UI/UINavBar";
import UITable from "./components/UI/UITable";
import UIInput from "./components/UI/UIInput";

import 'bootstrap/dist/css/bootstrap.min.css';

const styles = {
  container: {
    backgroundColor: "#eec",
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default function App() {
  return (
    <div style={styles.container}>
      <UINavBar> </UINavBar>
      <UIInput> </UIInput>
      <UITable> </UITable>
    </div>
  );
}

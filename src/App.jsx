import "./App.css";
import { Page1, Page2, Page3, Wizard } from "./components/Wizard";

function App() {
  return (
    <div className="App">
      <Wizard>
        <Page1 />
        <Page2 />
        <Page3 />
      </Wizard>
    </div>
  );
}

export default App;

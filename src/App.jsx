import "./App.css";
import Wizard from "./components/Wizard";

const Page1 = () => <h1>Page 1</h1>;
const Page2 = () => <h1>Page 2</h1>;
const Page3 = () => <h1>Page 3</h1>;
const Page4 = () => <h1>Page 4</h1>;

function App() {
  return (
    <div className="App">
      <Wizard>
        <Wizard.Pages>
          <Page1 />
          <Page2 />
          <Page3 />
          <Page4 />
        </Wizard.Pages>
        <div className="wizard__buttons">
          <Wizard.ButtonPrev className="wizard__buttons-left" />
          <Wizard.ButtonNext className="wizard__buttons-right" />
        </div>
      </Wizard>
    </div>
  );
}

export default App;

import "./App.css";
import Wizard from "./components/Wizard";

const Page1 = () => <h1>Page 1</h1>;
const Page2 = () => <h1>Page 2</h1>;
const Page3 = () => <h1>Page 3</h1>;
const Page4 = () => <h1>Page 4</h1>;

const initialState = {
  activePageIndex: 2,
};

const reducer = (state, action) => {
  if (action.type === Wizard.reducerActions.GO_NEXT_PAGE) {
    console.log("Custom reducer - next page click");
  }
  if (action.type === Wizard.reducerActions.SET_STEPS) {
    console.log("Custom reducer - we set the steps", action.payload);
  }

  return state;
};

function App() {
  return (
    <div className="App">
      <Wizard initialState={initialState} reducer={reducer}>
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

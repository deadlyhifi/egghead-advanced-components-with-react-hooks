import React from "react";
import "./App.css";
import Wizard, {
  useWizardNavigation,
  useWizardPages,
  useWizardProgress,
} from "./components/Wizard";

const Navigation = () => {
  const { goNextPage, goPrevPage, currentIndex, steps } = useWizardNavigation();
  return (
    <div className="wizard__buttons">
      <button onClick={goPrevPage} disabled={currentIndex <= 1}>
        Previous
      </button>
      <button onClick={goNextPage} disabled={currentIndex >= steps}>
        Next
      </button>
    </div>
  );
};

const Pages = ({ children }) => {
  const { activePageIndex } = useWizardPages(React.Children.count(children));
  return <div>{React.Children.toArray(children)[activePageIndex]}</div>;
};

const Progress = () => {
  const { currentIndex, steps } = useWizardProgress();

  return (
    <div>
      {currentIndex} of {steps}
    </div>
  );
};

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
        <Progress />
        <Pages>
          <Page1 />
          <Page2 />
          <Page3 />
          <Page4 />
        </Pages>
        <Navigation />
      </Wizard>
    </div>
  );
}

export default App;

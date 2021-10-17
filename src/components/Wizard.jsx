import React from "react";

const WizardContext = React.createContext();

const useWizardContext = () => {
  const context = React.useContext(WizardContext);

  if (!context) {
    throw new Error("Components must be rendered within Wizard");
  }

  return context;
};

export const useWizardNavigation = () => {
  const { goNextPage, goPrevPage, activePageIndex, steps } = useWizardContext();

  return {
    goNextPage,
    goPrevPage,
    currentIndex: activePageIndex + 1,
    steps,
  };
};

export const useWizardPages = (totalSteps) => {
  const { setSteps, activePageIndex } = useWizardContext();

  React.useEffect(() => {
    setSteps(totalSteps);
  }, [totalSteps, setSteps]);

  return {
    activePageIndex,
  };
};

export const useWizardProgress = () => {
  const { activePageIndex, steps } = useWizardContext();

  return { currentIndex: activePageIndex + 1, steps };
};

const defaultInitialState = {
  activePageIndex: 0,
  steps: 0,
};

const reducerActions = {
  GO_NEXT_PAGE: "GO_NEXT_PAGE",
  GO_PREV_PAGE: "GO_PREV_PAGE",
  SET_STEPS: "SET_STEPS",
};

const combineReducer =
  (...reducer) =>
  (state, action) => {
    return reducer.reduce((acc, nextReducer) => {
      return nextReducer(acc, action);
    }, state);
  };

const defaultReducer = (state, action) => state;

const wizardReducer = (state, action) => {
  const { activePageIndex } = state;
  switch (action.type) {
    case reducerActions.GO_PREV_PAGE:
      return { ...state, activePageIndex: activePageIndex - 1 };
    case reducerActions.GO_NEXT_PAGE:
      return { ...state, activePageIndex: activePageIndex + 1 };
    case reducerActions.SET_STEPS:
      return { ...state, steps: action.payload };
    default:
      return state;
  }
};

const Wizard = ({ children, reducer = defaultReducer, initialState = {} }) => {
  const [{ activePageIndex, steps }, dispatch] = React.useReducer(
    combineReducer(wizardReducer, reducer),
    { ...defaultInitialState, ...initialState }
  );

  const goPrevPage = () => {
    dispatch({ type: reducerActions.GO_PREV_PAGE });
  };

  const goNextPage = () => {
    dispatch({ type: reducerActions.GO_NEXT_PAGE });
  };

  const setSteps = React.useCallback(
    (count) => {
      dispatch({ type: reducerActions.SET_STEPS, payload: count });
    },
    [dispatch]
  );

  const context = {
    activePageIndex,
    goPrevPage,
    goNextPage,
    steps,
    setSteps,
  };

  return (
    <WizardContext.Provider value={context}>
      <div className="wizard">{children}</div>
    </WizardContext.Provider>
  );
};

const Pages = (props) => {
  const { activePageIndex, setSteps } = useWizardContext();
  const pages = React.Children.toArray(props.children);
  const steps = React.Children.count(props.children);
  const currentPage = pages[activePageIndex];

  React.useEffect(() => {
    setSteps(steps);
  }, [steps, setSteps]);

  return <div {...props}>{currentPage}</div>;
};

const ButtonPrev = (props) => {
  const { activePageIndex, goPrevPage } = useWizardContext();
  return (
    <button {...props} onClick={goPrevPage} disabled={activePageIndex <= 0}>
      Previous
    </button>
  );
};

const ButtonNext = (props) => {
  const { activePageIndex, goNextPage, steps } = useWizardContext();

  return (
    <button
      {...props}
      onClick={goNextPage}
      disabled={activePageIndex === steps - 1}
    >
      Next
    </button>
  );
};

Wizard.ButtonPrev = ButtonPrev;
Wizard.ButtonNext = ButtonNext;
Wizard.Pages = Pages;
Wizard.reducerActions = reducerActions;
export default Wizard;

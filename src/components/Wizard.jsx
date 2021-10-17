import React from "react";

const WizardContext = React.createContext();

const useWizard = () => {
  const context = React.useContext(WizardContext);

  if (!context) {
    throw new Error("Components must be rendered within Wizard");
  }

  return context;
};

const Wizard = ({ children }) => {
  const [activePageIndex, setActivePageIndex] = React.useState(0);
  const [steps, setSteps] = React.useState(0);

  const goPrevPage = () => {
    setActivePageIndex((index) => index - 1);
  };

  const goNextPage = () => {
    setActivePageIndex((index) => index + 1);
  };

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
  const { activePageIndex, setSteps } = useWizard();
  const pages = React.Children.toArray(props.children);
  const steps = React.Children.count(props.children);
  const currentPage = pages[activePageIndex];

  React.useEffect(() => {
    setSteps(steps);
  }, [steps, setSteps]);

  return <div {...props}>{currentPage}</div>;
};

const ButtonPrev = (props) => {
  const { activePageIndex, goPrevPage } = useWizard();
  return (
    <button {...props} onClick={goPrevPage} disabled={activePageIndex <= 0}>
      Previous
    </button>
  );
};

const ButtonNext = (props) => {
  const { activePageIndex, goNextPage, steps } = useWizard();

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
export default Wizard;

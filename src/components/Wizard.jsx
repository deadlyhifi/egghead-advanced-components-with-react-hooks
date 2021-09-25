import React from "react";

const WizardContext = React.createContext();

const Wizard = ({ children, steps }) => {
  const [activePageIndex, setActivePageIndex] = React.useState(0);

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
  };

  return (
    <WizardContext.Provider value={context}>
      <div className="wizard">{children}</div>
    </WizardContext.Provider>
  );
};

const Pages = (props) => {
  const { activePageIndex } = React.useContext(WizardContext);
  const pages = React.Children.toArray(props.children);
  const currentPage = pages[activePageIndex];

  return <div {...props}>{currentPage}</div>;
};

const ButtonPrev = (props) => {
  const { activePageIndex, goPrevPage } = React.useContext(WizardContext);
  return (
    <button {...props} onClick={goPrevPage} disabled={activePageIndex <= 0}>
      Previous
    </button>
  );
};

const ButtonNext = (props) => {
  const { activePageIndex, goNextPage, steps } =
    React.useContext(WizardContext);

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

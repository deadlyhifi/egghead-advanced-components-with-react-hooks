import React from "react";

const Wizard = ({ children }) => {
  const [activePage, setActivePage] = React.useState(0);
  const pages = React.Children.toArray(children);
  const currentPage = pages[activePage];

  const onPrevClick = () => {
    setActivePage((index) => index - 1);
  };

  const onNextClick = () => {
    setActivePage((index) => index + 1);
  };

  return (
    <div className="wizard">
      <div className="wizard__content">{currentPage}</div>

      <div className="wizard__buttons">
        <button onClick={onPrevClick} disabled={activePage <= 0}>
          Previous
        </button>

        <button
          onClick={onNextClick}
          disabled={activePage === pages.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const Page1 = () => <h1>Page 1</h1>;
const Page2 = () => <h1>Page 2</h1>;
const Page3 = () => <h1>Page 3</h1>;

export { Wizard, Page1, Page2, Page3 };

import React, { Fragment, useState, useEffect } from "react";
import { getSymbols } from "./Symbols/symbols";
import calculateSymbols from "./Symbols/calculateSymbols";
import renderIcons from "./renderIcons";
import "./reset.css";
import "./styles/App.css";

const App = () => {
  const [rows, setRows] = useState([]);
  const [credit, setCredit] = useState(1000);
  const [feature, setFeature] = useState(false);
  const [startFeature, setStartFeature] = useState(false);
  const [featureNumber, setFeatureNumber] = useState(0);
  const [winCredit, setWinCredit] = useState(0);
  const [winSymbols, setWinSymbols] = useState([]);

  useEffect(() => {
    const lists = rows.reduce((prev, next) => prev.concat(next), []);
    const results = lists.reduce(
      (acc, value) => ({
        ...acc,
        [value]: (acc[value] || 0) + 1
      }),
      {}
    );

    // Todo ****** awesome *****
    // getRows();

    const updateSlots = calculateSymbols(results, startFeature);
    setCredit(updateSlots.totalCredits + credit);
    setWinCredit(updateSlots.totalCredits);

    if (startFeature) {
      setFeatureNumber(featureNumber + 1);
    }
    if (updateSlots.isFeature && !startFeature) {
      setFeature(true);
    }
    if (featureNumber === 10 && startFeature) {
      setStartFeature(false);
      setFeatureNumber(0);
    }
    setWinSymbols(updateSlots.winSymbols);
    return () => {
      setFeature(false);
    };
  }, [rows]);

  useEffect(() => {
    getRows();
  }, []);

  useEffect(() => {
    if (feature) {
      setStartFeature(true);
    }
  }, [feature]);

  function getRows() {
    setRows([]);

    return Array(5)
      .fill([])
      .map((e, i) => {
        setRows(rows => [...rows, getSymbols().splice(3, 3)]);
      });
  }

  const RenderRows = () => {
    return rows.map(row => {
      return (
        <ul className="coins">
          {row.map(symbol => {
            const matched = winSymbols.includes(symbol);
            //console.log(symbol);
            return (
              <Fragment>
                <li
                  className={
                    !matched ? "coins__list" : "coins__list flicker-in-1"
                  }
                >
                  {renderIcons(symbol)}
                </li>
              </Fragment>
            );
          })}
        </ul>
      );
    });
  };

  const DisplayResults = () => {
    const wonSymbols = winSymbols.toString();
    // return renderIcon;
    console.log(winSymbols);
    if (wonSymbols) {
      const renderSymols = winSymbols.map(symbol => {
        return renderIcons(symbol.toString());
      });
      return (
        <Fragment>
          <div className="notification">
            You just Won <span className="strong"> ${winCredit}</span>
            {wonSymbols && " with "}
            {renderSymols}
          </div>
        </Fragment>
      );
    }
    return `You just Won $${winCredit} ${wonSymbols &&
      "with"} ${wonSymbols} ${wonSymbols && "s"}`;
  };
  const freeGames = 10 - featureNumber;
  return (
    <Fragment>
      <div className="container-wrapper">
        <div className={!startFeature ? "container" : "container rainbow-bg"}>
          <div className="credit">
            {(!startFeature || featureNumber !== 10) && <DisplayResults />}
            <h2>
              {startFeature &&
                freeGames === 10 &&
                "WoW ! You just won free feature !"}
            </h2>
            {startFeature && (
              <h3>{freeGames} free games remains - every wins is x10</h3>
            )}
          </div>

          <div className="App">
            <div className="coins__container">
              <RenderRows />
            </div>
          </div>
          <div className="button-wrapper">
            <div className="credit">Balance : $ {credit}</div>
            <button
              onClick={e => {
                getRows();
                setCredit(credit - 50);
              }}
              value="trigger me"
              className="button-spin"
              disabled={credit > 0 ? false : true}
            >
              SPIN
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;

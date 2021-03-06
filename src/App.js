import React, { Fragment, useState, useEffect } from "react";
import { getSymbols } from "./Symbols/symbols";
import calculateSymbols from "./Symbols/calculateSymbols";
import renderIcons from "./renderIcons";
import "./reset.css";
import "./styles/App.css";
let counter = 0;
const App = () => {
  const [rows, setRows] = useState([]);
  const [credit, setCredit] = useState(1000);
  const [feature, setFeature] = useState(false);
  const [startFeature, setStartFeature] = useState(false);
  const [featureNumber, setFeatureNumber] = useState(0);
  const [winCredit, setWinCredit] = useState(0);
  const [winSymbols, setWinSymbols] = useState([]);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      getRows();
      if (counter < 9) {
        return;
      }
    }, 80);
    return () => {
      clearTimeout(timer);
      setFeature(false);
    };
  }, [rows]);

  useEffect(() => {
    getRows();
  }, []);

  useEffect(() => {
    if (complete) {
      const lists = rows.reduce((prev, next) => prev.concat(next), []);
      const results = lists.reduce(
        (acc, value) => ({
          ...acc,
          [value]: (acc[value] || 0) + 1
        }),
        {}
      );

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
    }
  }, [complete]);

  useEffect(() => {
    if (feature) {
      setStartFeature(true);
    }
  }, [feature]);

  function getRows() {
    counter += 1;
    if (counter === 10) {
      counter = 1;
      setComplete(true);
      return;
    }
    setRows([]);
    setComplete(false);
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

  function calculateCredits() {
    if (startFeature) return;
    setCredit(credit - 50);
  }

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
                calculateCredits();
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

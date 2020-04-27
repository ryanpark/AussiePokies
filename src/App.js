import React, { Fragment, useState, useEffect } from "react";
import { getSymbols } from "./Symbols/symbols";
import calculateSymbols from "./Symbols/calculateSymbols";
import { css, jsx } from "@emotion/core";
import CountUp from "react-countup";
import "./reset.css";
import "./App.css";

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
          {row.map(list => {
            const matched = winSymbols.includes(list);

            return (
              <li className={!matched ? "coins__list" : "coins__list-matched"}>
                {list}
              </li>
            );
          })}
        </ul>
      );
    });
  };

  const DisplayResults = () => {
    const wonSymbols = winSymbols.toString();
    return `dsiplay results ${winCredit} ${wonSymbols}`;
  };
  return (
    <Fragment>
      <h1>{startFeature ? "feature time baby" : ""}</h1>
      <div className={!startFeature ? "container" : "container--feature"}>
        <DisplayResults />
        <h1 className="credit">{credit}</h1>

        <CountUp start={1000} end={credit} duration={5} />
        <div className="App">
          <div className="coins__container">
            <RenderRows />
          </div>
        </div>
        <button
          onClick={e => {
            getRows();
            setCredit(credit - 50);
          }}
          value="trigger me"
          className="button"
          disabled={credit > 0 ? false : true}
        >
          Trigger
        </button>
      </div>
    </Fragment>
  );
};

export default App;

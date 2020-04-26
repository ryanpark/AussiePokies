import React, { Fragment, useState, useEffect } from "react";
import { getSymbols } from "./Symbols/symbols";
import calculateSymbols from "./Symbols/calculateSymbols";
import { css, jsx } from "@emotion/core";
import "./reset.css";
import "./App.css";

const App = () => {
  const [rows, setRows] = useState([]);
  const [credit, setCredit] = useState(1000);
  const [feature, setFeature] = useState(false);

  useEffect(() => {
    const lists = rows.reduce((prev, next) => prev.concat(next), []);
    const results = lists.reduce(
      (acc, value) => ({
        ...acc,
        [value]: (acc[value] || 0) + 1
      }),
      {}
    );

    const isFeature = lists.filter(item => item === "Coin").length > 6;
    const updatedCredit = calculateSymbols(results);
    console.log(updatedCredit);
    //setCredit(credit + updatedCredit);
    if (isFeature) {
      setFeature(true);
    }

    return () => {
      setFeature(false);
    };
  }, [rows]);

  useEffect(() => {
    setCredit(credit + 100);
  }, [feature]);

  function getRows() {
    setRows([]);

    return Array(5)
      .fill([])
      .map((e, i) => {
        setRows(rows => [...rows, getSymbols().splice(3, 3)]);
      });
  }

  const renderRows = () => {
    return rows.map(row => {
      return (
        <ul className="coins">
          {row.map(list => {
            return <li className="coins__list">{list}</li>;
          })}
        </ul>
      );
    });
  };

  return (
    <Fragment>
      <div className={!feature ? "container" : "container--feature"}>
        <h1 className="credit">{credit}</h1>
        <div className="App">
          <div className="coins__container">{renderRows()}</div>
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

const primary = ["guns", "diamond", "rose"];
const secondary = ["buddha", "heart", "bird"];
const tertiary = ["9", "10", "J", "Q", "K"];

const calculateSymbols = (symbols, startFeature) => {
  let credits = [];
  let isFeature = false;
  let winSymbols = [];

  for (const [key, value] of Object.entries(symbols)) {
    if (key !== "Coin") {
      if (primary.includes(key) && value >= 3) {
        credits.push(100);
        winSymbols.push(key);
      } else if (secondary.includes(key) && value >= 3) {
        credits.push(50);
        winSymbols.push(key);
      } else if (tertiary.includes(key) && value >= 4) {
        credits.push(25);
        winSymbols.push(key);
      }
    } else if (key === "Coin" && value >= 8) {
      isFeature = true;
    }
  }

  const totalCredits = credits.reduce((a, b) => {
    if (startFeature) {
      return (a + b) * 10;
    }
    return a + b;
  }, 0);

  return {
    totalCredits: totalCredits,
    isFeature: isFeature,
    winSymbols: winSymbols
  };
};

export default calculateSymbols;

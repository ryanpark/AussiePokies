const primary = ["guns", "diamond", "rose"];
const secondary = ["buddha", "heart", "bird"];
const tertiary = ["9", "10", "J", "Q", "K"];

const calculateSymbols = symbols => {
  let winSymols = [];
  let feature = false;
  for (const [key, value] of Object.entries(symbols)) {
    if (key !== "Coin") {
      if (primary.includes(key) && value >= 5) {
        console.log("primary");
        return 100;
      } else if (secondary.includes(key) && value >= 5) {
        console.log("secondary");
        return 50;
      } else if (tertiary.includes(key) && value >= 4) {
        console.log("tertiary");
        return 25;
      }
    }
  }
};

export default calculateSymbols;

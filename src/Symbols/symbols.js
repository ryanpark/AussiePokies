const primary = ["Clover", "diamond", "rose", "crown", "heart", "bird"];
const secondary = ["Dice", "Bee", "Key", "Tiger", "Solid"];
const coins = ["Coin", "Coin", "Coin"];

// Fisher-Yates algorithm
const shuffleArray = array => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export const getSymbols = () => {
  const shPrimary = shuffleArray(primary);
  const shSecodary = shuffleArray(secondary);
  let shSymbols = shuffleArray([...shPrimary, ...shSecodary]);
  const randomNum = Math.floor(Math.random() * shSymbols.length) + 1;
  shSymbols.splice(randomNum, 0, ...coins);

  return shSymbols;
};

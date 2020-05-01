import React from "react";
import {
  IconCrown,
  IconCoin,
  IconRose,
  IconDiamond,
  IconBird,
  IconHeart,
  IconTiger,
  IconDice,
  IconBee,
  IconKey,
  IconClover,
  IconSolid
} from "../src/img/IconIndex";

const renderIcons = symbol => {
  const iconCapitalized = symbol.charAt(0).toUpperCase() + symbol.slice(1);
  switch (iconCapitalized) {
    case "Crown":
      return <IconCrown />;
    case "Rose":
      return <IconRose />;
    case "Coin":
      return <IconCoin />;
    case "Diamond":
      return <IconDiamond />;
    case "Bird":
      return <IconBird />;
    case "Heart":
      return <IconHeart />;
    case "Queen":
      return <IconTiger />;
    case "Nine":
      return <IconDice />;
    case "Ten":
      return <IconBee />;
    case "Jack":
      return <IconKey />;
    case "Guns":
      return <IconClover />;
    case "King":
      return <IconSolid />;
    default:
      console.log("Sorry, we are out of " + iconCapitalized + ".");
  }
};

export default renderIcons;

import { useEffect, useState } from "react";

import { formatPrice } from "../../utils";

import type React from "react";
type PriceProps = {
  price: number;
};

const PriceChange: React.FC<PriceProps> = ({ price }) => {
  const [previousPrice, setPreviousPrice] = useState<number>(price);
  const [color, setColor] = useState<string>("black");

  useEffect(() => {
    if (price < previousPrice) {
      setColor("red");
    } else if (price > previousPrice) {
      setColor("green");
    }

    const timeout = setTimeout(() => {
      setColor("black");
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [price, previousPrice]);

  useEffect(() => {
    setPreviousPrice(price);
  }, [price]);

  const getPriceColor = () => {
    if (color === "black") {
      return "text-black";
    } else {
      return `text-${color}-500`;
    }
  };

  return (
    <h3 className={`text-base ${getPriceColor()}`}>{`Rp. ${formatPrice(
      price
    )}`}</h3>
  );
};

export { PriceChange };

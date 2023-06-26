import Image from "next/image";

import { PriceChange } from "./PriceChange";
import { Stat } from "../../uikits";
import { isPositiveNumber } from "../../utils";

import type React from "react";
import type { TokenDetailByDate as TokenDetailByDateProps } from "../models";

const TokenDetailByDate: React.FC<TokenDetailByDateProps> = ({
  name,
  currencySymbol,
  logo,
  latestPrice,
  percentage,
}) => {
  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center justify-center gap-6">
          <Image src={logo} alt={currencySymbol} width={24} height={24} />
          <div className="flex flex-col">
            <h3 className="text-base text-black ">{name}</h3>
            <h3 className="text-base text-gray-300 ">{currencySymbol}</h3>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <PriceChange price={Number(latestPrice)} />
          <Stat
            type={isPositiveNumber(percentage) ? "success" : "danger"}
            label={percentage}
          />
        </div>
      </div>
      <div className="divider my-0 before:bg-gray-200 after:bg-gray-200" />
    </>
  );
};

export { TokenDetailByDate };

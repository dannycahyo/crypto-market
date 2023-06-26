import Image from "next/image";

import { Stat } from "../../uikits/components";
import { isPositiveNumber } from "../../utils";

import type React from "react";
import type { TokenDetailByDate } from "../models";

const TokenCard: React.FC<TokenDetailByDate> = ({
  name,
  latestPrice,
  logo,
  percentage,
}) => {
  return (
    <div className="flex flex-col p-4 hover:bg-gray-200">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Image
            src={logo}
            alt={name}
            width={28}
            height={28}
            className="mr-2"
          />
        </div>
        <h3 className="truncate text-lg font-medium text-gray-800">{name}</h3>
      </div>
      <div className="mt-2">
        <p className="mb-1 mr-2 text-sm text-gray-400">{`Rp. ${latestPrice}`}</p>
        <Stat
          type={isPositiveNumber(percentage) ? "success" : "danger"}
          label={percentage}
          size="large"
        />
      </div>
    </div>
  );
};

export { TokenCard };

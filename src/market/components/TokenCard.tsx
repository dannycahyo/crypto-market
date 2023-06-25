import Image from "next/image";
import { Stat } from "../../uikits/components";

import type React from "react";

type TokenCardProps = {
  title: string;
  price: number;
  imageURL: string;
  dayPercentage: number;
};

const TokenCard: React.FC<TokenCardProps> = ({
  title,
  price,
  imageURL,
  dayPercentage,
}) => {
  return (
    <div className="flex flex-col p-4 hover:bg-gray-200">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Image
            src={imageURL}
            alt={title}
            width={28}
            height={28}
            className="mr-2"
          />
        </div>
        <h3 className="truncate text-lg font-medium text-gray-800">{title}</h3>
      </div>
      <div className="mt-2">
        <p className="mb-1 mr-2 text-sm text-gray-400">{`Rp. ${price}`}</p>
        <Stat type="success" label={`${dayPercentage}`} />
      </div>
    </div>
  );
};

export { TokenCard };

import Image from "next/image";

import type { Currency } from "../models";
import type React from "react";

type CurrencyListProps = {
  currencies?: Currency[];
};

const CurrencyList: React.FC<CurrencyListProps> = ({ currencies }) => {
  return (
    <>
      {currencies?.length === 0 ? (
        <h1 className="text-base">Tidak ada hasil yang ditemukan</h1>
      ) : (
        <>
          {currencies?.map((currency) => (
            <li key={currency.currencySymbol}>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Image
                    alt={currency.name}
                    width={16}
                    height={16}
                    src={currency.logo}
                  />
                  <h4 className="text-base text-black">{currency.name}</h4>
                </div>
                <p className="text-base text-gray-300">
                  {currency.currencySymbol}
                </p>
              </div>
            </li>
          ))}
        </>
      )}
    </>
  );
};

export { CurrencyList };

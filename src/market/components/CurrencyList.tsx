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
            // Notes* Somehow the role of the list item doesn't get assign to the li.
            // So we need to assign it manually for the accessibillity and testing purposes.
            // eslint-disable-next-line jsx-a11y/no-redundant-roles
            <li
              key={currency.currencySymbol}
              role="listitem"
              aria-label={currency.name}
            >
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

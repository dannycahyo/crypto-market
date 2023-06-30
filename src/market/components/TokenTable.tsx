import Image from "next/image";
import { PriceChange } from "./PriceChange";

import { Stat } from "../../uikits";
import { isPositiveNumber } from "../../utils";

import { TokenTableColumn } from "./TokenTableColumn";
import { TokenData } from "../models";

import type React from "react";
type TokenTableProps = {
  data?: TokenData[];
  onFilterBy: (category: string) => void;
  onSortBy: (sort?: "asc" | "desc") => void;
};

const TokenTable: React.FC<TokenTableProps> = ({
  data,
  onFilterBy,
  onSortBy,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>
              <h3 className="text-base font-semibold text-gray-400">CRYPTO</h3>
            </th>
            <th className="hidden xl:block" />
            <th>
              <TokenTableColumn
                title="Harga"
                onUpButtonClick={() => {
                  onFilterBy("latestPrice");
                  onSortBy("desc");
                }}
                onDownButtonClick={() => {
                  onFilterBy("latestPrice");
                  onSortBy("asc");
                }}
              />
            </th>
            <th>
              <TokenTableColumn
                title="24 JAM"
                onUpButtonClick={() => {
                  onFilterBy("day");
                  onSortBy("desc");
                }}
                onDownButtonClick={() => {
                  onFilterBy("day");
                  onSortBy("asc");
                }}
              />
            </th>
            <th>
              <TokenTableColumn
                title="1 MGG"
                onUpButtonClick={() => {
                  onFilterBy("week");
                  onSortBy("desc");
                }}
                onDownButtonClick={() => {
                  onFilterBy("week");
                  onSortBy("asc");
                }}
              />
            </th>
            <th>
              <TokenTableColumn
                title="1 BLN"
                onUpButtonClick={() => {
                  onFilterBy("month");
                  onSortBy("desc");
                }}
                onDownButtonClick={() => {
                  onFilterBy("month");
                  onSortBy("asc");
                }}
              />
            </th>
            <th>
              <TokenTableColumn
                title="1 THN"
                onUpButtonClick={() => {
                  onFilterBy("year");
                  onSortBy("desc");
                }}
                onDownButtonClick={() => {
                  onFilterBy("year");
                  onSortBy("asc");
                }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((token) => (
            <tr key={token?.currencySymbol}>
              <td>
                <div className="flex items-center gap-3">
                  <Image
                    src={token?.logo}
                    alt={token?.currencySymbol}
                    width={24}
                    height={24}
                  />
                  <h3 className="text-base text-black ">{token?.name}</h3>
                </div>
              </td>
              <td className="hidden xl:block">
                <h3 className="text-base text-gray-300 ">
                  {token?.currencySymbol}
                </h3>
              </td>
              <td>
                <PriceChange price={Number(token?.latestPrice)} />
              </td>
              <td className="px-1">
                <Stat
                  type={isPositiveNumber(token?.day) ? "success" : "danger"}
                  label={token?.day.replace("-", "")}
                />
              </td>
              <td className="px-1">
                <Stat
                  type={isPositiveNumber(token?.week) ? "success" : "danger"}
                  label={token?.week.replace("-", "")}
                />
              </td>
              <td className="px-1">
                <Stat
                  type={isPositiveNumber(token?.month) ? "success" : "danger"}
                  label={token?.month.replace("-", "")}
                />
              </td>
              <td className="px-1">
                <Stat
                  type={isPositiveNumber(token?.year) ? "success" : "danger"}
                  label={token?.year.replace("-", "").replace("-", "")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { TokenTable };

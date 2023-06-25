import { Stat } from "../../uikits";
import { isPositiveNumber } from "../../utils";

import { TokenTableColumn } from "./TokenTableColumn";

import { TokenData } from "../models";

import type React from "react";
import Image from "next/image";
import { PriceChange } from "./PriceChange";
type TokenTableProps = {
  data: TokenData[];
  onFilterBy: (key: string) => void;
  onSortBy: (key: string) => void;
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
            <th />
            <th>
              <TokenTableColumn
                title="Harga"
                onUpButtonClick={() => {
                  onFilterBy("price");
                  onSortBy("asc");
                }}
                onDownButtonClick={() => {
                  onFilterBy("price");
                  onSortBy("desc");
                }}
              />
            </th>
            <th>
              <TokenTableColumn
                title="24 JAM"
                onUpButtonClick={() => {
                  onFilterBy("day");
                  onSortBy("asc");
                }}
                onDownButtonClick={() => {
                  onFilterBy("day");
                  onSortBy("desc");
                }}
              />
            </th>
            <th>
              <TokenTableColumn
                title="1 MGG"
                onUpButtonClick={() => {
                  onFilterBy("week");
                  onSortBy("asc");
                }}
                onDownButtonClick={() => {
                  onFilterBy("week");
                  onSortBy("desc");
                }}
              />
            </th>
            <th>
              <TokenTableColumn
                title="1 BLN"
                onUpButtonClick={() => {
                  onFilterBy("month");
                  onSortBy("asc");
                }}
                onDownButtonClick={() => {
                  onFilterBy("month");
                  onSortBy("desc");
                }}
              />
            </th>
            <th>
              <TokenTableColumn
                title="1 THN"
                onUpButtonClick={() => {
                  onFilterBy("year");
                  onSortBy("asc");
                }}
                onDownButtonClick={() => {
                  onFilterBy("year");
                  onSortBy("desc");
                }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((token) => (
            <tr key={token.currencySymbol}>
              <td>
                <div className="flex items-center gap-3">
                  <Image
                    src={token.logo}
                    alt={token.currencySymbol}
                    width={24}
                    height={24}
                  />
                  <h3 className="text-base text-black ">{token.name}</h3>
                </div>
              </td>
              <td>
                <h3 className="text-base text-gray-300 ">
                  {token.currencySymbol}
                </h3>
              </td>
              <td>
                <PriceChange price={Number(token.latestPrice)} />
              </td>
              <td>
                <Stat
                  type={isPositiveNumber(token.day) ? "success" : "danger"}
                  label={token.day}
                />
              </td>
              <td>
                <Stat
                  type={isPositiveNumber(token.week) ? "success" : "danger"}
                  label={token.week}
                />
              </td>
              <td>
                <Stat
                  type={isPositiveNumber(token.month) ? "success" : "danger"}
                  label={token.month}
                />
              </td>
              <td>
                <Stat
                  type={isPositiveNumber(token.year) ? "success" : "danger"}
                  label={token.year}
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

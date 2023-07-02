import Image from "next/image";
import { useState } from "react";

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
  onResetSortByCategory: () => void;
};

type ActiveColumn = {
  name: string;
  order?: "asc" | "desc";
};

const TokenTable: React.FC<TokenTableProps> = ({
  data,
  onFilterBy,
  onSortBy,
  onResetSortByCategory,
}) => {
  const [activeColumn, setActiveColumn] = useState<ActiveColumn>();

  const handleColumnClick = (column: string) => {
    if (column === activeColumn?.name) {
      const newOrder = activeColumn.order === "asc" ? "desc" : "asc";
      setActiveColumn((prevColumn) => ({ ...prevColumn, order: newOrder }));
    } else {
      setActiveColumn((prevColumn) => ({ ...prevColumn, name: column }));
      onFilterBy(column);
    }
  };

  const handleUpButtonClick = (
    isActiveColumn: boolean,
    sort: "asc" | "desc"
  ) => {
    if (isActiveColumn && activeColumn?.order === sort) {
      onResetSortByCategory();
      setActiveColumn(undefined);
    } else {
      setActiveColumn((prevColumn) => ({
        ...prevColumn,
        order: sort,
      }));
      onSortBy(sort);
    }
  };

  const handleDownButtonClick = (
    isActiveColumn: boolean,
    sort: "asc" | "desc"
  ) => {
    if (isActiveColumn && activeColumn?.order === sort) {
      onResetSortByCategory();
      setActiveColumn(undefined);
    } else {
      setActiveColumn((prevColumn) => ({
        ...prevColumn,
        order: sort,
      }));
      onSortBy(sort);
    }
  };

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
                isActiveColumn={activeColumn?.name === "latestPrice"}
                sortingOrder={activeColumn?.order}
                onColumnClick={() => handleColumnClick("latestPrice")}
                onUpButtonClick={(isActive) =>
                  handleUpButtonClick(isActive, "desc")
                }
                onDownButtonClick={(isActive) =>
                  handleDownButtonClick(isActive, "asc")
                }
              />
            </th>
            <th>
              <TokenTableColumn
                title="24 JAM"
                isActiveColumn={activeColumn?.name === "day"}
                sortingOrder={activeColumn?.order}
                onColumnClick={() => handleColumnClick("day")}
                onUpButtonClick={(isActive) =>
                  handleUpButtonClick(isActive, "desc")
                }
                onDownButtonClick={(isActive) =>
                  handleDownButtonClick(isActive, "asc")
                }
              />
            </th>
            <th>
              <TokenTableColumn
                title="1 MGG"
                isActiveColumn={activeColumn?.name === "week"}
                sortingOrder={activeColumn?.order}
                onColumnClick={() => handleColumnClick("week")}
                onUpButtonClick={(isActive) =>
                  handleUpButtonClick(isActive, "desc")
                }
                onDownButtonClick={(isActive) =>
                  handleDownButtonClick(isActive, "asc")
                }
              />
            </th>
            <th>
              <TokenTableColumn
                title="1 BLN"
                isActiveColumn={activeColumn?.name === "month"}
                sortingOrder={activeColumn?.order}
                onColumnClick={() => handleColumnClick("month")}
                onUpButtonClick={(isActive) =>
                  handleUpButtonClick(isActive, "desc")
                }
                onDownButtonClick={(isActive) =>
                  handleDownButtonClick(isActive, "asc")
                }
              />
            </th>
            <th>
              <TokenTableColumn
                title="1 THN"
                isActiveColumn={activeColumn?.name === "year"}
                sortingOrder={activeColumn?.order}
                onColumnClick={() => handleColumnClick("year")}
                onUpButtonClick={(isActive) =>
                  handleUpButtonClick(isActive, "desc")
                }
                onDownButtonClick={(isActive) =>
                  handleDownButtonClick(isActive, "asc")
                }
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

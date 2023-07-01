import { FaChevronUp, FaChevronDown } from "react-icons/fa";

import type React from "react";

type TokenTableColumnProps = {
  title: string;
  isActiveColumn: boolean;
  sortingOrder?: "asc" | "desc";
  onColumnClick: () => void;
  onUpButtonClick: (isClicked: boolean) => void;
  onDownButtonClick: (isClicked: boolean) => void;
};

const TokenTableColumn: React.FC<TokenTableColumnProps> = ({
  title,
  isActiveColumn,
  sortingOrder,
  onColumnClick,
  onUpButtonClick,
  onDownButtonClick,
}) => {
  const handleUpButtonClick = () => {
    onColumnClick();
    onUpButtonClick(isActiveColumn);
  };

  const handleDownButtonClick = () => {
    onColumnClick();
    onDownButtonClick(isActiveColumn);
  };

  return (
    <div className="flex items-center gap-1">
      <h3 className="text-base font-semibold text-gray-400">{title}</h3>
      <div className="flex flex-col items-center gap-0 rounded-full p-2">
        <button onClick={handleUpButtonClick} title={`descOrder ${title}`}>
          <FaChevronUp
            size={12}
            className={
              isActiveColumn && sortingOrder === "desc"
                ? "text-black"
                : "text-gray-200"
            }
          />
        </button>
        <button onClick={handleDownButtonClick} title={`ascOrder ${title}`}>
          <FaChevronDown
            size={12}
            className={
              isActiveColumn && sortingOrder === "asc"
                ? "text-black"
                : "text-gray-200"
            }
          />
        </button>
      </div>
    </div>
  );
};

export { TokenTableColumn };

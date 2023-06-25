import { FaChevronUp, FaChevronDown } from "react-icons/fa";

import type React from "react";

type TokenTableColumnProps = {
  title: string;
  onUpButtonClick: () => void;
  onDownButtonClick: () => void;
};

const TokenTableColumn: React.FC<TokenTableColumnProps> = ({
  title,
  onUpButtonClick,
  onDownButtonClick,
}) => {
  return (
    <div className="flex items-center gap-1">
      <h3 className="text-base font-semibold text-gray-400">{title}</h3>
      <div className="flex flex-col items-center gap-0 rounded-full p-2">
        <button onClick={onUpButtonClick}>
          <FaChevronUp size={12} />
        </button>
        <button onClick={onDownButtonClick}>
          <FaChevronDown size={12} />
        </button>
      </div>
    </div>
  );
};

export { TokenTableColumn };

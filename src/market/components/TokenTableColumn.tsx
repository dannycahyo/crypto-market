import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

import type React from "react";

type TokenTableColumnProps = {
  title: string;
  onUpButtonClick: (isClicked: boolean) => void;
  onDownButtonClick: (isClicked: boolean) => void;
};

const TokenTableColumn: React.FC<TokenTableColumnProps> = ({
  title,
  onUpButtonClick,
  onDownButtonClick,
}) => {
  const [isUpButtonClicked, setIsUpButtonClicked] = useState<boolean>(false);
  const [isDownButtonClicked, setIsDownButtonClicked] =
    useState<boolean>(false);

  const handleUpButtonClick = () => {
    setIsUpButtonClicked((prev) => !prev);
    setIsDownButtonClicked(false);
    onUpButtonClick(isUpButtonClicked);
  };

  const handleDownButtonClick = () => {
    setIsDownButtonClicked((prev) => !prev);
    setIsUpButtonClicked(false);
    onDownButtonClick(isDownButtonClicked);
  };

  return (
    <div className="flex items-center gap-1">
      <h3 className="text-base font-semibold text-gray-400">{title}</h3>
      <div className="flex flex-col items-center gap-0 rounded-full p-2">
        <button onClick={handleUpButtonClick} title={`descOrder ${title}`}>
          <FaChevronUp
            size={12}
            className={`${isUpButtonClicked ? "text-black" : "text-gray-200"}`}
          />
        </button>
        <button onClick={handleDownButtonClick} title={`ascOrder ${title}`}>
          <FaChevronDown
            size={12}
            className={`${
              isDownButtonClicked ? "text-black" : "text-gray-200"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export { TokenTableColumn };

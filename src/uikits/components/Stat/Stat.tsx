import { FaCaretUp, FaCaretDown } from "react-icons/fa";

import type React from "react";

type StatProps = {
  type: "success" | "danger";
  label: string;
  size?: "small" | "medium" | "large";
};

const Stat: React.FC<StatProps> = ({ type, label, size = "medium" }) => {
  const renderIcon = () =>
    type === "success" ? (
      <FaCaretUp color="#22C55E" size={20} />
    ) : (
      <FaCaretDown color="red" size={20} />
    );
  const getLabelColor = () =>
    type === "success" ? "text-green-500" : "text-red-500";

  const getLabelSize = () => {
    switch (size) {
      case "small":
        return "text-sm";
      case "medium":
        return "text-base";
      case "large":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  return (
    <div className="flex items-center">
      {renderIcon()}
      <h2 className={`ml-1 font-bold ${getLabelSize()} ${getLabelColor()}`}>
        {`${label} %`}
      </h2>
    </div>
  );
};

export { Stat };

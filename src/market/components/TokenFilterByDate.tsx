import type React from "react";

type TokenFilterByDateProps = {
  onFilterToken: (date: string) => void;
};

const TokenFilterByDate: React.FC<TokenFilterByDateProps> = ({
  onFilterToken,
}) => {
  return (
    <>
      <div className="divider my-0 before:bg-gray-200 after:bg-gray-200" />
      <div className="flex items-center justify-between py-2">
        <h4 className="text-sm font-semibold text-black">CRYPTO</h4>
        <select
          className="select-bordered select select-sm max-w-xs bg-white"
          onChange={(e) => onFilterToken(e.target.value)}
          title="tokenFilterByDate"
        >
          <option value="day">24 JAM</option>
          <option value="week">1 MGG</option>
          <option value="month">1 BLN</option>
          <option value="year">1 THN</option>
        </select>
      </div>
      <div className="divider my-0 before:bg-gray-200 after:bg-gray-200" />
    </>
  );
};

export { TokenFilterByDate };

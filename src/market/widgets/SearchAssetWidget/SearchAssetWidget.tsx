/*  
Notes* We can ignore this linter since the functionality already handled by DaisyUI
The Dropdown component is work as expected.
*/
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { CurrencyList } from "src/market/components";

import { useGetSupportedCurrencies } from "src/market/services";
import { SearchInput } from "src/uikits";

const SearchAssetWidget = () => {
  const { data: supportedCurrencies } = useGetSupportedCurrencies();
  const [searchAsset, setSearchAsset] = useState<string>("");

  const handleAssetSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAsset(e.target.value);
  };

  const filteredSupportedCurrencies = supportedCurrencies?.filter((currency) =>
    currency.name.toLowerCase().includes(searchAsset.toLowerCase())
  );

  return (
    <div className="mb-6 mt-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-black sm:text-2xl">
        Harga Crypto dalam Rupiah Hari Ini
      </h1>
      <div className="dropdown">
        <label
          tabIndex={0}
          className="btn m-1 border-none bg-white p-0 hover:border-none hover:bg-white focus:border-none focus:bg-white sm:p-4"
        >
          <div className="hidden sm:block">
            <SearchInput
              value={searchAsset}
              onChange={handleAssetSearch}
              placeholder="Cari asset di Pintu..."
            />
          </div>
          <div className="block sm:hidden">
            {/* Notes* This window.my_modal_3 already targetting my_modal_3 and it works properly */}
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/*  @ts-ignore */}
            <button onClick={() => window.my_modal_3.showModal()}>
              <FaSearch className="h-5 w-5  text-gray-400" />
            </button>
            <dialog id="my_modal_3" className="modal w-full">
              <form
                method="dialog"
                className="modal-box h-full w-full bg-white"
              >
                <div className="flex items-center justify-between">
                  <SearchInput
                    value={searchAsset}
                    onChange={handleAssetSearch}
                    placeholder="Cari asset di Pintu..."
                  />
                  <button className="btn-sm btn-circle btn absolute right-2 top-2">
                    ✕
                  </button>
                </div>
                <div className="mt-4">
                  <CurrencyList currencies={filteredSupportedCurrencies} />
                </div>
              </form>
            </dialog>
          </div>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box z-[1] bg-white p-2 shadow hover:bg-white"
        >
          <div className="hidden h-64 w-64 overflow-y-auto whitespace-nowrap sm:block">
            <CurrencyList currencies={filteredSupportedCurrencies} />
          </div>
        </ul>
      </div>
    </div>
  );
};

export { SearchAssetWidget };

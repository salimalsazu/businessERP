import { Button, Whisper } from "rsuite";

const LedgerSection = () => {
  return (
    <div className="bg-gray-100 rounded-sm m-5 p-5">
      <div className="my-5 mx-2 flex flex-col-reverse gap-10">
        <div className="flex items-center gap-5">
          <div className="w-full">
            <label htmlFor="voice-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#919eab"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <input
                // onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                id="searchTerm"
                className="border border-gray-300 text-gray-900 placeholder:text-[#919EAB] w-full pl-10 py-2 rounded-lg focus:outline-none "
                placeholder="Search with Ledger Name"
                required
              />
            </div>
          </div>
        </div>

        {/* Add Ledger */}
        <div className="flex items-center justify-end gap-2">
          <div>
            <Button
              className="flex items-center gap-2 hover:text-white/80 px-4 py-2 rounded-[4px] !text-white !bg-primary !hover:bg-secondary"
              type="button"
              // onClick={handleOpen}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="#fff"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
              <span className="text-sm font-semibold">Add Ledger</span>
            </Button>
          </div>
          <div>
            <Button
              className="flex items-center gap-2 hover:text-white/80 px-4 py-2 rounded-[4px] !text-white !bg-primary !hover:bg-secondary"
              type="button"
              // onClick={handleOpen}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="#fff"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
              <span className="text-sm font-semibold">Add Transaction</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LedgerSection;

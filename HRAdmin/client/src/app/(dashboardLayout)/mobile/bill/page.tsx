import MobileBillList from "@/components/mobile/bill/MobileBillList";
import MobileChart from "@/components/mobile/bill/MobileChart";
import React from "react";

const MobileBillListPage = () => {
  return (
    <div className="p-5 w-full">
      {/* <div className="bg-white shadow-sm rounded-md p-2 m-2 w-full border">
        <MobileChart />
      </div> */}
      <div className="">
        <MobileBillList />
      </div>
    </div>
  );
};

export default MobileBillListPage;

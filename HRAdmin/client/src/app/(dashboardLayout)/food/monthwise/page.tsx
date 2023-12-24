import MonthWiseChart from "@/components/food/monthwise/MonthWiseChart";
import MonthWiseTable from "@/components/food/monthwise/MonthWiseTable";

const MealMonthWisePage = () => {
  return (
    <div className="p-5 w-full">
      <div className="bg-white shadow-sm rounded-md p-2 m-2 w-full border">
        <MonthWiseChart />
      </div>
      <div className="">
        <MonthWiseTable />
      </div>
    </div>
  );
};

export default MealMonthWisePage;

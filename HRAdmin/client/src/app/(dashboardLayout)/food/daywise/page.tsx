import DayWiseChart from "@/components/food/daywise/DayWiseChart";
import DayWiseTable from "@/components/food/daywise/DayWiseTable";

const MealDayWisePage = () => {
  return (
    <div className="p-5 w-full">
      <div className="bg-white shadow-sm rounded-md p-2 m-2 w-full border">
        <DayWiseChart />
      </div>
      <div className="">
        <DayWiseTable />
      </div>
    </div>
  );
};

export default MealDayWisePage;

import DailyTransactionCount from "@/components/dashboard/DailyTransactionCount";
import DashboardCount from "@/components/dashboard/DashboardCount";
// import LogsCount from "@/components/dashboard/LogsCount";

const DashboardHomePage = () => {
  return (
    <div>
      <div>
        <DashboardCount />
      </div>
      <div>
        <DailyTransactionCount />
      </div>
      <div>{/* <LogsCount/> */}</div>
    </div>
  );
};

export default DashboardHomePage;

import FuelChartSection from "@/components/transport/fuel/FuelChartSection";
import FuelPurchaseAndConsumptionSection from "@/components/transport/fuel/FuelPucrhaseAndConsumptionTable";

const FuelPurchasePage = () => {
  return (
    <div className="p-5 w-full">
      <div className="bg-white shadow-sm rounded-md p-2 m-2  border">
        <FuelChartSection />
      </div>
      <div className="">
        <FuelPurchaseAndConsumptionSection />
      </div>
    </div>
  );
};

export default FuelPurchasePage;

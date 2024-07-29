import FuelChartSection from "@/components/transport/fuel/FuelChartSection";
import FuelPurchaseAndConsumptionSection from "@/components/transport/fuel/FuelPucrhaseAndConsumptionTable";

const FuelPurchasePage = () => {
  return (
    <div className="p-5 w-full">
      <div className="">
        <FuelPurchaseAndConsumptionSection />
      </div>
    </div>
  );
};

export default FuelPurchasePage;

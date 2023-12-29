import ConveyanceListTable from "@/components/conveyance/list/ConveyanceListTable";
import VehicleDocumentsTableSection from "@/components/transport/documents/VehicleDocuments";

const ConveyancePage = () => {
  return (
    <div className="p-5 w-full">
      {/* <div className="bg-white shadow-sm rounded-md p-2 m-2  border">
      
      </div> */}
      <div className="">
        <ConveyanceListTable />
      </div>
    </div>
  );
};

export default ConveyancePage;

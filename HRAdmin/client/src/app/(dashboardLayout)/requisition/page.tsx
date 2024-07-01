import AddRequisitionForm from "@/components/Requisition/Form/RequisitionForm";
import RequisitionListTable from "@/components/Requisition/Table/RequisitionTable";

const RequisitionPage = () => {
  return (
    <div>
      <div className="bg-gray-100  rounded-sm m-5 p-5">
        <AddRequisitionForm />
      </div>
      <div className="bg-gray-100 rounded-sm m-5 p-5">
        <RequisitionListTable />
      </div>
    </div>
  );
};

export default RequisitionPage;

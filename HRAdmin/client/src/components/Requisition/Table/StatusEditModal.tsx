///Status Edit
import { useUpdateRequisitionMutation } from "@/redux/api/features/requisitionApi";
import { Button, Dropdown, Modal, Popover, SelectPicker } from "rsuite";

const statusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "Approved", value: "Approved" },
  { label: "Rejected", value: "Rejected" },
];

const StatusEditModal = ({ open, handleClose, rowData }: any) => {
  const [updateRequisitionStatus, { isLoading: statusUpdateLoading }] =
    useUpdateRequisitionMutation();

  const handleSelect = async (value: string) => {
    await updateRequisitionStatus({
      requisitionId: rowData.requisitionId,
      payload: { status: value },
    });
  };

  return (
    <Modal open={open} onClose={handleClose} backdrop={"static"}>
      <SelectPicker
        data={statusOptions}
        onSelect={handleSelect}
        searchable={false}
        style={{ width: "100%" }}
        defaultValue={rowData.status}
        placeholder="Select Status"
      />

      <Button onClick={handleClose} appearance="primary" className="mt-5">
        Cancel
      </Button>
    </Modal>
  );
};

export default StatusEditModal;

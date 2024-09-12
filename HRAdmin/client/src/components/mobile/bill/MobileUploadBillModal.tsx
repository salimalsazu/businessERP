import { useAddMobileBillMutation } from "@/redux/api/features/mobileBillApi";
import { Button, Loader, Modal } from "rsuite";
import { DataChange } from "./DateChange";

const MobileUploadBillModal = ({ open, onClose, data }: any) => {
  const [addMobileBill, { isLoading }] = useAddMobileBillMutation();

  const newObjData = DataChange(data);

  const handleAddMobileBill = async () => {
    try {
      await addMobileBill(newObjData);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <Modal.Title className="text-center">Upload Bill</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            {!isLoading ? (
              <h1 className="text-lg my-10 text-center font-light">
                <span className="font-bold">{data?.length} </span> records
                found. Do you want to upload?
              </h1>
            ) : (
              <div className="text-lg my-10 text-center font-light">
                <Loader size="md" title="uploading" />
              </div>
            )}
          </div>
          <Button
            onClick={handleAddMobileBill}
            appearance="primary"
            className="w-full"
          >
            Proceed
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MobileUploadBillModal;

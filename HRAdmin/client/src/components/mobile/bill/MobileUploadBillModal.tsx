import { Button, Modal } from "rsuite";

const MobileUploadBillModal = ({ open, onClose, data }: any) => {
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <Modal.Title className="text-center">Upload Bill</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <h1 className="text-lg my-10 text-center font-light">
              <span className="font-bold">{data?.length} </span> records found.
              Do you want to upload?
            </h1>
          </div>
          <Button appearance="primary" className="w-full">
            Proceed
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MobileUploadBillModal;

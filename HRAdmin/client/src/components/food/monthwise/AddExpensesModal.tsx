import { Button, Modal, Placeholder } from "rsuite";

const AddExpensesModal = ({ handleClose, open }:any) => {
  return (
    <Modal backdrop="static" keyboard={false} open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Modal Title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Placeholder.Paragraph />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} appearance="primary">
          Ok
        </Button>
        <Button onClick={handleClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddExpensesModal;

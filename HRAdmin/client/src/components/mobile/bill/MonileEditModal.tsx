import { Modal } from "rsuite";

const MobileEditModal = ({open,handleClose}:any) => {
    return <div>
      <Modal  open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>
  </div>;
};

export default MobileEditModal;

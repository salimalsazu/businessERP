import { ButtonToolbar, Dropdown, IconButton, Popover, Whisper } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";

const renderMenu = ({ onClose, left, top, className }: any, ref: any) => {
  const handleSelect = (eventKey: any) => {
    onClose();
    console.log(eventKey);
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        {/* <Dropdown.Menu title="New File">
          <Dropdown.Item eventKey={1}>New File</Dropdown.Item>
          <Dropdown.Item eventKey={2}>
            New File with Current Profile
          </Dropdown.Item>
        </Dropdown.Menu> */}
        <Dropdown.Item eventKey={3}>Mobile Bill</Dropdown.Item>
        <Dropdown.Item eventKey={4}>Expenses</Dropdown.Item>
        <Dropdown.Item eventKey={5}>Fuel Exp</Dropdown.Item>
        <Dropdown.Item eventKey={6}>Stationary</Dropdown.Item>
        <Dropdown.Item eventKey={7}>Asset</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
};

const AddRequest = () => {
  return (
    <div>
      <ButtonToolbar>
        <Whisper placement="auto" trigger="click" speaker={renderMenu}>
          <IconButton appearance="primary" icon={<PlusIcon />} circle />
        </Whisper>
      </ButtonToolbar>
    </div>
  );
};

export default AddRequest;

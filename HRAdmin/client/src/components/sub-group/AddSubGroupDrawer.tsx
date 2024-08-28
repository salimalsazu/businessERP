import React from "react";
import { Button, Drawer } from "rsuite";

const AddSubGroupDrawer = ({
  backdropDrawerSubGroup,
  openSubGroupDrawer,
  setOpenSubGroupDrawer,
}: any) => {
  return (
    <div>
      <Drawer
        backdrop={backdropDrawerSubGroup}
        open={openSubGroupDrawer}
        onClose={() => setOpenSubGroupDrawer(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Add Sub Group</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpenSubGroupDrawer(false)}>Cancel</Button>
            <Button
              onClick={() => setOpenSubGroupDrawer(false)}
              appearance="primary"
            >
              Confirm
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>{/* <Placeholder.Paragraph /> */}</Drawer.Body>
      </Drawer>
    </div>
  );
};

export default AddSubGroupDrawer;

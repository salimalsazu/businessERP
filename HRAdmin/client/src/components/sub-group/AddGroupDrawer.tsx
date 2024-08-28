"use client";

import React from "react";
import { Button, Drawer } from "rsuite";

const AddGroupDrawer = ({
  backdropDrawer,
  openGroupDrawer,
  setOpenGroupDrawer,
}: any) => {
  return (
    <div>
      <Drawer
        backdrop={backdropDrawer}
        open={openGroupDrawer}
        onClose={() => setOpenGroupDrawer(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Add Group</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpenGroupDrawer(false)}>Cancel</Button>
            <Button
              onClick={() => setOpenGroupDrawer(false)}
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

export default AddGroupDrawer;

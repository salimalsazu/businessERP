import { useState } from "react";
import { Button, Drawer, Placeholder, Tabs } from "rsuite";
import "./userTable.css";
import PersonalInfoSection from "./PersonalInfo";
import JobDetailsSection from "./JobDetailsSection";

const UserTableDrawer = ({ placement, setOpen, open }: any) => {
  const [activeKey, setActiveKey] = useState<string | undefined>("1");

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <Drawer
      backdrop="static"
      placement={placement}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Drawer.Header>
        <Drawer.Title>
          <div className="flex gap-2 items-center">
            <Button appearance="primary" onClick={() => handleTabChange("1")}>
              Personal info
            </Button>
            <Button appearance="primary" onClick={() => handleTabChange("2")}>
              Job Details
            </Button>
            <Button appearance="primary" onClick={() => handleTabChange("3")}>
              History
            </Button>
            <Button appearance="primary" onClick={() => handleTabChange("3")}>
              Others
            </Button>
          </div>
        </Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <div>
          <div>
            {activeKey === "1" && (
              <div>
                <PersonalInfoSection />
              </div>
            )}
            {activeKey === "2" && (
              <div>
                <JobDetailsSection />
              </div>
            )}
          </div>
        </div>
      </Drawer.Body>
    </Drawer>
  );
};

export default UserTableDrawer;

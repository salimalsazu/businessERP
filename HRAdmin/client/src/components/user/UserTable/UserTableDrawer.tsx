import { useState } from "react";
import { Button, Drawer, Placeholder, Tabs } from "rsuite";
import "./userTable.css";
import PersonalInfoSection from "./PersonalInfo";
import JobDetailsSection from "./JobDetailsSection";
import { btnData } from "./Btn.Constant";

const UserTableDrawer = ({ userDetails, placement, setOpen, open }: any) => {
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
            {btnData.map((btn) => (
              <Button
                key={btn.key}
                appearance="primary"
                onClick={() => handleTabChange(btn.key)}
                style={{
                  backgroundColor: activeKey === btn.key ? "#007bff" : "",
                  color: activeKey === btn.key ? "#fff" : "",
                }}
              >
                {btn.title}
              </Button>
            ))}
          </div>
        </Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <div>
          <div>
            {activeKey === "1" && (
              <div>
                <PersonalInfoSection userDetails={userDetails} />
              </div>
            )}
            {activeKey === "2" && (
              <div>
                <JobDetailsSection userDetails={userDetails} />
              </div>
            )}
          </div>
        </div>
      </Drawer.Body>
    </Drawer>
  );
};

export default UserTableDrawer;

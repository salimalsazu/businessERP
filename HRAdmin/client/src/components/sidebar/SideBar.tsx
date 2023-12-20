"use client";

import { Container, Sidebar, Sidenav, Navbar, Nav } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import AngleLeftIcon from "@rsuite/icons/legacy/AngleLeft";
import AngleRightIcon from "@rsuite/icons/legacy/AngleRight";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import { useState } from "react";

const NavToggle = ({ expand, onChange }: any) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Nav>
        <Nav.Menu
          noCaret
          placement="topStart"
          trigger="click"
          title={<CogIcon style={{ width: 20, height: 20 }} />}
        >
          <Nav.Item>Help</Nav.Item>
          <Nav.Item>Settings</Nav.Item>
          <Nav.Item>Sign out</Nav.Item>
        </Nav.Menu>
      </Nav>

      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: "center" }}>
          {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

const SideBar = () => {
  const [expand, setExpand] = useState(true);

  return (
    <div className="show-fake-browser sidebar-page">
      <Sidebar
        style={{ display: "flex", flexDirection: "column" }}
        width={expand ? 260 : 56}
        collapsible
      >
        <Sidenav expanded={expand} defaultOpenKeys={["3"]} appearance="subtle">
          <Sidenav.Body>
            <Nav>
              <Nav.Item eventKey="1" active icon={<DashboardIcon />}>
                Dashboard
              </Nav.Item>
              <Nav.Item eventKey="2" icon={<DashboardIcon />}>
                My Details
              </Nav.Item>

              <Nav.Menu
                eventKey="3"
                trigger="hover"
                title="Attendance"
                icon={<MagicIcon />}
                placement="rightStart"
              >
                <Nav.Item eventKey="3-1">Request for Leave</Nav.Item>
                <Nav.Item eventKey="3-2">Leave History</Nav.Item>
              </Nav.Menu>
              <Nav.Menu
                eventKey="4"
                trigger="hover"
                title="Mobile Bill"
                icon={<MagicIcon />}
                placement="rightStart"
              >
                <Nav.Item eventKey="3-1">Mobile bill Overview</Nav.Item>
                <Nav.Item eventKey="3-2">Request for balance update</Nav.Item>
              </Nav.Menu>
              <Nav.Menu
                eventKey="5"
                trigger="hover"
                title="Food"
                icon={<MagicIcon />}
                placement="rightStart"
              >
                <Nav.Item eventKey="3-1">Meal Details</Nav.Item>
                <Nav.Item eventKey="3-2">Add or List of Bazar</Nav.Item>
              </Nav.Menu>
              <Nav.Menu
                eventKey="6"
                trigger="hover"
                title="Transport"
                icon={<MagicIcon />}
                placement="rightStart"
              >
                <Nav.Item eventKey="3-1">Purchase List of Fuel</Nav.Item>
                <Nav.Item eventKey="3-2">List of Documents</Nav.Item>
                <Nav.Item eventKey="3-2">Add Vehicle</Nav.Item>
              </Nav.Menu>
              <Nav.Menu
                eventKey="7"
                trigger="hover"
                title="Printing & Stationary"
                icon={<MagicIcon />}
                placement="rightStart"
              >
                <Nav.Item eventKey="3-1">Item Wise Stock</Nav.Item>
                <Nav.Item eventKey="3-2">Request for Stationary</Nav.Item>
                <Nav.Item eventKey="3-2">Add Stationary</Nav.Item>
              </Nav.Menu>

              <Nav.Menu
                eventKey="8"
                trigger="hover"
                title="Conveyance"
                icon={<MagicIcon />}
                placement="rightStart"
              >
                <Nav.Item eventKey="3-1">Pending Conveyance</Nav.Item>
                <Nav.Item eventKey="3-2">Conveyance History</Nav.Item>
              </Nav.Menu>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
      </Sidebar>
    </div>
  );
};

export default SideBar;

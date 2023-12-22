"use client";

import { Sidebar, Sidenav, Navbar, Nav } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
import AngleLeftIcon from "@rsuite/icons/legacy/AngleLeft";
import AngleRightIcon from "@rsuite/icons/legacy/AngleRight";
import DashboardIcon from "@rsuite/icons/Dashboard";
import { useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { Icon } from "@rsuite/icons";
import { IoMan } from "react-icons/io5";
import { CiMobile1 } from "react-icons/ci";
import { FaCar } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { FaPrint } from "react-icons/fa";
import { SiBetfair } from "react-icons/si";
import Link from "next/link";

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

  const sidebarWidth = expand ? 260 : 56;

  return (
    <div
      style={{ width: `${sidebarWidth}px`, transition: "width 0.2s ease" }}
      className={`${
        expand
          ? "h-screen shadow-md sticky top-0 overflow-y-auto bg-secondary"
          : "sticky top-0 shadow-md z-[100]"
      }`}
    >
      <Sidebar
        style={{ display: "flex", flexDirection: "column" }}
        width={expand ? 260 : 56}
        collapsible
      >
        <Sidenav expanded={expand} defaultOpenKeys={["1"]} appearance="subtle">
          <Sidenav.Body>
            <Nav>
              <Nav.Item
                as={Link}
                href="/dashboard"
                eventKey="1"
                active
                icon={<DashboardIcon />}
              >
                Dashboard
              </Nav.Item>
              <Nav.Item eventKey="2" icon={<Icon as={CgDetailsMore} />}>
                My Details
              </Nav.Item>

              <Nav.Menu
                eventKey="3"
                trigger="hover"
                title="Attendance"
                icon={<Icon as={IoMan} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="3-1">Request for Leave</Nav.Item>
                <Nav.Item eventKey="3-2">Leave History</Nav.Item>
              </Nav.Menu>

              <Nav.Menu
                eventKey="4"
                trigger="hover"
                title="Mobile Bill"
                icon={<Icon as={CiMobile1} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="4-1">Mobile bill Overview</Nav.Item>
                <Nav.Item eventKey="4-2">Request for balance update</Nav.Item>
              </Nav.Menu>

              <Nav.Menu
                eventKey="5"
                trigger="hover"
                title="Food"
                icon={<Icon as={IoFastFood} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="5-1" as={Link} href="/food/monthwise">
                  {" "}
                  Employee Meal (Month Wise)
                </Nav.Item>
                <Nav.Item eventKey="5-2" as={Link} href="/food/daywise">
                  Meal Cost (Daily)
                </Nav.Item>
              </Nav.Menu>
              <Nav.Menu
                eventKey="6"
                trigger="hover"
                title="Transport"
                icon={<Icon as={FaCar} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="6-1">Purchase List of Fuel</Nav.Item>
                <Nav.Item eventKey="6-2">List of Documents</Nav.Item>
                <Nav.Item eventKey="6-3">Add Vehicle</Nav.Item>
              </Nav.Menu>
              <Nav.Menu
                eventKey="7"
                trigger="hover"
                title="Printing & Stationary"
                icon={<Icon as={FaPrint} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="7-1">Item Wise Stock</Nav.Item>
                <Nav.Item eventKey="7-2">Request for Stationary</Nav.Item>
                <Nav.Item eventKey="7-3">Add Stationary</Nav.Item>
              </Nav.Menu>

              <Nav.Menu
                eventKey="8"
                trigger="hover"
                title="Conveyance"
                icon={<Icon as={SiBetfair} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="8-1">Pending Conveyance</Nav.Item>
                <Nav.Item eventKey="8-2">Conveyance History</Nav.Item>
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

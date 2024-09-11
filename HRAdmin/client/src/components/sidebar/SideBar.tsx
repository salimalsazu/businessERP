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
import { FaComputer } from "react-icons/fa6";
import { FaPrint } from "react-icons/fa";
import { SiBetfair } from "react-icons/si";
import Link from "next/link";
import { getFromLocalStorage, storeSideBarMode } from "@/utils/local-storage";
import { sideBarModeKey } from "@/helpers/config/envConfig";

// const NavToggle = ({ expand, onChange }: any) => {
//   return (
//     <Navbar appearance="subtle" className="nav-toggle">
//       <Nav>
//         <Nav.Menu
//           noCaret
//           placement="topStart"
//           trigger="click"
//           title={<CogIcon style={{ width: 20, height: 20 }} />}
//         >
//           <Nav.Item>Settings</Nav.Item>
//           <Nav.Item>Sign out</Nav.Item>
//         </Nav.Menu>
//       </Nav>

//       <Nav pullRight>
//         <Nav.Item onClick={onChange} style={{ width: 56, textAlign: "center" }}>
//           {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
//         </Nav.Item>
//       </Nav>
//     </Navbar>
//   );
// };

const SideBar = () => {
  const [expand, setExpand] = useState<boolean>(
    !!getFromLocalStorage(sideBarModeKey())
      ? JSON.parse(getFromLocalStorage(sideBarModeKey()) as string)
      : true
  );

  const handleSidebarExpand = () => {
    setExpand(!expand);
    storeSideBarMode({ expanded: JSON.stringify(!expand) });
  };

  const sidebarWidth = expand ? 260 : 56;

  return (
    <div
      style={{ width: `${sidebarWidth}px`, transition: "width 0.2s ease" }}
      className={`${
        expand
          ? "h-screen shadow-md sticky top-0 overflow-y-auto !bg-sidebar"
          : "h-screen sticky top-0 shadow-md z-[100]"
      }`}
    >
      <Sidebar
        style={{ display: "flex", flexDirection: "column" }}
        width={expand ? 260 : 56}
        collapsible
      >
        <Sidenav expanded={expand} className="h-screen">
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
              <Nav.Item
                eventKey="2"
                icon={<Icon as={CgDetailsMore} />}
                as={Link}
                href="/details"
              >
                My Details
              </Nav.Item>

              <Nav.Item
                eventKey="3"
                icon={<Icon as={CgDetailsMore} />}
                as={Link}
                href="/requisition"
              >
                Requisition
              </Nav.Item>

              <Nav.Menu
                eventKey="4"
                trigger="hover"
                title="Accounts & Finance"
                icon={<Icon as={IoMan} />}
                placement="rightStart"
              >
                <Nav.Item as={Link} href="/ledger">
                  Ledger
                </Nav.Item>
                <Nav.Item as={Link} href="/sub-group">
                  Sub Group
                </Nav.Item>
                <Nav.Item as={Link} href="/trial-balance">
                  Trial balance
                </Nav.Item>
                <Nav.Item as={Link} href="/profit-loss">
                  Profit & Loss
                </Nav.Item>
                <Nav.Item as={Link} href="/balance-sheet">
                  Balance Sheet
                </Nav.Item>
              </Nav.Menu>

              <Nav.Menu
                eventKey="5"
                trigger="hover"
                title="Attendance"
                icon={<Icon as={IoMan} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="3-2" as={Link} href="/leave/history">
                  Leave History
                </Nav.Item>
                <Nav.Item eventKey="7-1" as={Link} href="/salary">
                  Salary
                </Nav.Item>
              </Nav.Menu>

              <Nav.Menu
                eventKey="6"
                trigger="hover"
                title="Mobile Bill"
                icon={<Icon as={CiMobile1} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="4-1" as={Link} href="/mobile/bill">
                  Mobile bill Overview
                </Nav.Item>
                {/* <Nav.Item eventKey="4-2" as={Link} href="/mobile/request">
                  Request for balance update
                </Nav.Item> */}
              </Nav.Menu>

              <Nav.Menu
                eventKey="7"
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
                eventKey="8"
                trigger="hover"
                title="Transport"
                icon={<Icon as={FaCar} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="6-1" as={Link} href="/transport/fuel">
                  Purchase Fuel and Consumption
                </Nav.Item>
                <Nav.Item eventKey="6-2" as={Link} href="/transport/documents">
                  Vehicle Documents List
                </Nav.Item>
              </Nav.Menu>

              <Nav.Menu
                eventKey="9"
                trigger="hover"
                title="Assets"
                icon={<Icon as={FaComputer} />}
                placement="rightStart"
              >
                <Nav.Item eventKey="8-1" as={Link} href="/assets/list">
                  Assets List
                </Nav.Item>
                <Nav.Item eventKey="8-2" as={Link} href="/assets/assign">
                  Repair and Assign
                </Nav.Item>
              </Nav.Menu>

              <Nav.Item
                eventKey="10"
                icon={<Icon as={CgDetailsMore} />}
                as={Link}
                href="/user"
              >
                User
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
          <Sidenav.Toggle
            className="sticky !bottom-0 z-20 bg-[#f7f7fa]"
            // expanded={expanded}
            onToggle={handleSidebarExpand}
          />
        </Sidenav>
      </Sidebar>
    </div>
  );
};

export default SideBar;

{
  /* <NavToggle
          className="sticky bottom-0 z-20 bg-[#f7f7fa]"
          onChange={handleSidebarExpand}
          expand={expand}
          // onChange={() => setExpand(!expand)}
        /> */
}

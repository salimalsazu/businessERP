"use client";

import SideBar from "@/components/sidebar/SideBar";
import { Container, Content } from "rsuite";

const dashboardLayout = ({ children }: any) => {
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <Container className="!bg-secondary">
        <Content>{children}</Content>
      </Container>
    </div>
  );
};

export default dashboardLayout;

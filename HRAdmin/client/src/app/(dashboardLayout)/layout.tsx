"use client";

import SideBar from "@/components/sidebar/SideBar";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { Container, Content } from "rsuite";

const dashboardLayout = ({ children }: any) => {
  return (
    <Provider store={store}>
      <div className="flex">
        <div>
          <SideBar />
        </div>
        <Container className="!bg-secondary" >
          <Content>{children}</Content>
        </Container>
      </div>
    </Provider>
  );
};

export default dashboardLayout;

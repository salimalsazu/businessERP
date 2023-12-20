
import SideBar from "@/components/sidebar/SideBar";
import { Container, Content } from "rsuite";

const dashboardLayout = ({ children }: any) => {
  return (
    <div className="flex">
      <Container>
        <SideBar />
      </Container>
      <Container>
        <Content>{children}</Content>
      </Container>
    </div>
  );
};

export default dashboardLayout;

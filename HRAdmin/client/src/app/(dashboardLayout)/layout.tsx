"use client";
import SideBar from "@/components/sidebar/SideBar";
import { isLoggedIn } from "@/hooks/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Container, Content } from "rsuite";

const DashboardLayout = ({ children }: any) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/");
    }
  }, [router, userLoggedIn]);

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

export default DashboardLayout;

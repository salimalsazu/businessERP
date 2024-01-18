"use client";
import AddRequest from "@/components/addRequest/addRequest";
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

      <Container className="!bg-secondary  ">
        <div className="top-[650px] flex justify-end items-end sticky w-[1300px] animate-pulse  z-50">
          <AddRequest />
        </div>
        <Content>{children}</Content>
      </Container>
    </div>
  );
};

export default DashboardLayout;

"use client";
// import AddRequest from "@/components/addRequest/addRequest";
import SideBar from "@/components/sidebar/SideBar";
import {
  getUserInfo,
  isLoggedIn,
  removeUserInfo,
} from "@/hooks/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, Container, Content } from "rsuite";

const DashboardLayout = ({ children }: any) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();

  const userExist: any = getUserInfo();

  const logOut = () => {
    removeUserInfo("auth");
    router.push("/");
  };

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
        <div className="bg-sidebar h-14 flex gap-3 justify-end items-center pr-5">
          <div className="bg-gray-200 rounded-sm p-1">
            <h1 className="font-bold text-sm text-blue-600">Version: 0.1.1</h1>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-gray-600 text-md font-bold">
              {userExist?.firstName} {userExist?.lastName}
            </p>
            <Button size="xs" appearance="ghost" onClick={logOut}>
              Logout
            </Button>
          </div>
          {/* <AddRequest /> */}
        </div>
        <Content>{children}</Content>
      </Container>
    </div>
  );
};

export default DashboardLayout;

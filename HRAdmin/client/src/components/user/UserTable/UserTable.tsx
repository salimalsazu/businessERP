"use client";

import Image from "next/image";
import profile from "../../../../public/image/profile.jpg";
import TimeRoundIcon from "@rsuite/icons/TimeRound";
import VisibleIcon from "@rsuite/icons/Visible";
import CalendarIcon from "@rsuite/icons/Calendar";
import SiteFillIcon from "@rsuite/icons/SiteFill";
import MobileIcon from "@rsuite/icons/Mobile";
import EmailFillIcon from "@rsuite/icons/EmailFill";
import EditIcon from "@rsuite/icons/Edit";
import DetailIcon from "@rsuite/icons/Detail";
import "./userTable.css";
import { useState } from "react";
import { useGetAllUsersQuery } from "@/redux/api/features/userApi";
import moment from "moment";
import UserTableDrawer from "./UserTableDrawer";
import UserEditModal from "./UserEditModal";
import { Loader } from "rsuite";

const UserTable = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);

  query["limit"] = size;
  query["page"] = page;

  const {
    data: allUsers,
    isLoading,
    error,
  } = useGetAllUsersQuery({ ...query });

  //Drawer section for user details

  const [userDetails, setUserDetails] = useState<any>({});
  const [open, setOpen] = useState<boolean | undefined>(false);
  const [placement, setPlacement] = useState<string | undefined>(undefined);

  //Modal section for user edit

  const [openModal, setOpenModal] = useState<boolean | undefined>(false);
  const [modalSize, setModalSize] = useState<string | undefined>("md" as any);

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center my-10">
        <div>
          <h1 className="text-xl font-light">
            Viewing 1-{size} of {allUsers?.data?.meta?.total}
          </h1>
        </div>

        <div className="flex gap-2 text-xl items-center justify-center ">
          <span className="font-light">show:</span>
          <span>
            <select
              onChange={(value) => {
                setSize(Number(value.target.value));
              }}
              className="flex justify-center items-center bg-none"
            >
              <option defaultChecked value="10">
                10
              </option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          {isLoading && (
            <Loader
              center
              size="lg"
              content="Loading..."
              backdrop
              vertical
              inverse
            />
          )}
        </div>
        {/* Card 1 */}

        {allUsers?.data?.data.map((user: any) => (
          <div
            key={user.userId}
            className="flex flex-col bg-white shadow-md  relative group"
          >
            <div className="flex justify-start items-start gap-4 p-8">
              <div>
                <Image
                  src={profile}
                  width={100}
                  height={100}
                  alt="Profile Image"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">
                    {user?.profile?.firstName} {user?.profile?.lastName}
                  </span>
                  <span className="flex gap-2 text-2xl ml-5">
                    <MobileIcon />
                    <EmailFillIcon />
                  </span>
                </div>
                <div>
                  <span className="text-lg font-semibold">
                    {user?.profile?.jobTitle}
                  </span>
                  <span className="text-yellow-800 font-bold text-xl">.</span>
                  <span className="text-lg font-extralight">
                    {user?.profile?.address}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-8 text-lg bg-stone-200 p-5">
              <div className="flex gap-3 items-center">
                <span>
                  <TimeRoundIcon />
                </span>
                <span>
                  {moment(user?.profile?.joiningDate).format("DD MMMM YYYY")}
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <span>
                  <VisibleIcon />
                </span>
                <span>
                  {moment(user?.profile?.dateOfBirth).format("DD MMMM YYYY")}
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <span>
                  <CalendarIcon />
                </span>
                <span>{user?.profile?.experience} Years exp</span>
              </div>
              <div className="flex gap-3 items-center">
                <span>
                  <SiteFillIcon />
                </span>
                <span>Salary: {user?.profile.salary}</span>
              </div>
            </div>
            <div className="flex gap-3 edit-icon absolute top-4 right-10 opacity-0 transition-opacity duration-300 hover:opacity-100 text-2xl text-blue-500 ">
              <DetailIcon
                onClick={() => {
                  setOpen(true);
                  setPlacement("right");
                  setUserDetails(user);
                }}
              />
              <EditIcon
                onClick={() => {
                  setModalSize("50rem");
                  setOpenModal(true);
                  setUserDetails(user);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <UserTableDrawer
          userDetails={userDetails}
          placement={placement}
          open={open}
          setOpen={setOpen}
        />
      </div>

      <div>
        <UserEditModal
          size={modalSize}
          open={openModal}
          handleClose={handleClose}
          userDetails={userDetails}
        />
      </div>
    </div>
  );
};

export default UserTable;

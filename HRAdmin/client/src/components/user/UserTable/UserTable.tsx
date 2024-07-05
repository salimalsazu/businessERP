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
import { SelectPicker } from "rsuite";
import { text } from "stream/consumers";

const UserTable = () => {
  return (
    <div>
      <div className="flex justify-between items-center my-10">
        <div>
          <h1 className="text-xl font-light">Viewing 1-10 of 50</h1>
        </div>

        <div className="flex gap-2 text-xl items-center justify-center ">
          <span className="font-light">show:</span>
          <span>
            <select className="flex justify-center items-center bg-none">
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
        {/* Card 1 */}

        <div className="flex flex-col bg-white shadow-md  relative group">
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
                <span className="text-2xl font-bold">Richard Alpert</span>
                <span className="flex gap-2 text-2xl ml-5">
                  <MobileIcon />
                  <EmailFillIcon />
                </span>
              </div>
              <div>
                <span className="text-lg font-semibold">
                  Senior Office Manager
                </span>
                <span className="text-yellow-800 font-bold text-xl">.</span>
                <span className="text-lg font-extralight">Uttara, Dhaka</span>
              </div>
            </div>
          </div>
          <div className="flex gap-8 text-lg bg-stone-200 p-5">
            <div className="flex gap-3 items-center">
              <span>
                <TimeRoundIcon />
              </span>
              <span>Today</span>
            </div>
            <div className="flex gap-3 items-center">
              <span>
                <VisibleIcon />
              </span>
              <span>Sept 19, 2016</span>
            </div>
            <div className="flex gap-3 items-center">
              <span>
                <CalendarIcon />
              </span>
              <span>5+ Years exp</span>
            </div>
            <div className="flex gap-3 items-center">
              <span>
                <SiteFillIcon />
              </span>
              <span>Salary: 20,000</span>
            </div>
          </div>
          <div className="flex gap-3 edit-icon absolute top-4 right-10 opacity-0 transition-opacity duration-300 hover:opacity-100 text-2xl text-blue-500 ">
            <DetailIcon />
            <EditIcon />
          </div>
        </div>

        {/* Card 2 */}

        <div className="flex flex-col bg-white shadow-md relative group">
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
                <span className="text-2xl font-bold">Salim Al Sazu</span>
                <span className="flex gap-2 text-2xl ml-5">
                  <MobileIcon />
                  <EmailFillIcon />
                </span>
              </div>
              <div>
                <span className="text-lg font-semibold">Accounts Manager</span>
                <span className="text-yellow-800 font-bold text-xl">.</span>
                <span className="text-lg font-extralight">Banani, Dhaka</span>
              </div>
            </div>
          </div>
          <div className="flex gap-8 text-lg bg-stone-200 p-5">
            <div className="flex gap-3 items-center">
              <span>
                <TimeRoundIcon />
              </span>
              <span>Today</span>
            </div>
            <div className="flex gap-3 items-center">
              <span>
                <VisibleIcon />
              </span>
              <span>Feb 15, 2020</span>
            </div>
            <div className="flex gap-3 items-center">
              <span>
                <CalendarIcon />
              </span>
              <span>2+ Years exp</span>
            </div>
            <div className="flex gap-3 items-center">
              <span>
                <SiteFillIcon />
              </span>
              <span>Salary: 30,000</span>
            </div>
          </div>
          <div className="flex gap-3 edit-icon absolute top-4 right-10 opacity-0 transition-opacity duration-300 hover:opacity-100 text-2xl text-blue-500 cursor-pointer">
            <DetailIcon />
            <EditIcon />
          </div>
        </div>

        {/* Card 3 */}

        <div className="flex flex-col bg-white shadow-md relative group">
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
                <span className="text-2xl font-bold">Salim Al Sazu</span>
                <span className="flex gap-2 text-2xl ml-5">
                  <MobileIcon />
                  <EmailFillIcon />
                </span>
              </div>
              <div>
                <span className="text-lg font-semibold">Accounts Manager</span>
                <span className="text-yellow-800 font-bold text-xl">.</span>
                <span className="text-lg font-extralight">Banani, Dhaka</span>
              </div>
            </div>
          </div>
          <div className="flex gap-8 text-lg bg-stone-200 p-5">
            <div className="flex gap-3 items-center">
              <span>
                <TimeRoundIcon />
              </span>
              <span>Today</span>
            </div>
            <div className="flex gap-3 items-center">
              <span>
                <VisibleIcon />
              </span>
              <span>Feb 15, 2020</span>
            </div>
            <div className="flex gap-3 items-center">
              <span>
                <CalendarIcon />
              </span>
              <span>2+ Years exp</span>
            </div>
            <div className="flex gap-3 items-center">
              <span>
                <SiteFillIcon />
              </span>
              <span>Salary: 30,000</span>
            </div>
          </div>
          <div className="flex gap-3 edit-icon absolute top-4 right-10 opacity-0 transition-opacity duration-300 hover:opacity-100 text-2xl text-blue-500 cursor-pointer">
            <DetailIcon />
            <EditIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;

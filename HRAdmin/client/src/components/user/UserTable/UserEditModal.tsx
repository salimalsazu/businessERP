"use client";

import React from "react";
import { Button, Input, Modal, Tooltip, Whisper } from "rsuite";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { Controller, useForm } from "react-hook-form";

const UserEditModal = ({ size, open, handleClose, userDetails }: any) => {
  console.log("userDetails", userDetails);

  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
  } = useForm<any>();

  return (
    <Modal size={size} open={open} onClose={handleClose} backdrop={false}>
      <Modal.Header>
        <Modal.Title className="text-md underline">
          User Edit Information: {userDetails?.profile?.firstName}{" "}
          {userDetails?.profile?.lastName}{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p className="bg-rose-100 text-yellow-600 font-bold  text-lg py-4  rounded-sm pl-5">
            Login Information:
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 items-center w-full my-2">
          <div className="flex flex-col gap-3 w-full">
            <div>
              <Whisper speaker={<Tooltip>Email</Tooltip>}>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                  <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <Input
                    className="z-20 w-full"
                    {...field}
                    size="lg"
                    type="email"
                    value={userDetails?.email}
                    placeholder="Email"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div>
              <Whisper speaker={<Tooltip>Password</Tooltip>}>
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                  <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <Input
                    className="z-20 w-full"
                    {...field}
                    size="lg"
                    type="password"
                    value={userDetails?.password}
                    placeholder="Password"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            />
          </div>
        </div>
        <div>
          <p className="bg-rose-100 text-yellow-600 font-bold  text-lg py-4  rounded-sm pl-5">
            Employee Information:
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 items-center w-full my-2">
          <div className="flex flex-col gap-3 w-full">
            <div>
              <Whisper speaker={<Tooltip>First Name</Tooltip>}>
                <label htmlFor="email" className="text-sm font-medium">
                  First Name
                  <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <Input
                    className="z-20 w-full"
                    {...field}
                    size="lg"
                    type="text"
                    value={userDetails?.profile?.firstName}
                    placeholder="First Name"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div>
              <Whisper speaker={<Tooltip>Last Name</Tooltip>}>
                <label htmlFor="email" className="text-sm font-medium">
                  Last Name
                  <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <Input
                    className="z-20 w-full"
                    {...field}
                    size="lg"
                    type="text"
                    value={userDetails?.profile?.lastName}
                    placeholder="Last Name"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div>
              <Whisper speaker={<Tooltip>Date of Birth</Tooltip>}>
                <label htmlFor="email" className="text-sm font-medium">
                  Date of Birth
                  <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <Input
                    className="z-20 w-full"
                    {...field}
                    size="lg"
                    type="text"
                    value={userDetails?.profile?.dateOfBirth}
                    placeholder="Date of Birth"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div>
              <Whisper speaker={<Tooltip>National Id</Tooltip>}>
                <label htmlFor="email" className="text-sm font-medium">
                  National Id
                  <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>
            <Controller
              name="nationalId"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <Input
                    className="z-20 w-full"
                    {...field}
                    size="lg"
                    type="text"
                    value={userDetails?.profile?.nationalId}
                    placeholder="National Id"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div>
              <Whisper speaker={<Tooltip>Birth Certificate No</Tooltip>}>
                <label htmlFor="email" className="text-sm font-medium">
                  Birth Certificate No
                  <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>
            <Controller
              name="birthCertificateNo"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <Input
                    className="z-20 w-full"
                    {...field}
                    size="lg"
                    type="text"
                    value={userDetails?.profile?.birthCertificateNo}
                    placeholder="Birth Certificate No"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div>
              <Whisper speaker={<Tooltip>Mobile No</Tooltip>}>
                <label htmlFor="email" className="text-sm font-medium">
                  Mobile No
                  <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>
            <Controller
              name="mobileNo"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <Input
                    className="z-20 w-full"
                    {...field}
                    size="lg"
                    type="text"
                    value={userDetails?.profile?.mobileNo}
                    placeholder="Mobile No"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div>
              <Whisper speaker={<Tooltip>Address</Tooltip>}>
                <label htmlFor="email" className="text-sm font-medium">
                  Address
                  <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <Input
                    className="z-20 w-full"
                    {...field}
                    size="lg"
                    type="text"
                    value={userDetails?.profile?.address}
                    placeholder="Mobile No"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            />
          </div>
        </div>

        <div>
          <p className="bg-rose-100 text-yellow-600 font-bold  text-lg py-4  rounded-sm pl-5">
            Job Information:
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 items-center w-full my-2">
          <div className="flex flex-col gap-3 w-full">
            <div>
              <Whisper speaker={<Tooltip>Job Id</Tooltip>}>
                <label htmlFor="email" className="text-sm font-medium">
                  Job Id
                  <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>
            <Controller
              name="jobId"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <Input
                    className="z-20 w-full"
                    {...field}
                    size="lg"
                    type="jobId"
                    value={userDetails?.profile?.jobId}
                    placeholder="jobId"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div>
              <Whisper speaker={<Tooltip>Joining Date</Tooltip>}>
                <label htmlFor="email" className="text-sm font-medium">
                  Joining Date
                  <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>
            <Controller
              name="joiningDate"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <Input
                    className="z-20 w-full"
                    {...field}
                    size="lg"
                    type="jobId"
                    value={userDetails?.profile?.joiningDate}
                    placeholder="Joining Date"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div>
              <Whisper speaker={<Tooltip>Job Title</Tooltip>}>
                <label htmlFor="email" className="text-sm font-medium">
                  Job Title
                  <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>
            <Controller
              name="jobTitle"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <Input
                    className="z-20 w-full"
                    {...field}
                    size="lg"
                    type="jobId"
                    value={userDetails?.profile?.jobTitle}
                    placeholder="Job Title"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div>
              <Whisper speaker={<Tooltip>Experience</Tooltip>}>
                <label htmlFor="email" className="text-sm font-medium">
                  Experience
                  <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>
            <Controller
              name="experience"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <Input
                    className="z-20 w-full"
                    {...field}
                    size="lg"
                    type="jobId"
                    value={userDetails?.profile?.experience}
                    placeholder="Experience"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div>
              <Whisper speaker={<Tooltip>Bank Account No</Tooltip>}>
                <label htmlFor="email" className="text-sm font-medium">
                  Bank Account No
                  <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>
            <Controller
              name="bankAccountNo"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <Input
                    className="z-20 w-full"
                    {...field}
                    size="lg"
                    type="bankAccountNo"
                    value={userDetails?.profile?.bankAccountNo}
                    placeholder="Bank Account No"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div>
              <Whisper speaker={<Tooltip>Salary</Tooltip>}>
                <label htmlFor="email" className="text-sm font-medium">
                  Salary
                  <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>
            <Controller
              name="salary"
              control={control}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <Input
                    className="z-20 w-full"
                    {...field}
                    size="lg"
                    type="salary"
                    value={userDetails?.profile?.salary}
                    placeholder="Salary"
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UserEditModal;

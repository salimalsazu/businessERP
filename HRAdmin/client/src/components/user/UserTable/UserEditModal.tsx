"use client";

import React, { use, useEffect } from "react";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  SelectPicker,
  Tooltip,
  Whisper,
} from "rsuite";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import moment from "moment";
import { useUpdateMyProfileMutation } from "@/redux/api/features/userApi";
import { toast } from "sonner";
import { storeUserInfo } from "@/hooks/services/auth.service";

const UserEditModal = ({ size, open, handleClose, userDetails }: any) => {
  // console.log("userDetails", userDetails);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<any>();

  const [
    updateUserProfile,
    { isLoading, isError, isSuccess, isUninitialized },
  ] = useUpdateMyProfileMutation();

  const handleEditUser: SubmitHandler<any> = async (data: any) => {
    await updateUserProfile({
      profileId: userDetails?.profile?.profileId,
      payload: {
        ...data,
        mobileBillingLimit: parseInt(data.mobileBillingLimit),
        totalSalary: parseInt(data.totalSalary),
        tdsOnSalary: parseInt(data.tdsOnSalary),
      },
    });
  };

  useEffect(() => {
    if (isSuccess && !isLoading && !isUninitialized) {
      toast.success("Profile Updated Successfully");
    } else if (isError) {
      toast.error("Profile Update Failed");
    }
  }, [isError, isSuccess, isUninitialized, isLoading]);

  return (
    <Modal size={size} open={open} onClose={handleClose} backdrop={false}>
      <Modal.Header>
        <Modal.Title className="text-md">
          <span className="underline">User Edit Information:</span>{" "}
          <span>{userDetails?.profile?.firstName} </span>
          {userDetails?.profile?.lastName}{" "}
          <Button size="xs" appearance="primary">
            {userDetails?.userStatus}
          </Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(handleEditUser)}>
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
                      defaultValue={userDetails?.email}
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
                  <label htmlFor="firstName" className="text-sm font-medium">
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
                      defaultValue={userDetails?.profile?.firstName}
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
                  <label htmlFor="lastName" className="text-sm font-medium">
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
                      defaultValue={userDetails?.profile?.lastName}
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
                  <label htmlFor="dateOfBirth" className="text-sm font-medium">
                    Date of Birth
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="dateOfBirth"
                control={control}
                defaultValue={
                  userDetails?.profile?.dateOfBirth
                    ? moment(userDetails.profile.dateOfBirth).toDate()
                    : undefined
                }
                render={({ field: { onChange, value, ref } }) => (
                  <DatePicker
                    className="z-20 w-full"
                    size="lg"
                    onChange={(date) => {
                      const isoString = date?.toISOString();
                      setValue("dateOfBirth", isoString);
                      onChange(date); // Update the field's value
                    }}
                    value={value ? moment(value).toDate() : null} // Ensure the value is correctly set
                    placeholder="Date of Birth"
                    style={{ width: "100%" }}
                    ref={ref}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <div>
                <Whisper speaker={<Tooltip>National Id</Tooltip>}>
                  <label htmlFor="nationalId" className="text-sm font-medium">
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
                      defaultValue={userDetails?.profile?.nationalId}
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
                      defaultValue={userDetails?.profile?.birthCertificateNo}
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
                      defaultValue={userDetails?.profile?.mobileNo}
                      placeholder="Mobile No"
                      style={{ width: "100%" }}
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <div>
                <Whisper speaker={<Tooltip>Mobile Limit</Tooltip>}>
                  <label
                    htmlFor="mobileBillingLimit"
                    className="text-sm font-medium"
                  >
                    Mobile Limit
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="mobileBillingLimit"
                control={control}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      className="z-20 w-full"
                      {...field}
                      size="lg"
                      type="text"
                      defaultValue={userDetails?.profile?.mobileBillingLimit}
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
                      defaultValue={userDetails?.profile?.address}
                      placeholder="Address"
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
                      defaultValue={userDetails?.profile?.jobId}
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
                defaultValue={
                  userDetails?.profile?.joiningDate
                    ? moment(userDetails.profile.joiningDate).toDate()
                    : undefined
                }
                render={({ field: { onChange, value, ref } }) => (
                  <DatePicker
                    className="z-20 w-full"
                    size="lg"
                    onChange={(date) => {
                      const isoString = date?.toISOString();
                      setValue("joiningDate", isoString);
                      onChange(date); // Update the field's value
                    }}
                    value={value ? moment(value).toDate() : null} // Ensure the value is correctly set
                    placeholder="Joining Date"
                    style={{ width: "100%" }}
                    ref={ref}
                  />
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
                      defaultValue={userDetails?.profile?.jobTitle}
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
                      defaultValue={userDetails?.profile?.experience}
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
                      defaultValue={userDetails?.profile?.bankAccountNo}
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
                  <label htmlFor="totalSalary" className="text-sm font-medium">
                    Salary
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="totalSalary"
                control={control}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      className="z-20 w-full"
                      {...field}
                      size="lg"
                      type="salary"
                      defaultValue={userDetails?.profile?.totalSalary}
                      placeholder="Salary"
                      style={{ width: "100%" }}
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <div>
                <Whisper speaker={<Tooltip>TDS</Tooltip>}>
                  <label htmlFor="totalSalary" className="text-sm font-medium">
                    TDS
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="tdsOnSalary"
                control={control}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      className="z-20 w-full"
                      {...field}
                      size="lg"
                      type="salary"
                      defaultValue={userDetails?.profile?.tdsOnSalary}
                      placeholder="Tax"
                      style={{ width: "100%" }}
                    />
                  </div>
                )}
              />
            </div>
          </div>

          <div>
            <p className="bg-rose-100 text-yellow-600 font-bold  text-lg py-4  rounded-sm pl-5">
              Status:
            </p>
          </div>
          {/* <div>
            <div className="flex flex-col gap-3 w-full">
              <div>
                <Whisper speaker={<Tooltip>Status</Tooltip>}>
                  <label htmlFor="email" className="text-sm font-medium">
                    Status
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="userStatus"
                control={control}
                defaultValue={userDetails?.userStatus}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <SelectPicker
                      className="z-20 w-full"
                      {...field}
                      size="lg"
                      data={["Active", "Paused", "Suspended", "Pending"].map(
                        (item: any) => ({
                          label: item,
                          value: item,
                        })
                      )}
                      onChange={(value) => {
                        setValue("userStatus", value);
                        field.onChange(value);
                      }}
                      placeholder="Status"
                      style={{ width: "100%" }}
                    />
                  </div>
                )}
              />
            </div>
          </div> */}

          <div className="flex justify-end my-3">
            <Button
              loading={isLoading}
              className="w-full"
              type="submit"
              appearance="primary"
            >
              Edit
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UserEditModal;

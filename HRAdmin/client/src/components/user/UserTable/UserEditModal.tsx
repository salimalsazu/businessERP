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
        <div className="grid grid-cols-2 gap-2 items-center w-full">
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
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} appearance="subtle">
          Cancel
        </Button>
        <Button onClick={handleClose} appearance="primary">
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserEditModal;

"use client";

import { useEffect, useState } from "react";
import {
  Panel,
  ButtonGroup,
  Button,
  Form,
  Whisper,
  Tooltip,
  Input,
} from "rsuite";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useRegistrationMutation } from "@/redux/api/authApi";
import { toast } from "sonner";

const AddUserForm = () => {
  interface IAddUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
  } = useForm<IAddUser>();

  const [step, setStep] = useState(0);

  const onChange = (nextStep: any) => {
    setStep(nextStep < 0 ? 0 : nextStep > 1 ? 1 : nextStep);
  };

  const onNext = async () => {
    let valid = false;
    if (step === 0) {
      valid = await trigger(["email", "password"]);
    } else if (step === 1) {
      valid = await trigger(["firstName", "lastName"]);
    }

    if (valid) {
      onChange(step + 1);
    }
  };

  const onPrevious = () => onChange(step - 1);

  const [addUser, { isLoading, isSuccess, isError, error }] =
    useRegistrationMutation();

  const handleFileSubmit: SubmitHandler<IAddUser> = async (data) => {
    await addUser(data);
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      toast.success("User added successfully!");
      reset({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      });
    }
    if (isError && !isSuccess) {
      toast.error("Error adding user!");
    }
  }, [isSuccess, isError, reset]);

  return (
    <div className="m-5">
      <h1 className="text-lg font-bold">Add User:</h1>
      <Panel>
        {step === 0 && (
          <Form fluid className="flex gap-5">
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
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      className="z-20 w-full"
                      {...field}
                      size="lg"
                      type="email"
                      placeholder="Email"
                      style={{ width: "100%" }}
                    />
                    {errors.email && (
                      <div className="text-red-500">{errors.email.message}</div>
                    )}
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
                rules={{ required: "Password is required" }}
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
                    {errors.password && (
                      <div className="text-red-500">
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </Form>
        )}
        {step === 1 && (
          <Form fluid className="flex items-center gap-5">
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
                rules={{ required: "First Name is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      className="z-20 w-full"
                      {...field}
                      size="lg"
                      type="text"
                      placeholder="First Name"
                      style={{ width: "100%" }}
                    />
                    {errors.firstName && (
                      <div className="text-red-500">
                        {errors.firstName.message}
                      </div>
                    )}
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
                rules={{ required: "Last Name is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      className="z-20 w-full"
                      {...field}
                      size="lg"
                      type="text"
                      placeholder="Last Name"
                      style={{ width: "100%" }}
                    />
                    {errors.lastName && (
                      <div className="text-red-500">
                        {errors.lastName.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="mt-6">
              <Button
                appearance="ghost"
                loading={isLoading}
                onClick={handleSubmit(handleFileSubmit)}
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Panel>
      <hr />
      <ButtonGroup>
        <Button appearance="primary" onClick={onPrevious} disabled={step === 0}>
          Previous
        </Button>
        <Button appearance="primary" onClick={onNext} disabled={step === 1}>
          Next
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default AddUserForm;

"use client";

import { Button, Input, TagPicker, Tooltip, Whisper } from "rsuite";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { isLoggedIn, storeUserInfo } from "@/hooks/services/auth.service";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginSection = () => {
  const userLoggedIn = isLoggedIn();

  const router = useRouter();

  interface ILogin {
    email: string;
    password: string;
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILogin>();

  const [login, { isLoading, isSuccess, isError, error, data }] =
    useUserLoginMutation();

  const handleLogin: SubmitHandler<ILogin> = async (user) => {
    const data = { email: user.email, password: user.password };
    const res: any = await login({ data: data }).unwrap();
    console.log(res, "res");

    if (res?.data?.accessToken) {
      storeUserInfo({ accessToken: res?.data?.accessToken });
    }
  };

  useEffect(() => {
    if (isSuccess && !isLoading && !isError && !error && data) {
      router.push("/dashboard");
      toast.success(data?.message);
    }

    if (!isSuccess && !isLoading && isError && error && !data) {
      //@ts-ignore
      toast.error(error?.message);
    }
  }, [isSuccess, isLoading, isError, error, router, data]);

  return (
    <div className="border m-3 p-5 rounded  shadow-sm bg-sidebar ">
      <form onSubmit={handleSubmit(handleLogin)}>
        {/* 1st section */}
        <div className="flex flex-col gap-[24px] mb-5 w-[100%]">
          {/* email */}
          <div className="flex flex-col gap-3 w-full">
            <div className="flex">
              <Whisper
                speaker={
                  <Tooltip>
                    <span className="text-[11px]">Email</span>
                  </Tooltip>
                }
              >
                <label htmlFor="email" className="text-sm font-medium">
                  Email <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
              }}
              render={({ field }: any) => (
                <div className="rs-form-control-wrapper w-full">
                  <Input
                    {...field}
                    min={1}
                    size="lg"
                    type="email"
                    placeholder="Email"
                    style={{ width: "100%" }}
                  />
                  {/* <Form.ErrorMessage
                      show={
                        (!!errors?.totalPack && !!errors?.totalPack?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      {errors?.totalPack?.message}
                    </Form.ErrorMessage> */}
                </div>
              )}
            />
          </div>

          {/* password */}
          <div className="flex flex-col gap-3 w-full ">
            <div>
              <Whisper
                speaker={
                  <Tooltip>
                    <span className="text-[11px]">Password</span>
                  </Tooltip>
                }
              >
                <label htmlFor="password" className="text-sm font-medium">
                  Password <InfoOutlineIcon />
                </label>
              </Whisper>
            </div>

            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
              }}
              render={({ field }: any) => (
                <div className="rs-form-control-wrapper ">
                  <Input
                    {...field}
                    min={1}
                    size="lg"
                    id="totalPack"
                    type="password"
                    placeholder="Password"
                    style={{ width: "100%" }}
                  />
                  {/* <Form.ErrorMessage
                      show={
                        (!!errors?.totalPack && !!errors?.totalPack?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      {errors?.totalPack?.message}
                    </Form.ErrorMessage> */}
                </div>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <Button
            type="submit"
            // loading={isLoading}
            size="lg"
            loading={isLoading}
            className={`!bg-primary !hover:bg-secondary  focus:text-white hover:text-white/80 !text-white  items-center   flex px-3 py-2 text-sm rounded-md `}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginSection;

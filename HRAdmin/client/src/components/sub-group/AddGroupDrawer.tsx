"use client";

import { useAddGroupMutation } from "@/redux/api/features/groupApi";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Drawer, Input, InputPicker, Tooltip, Whisper } from "rsuite";
import { toast } from "sonner";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";

const AddGroupDrawer = ({
  backdropDrawer,
  openGroupDrawer,
  setOpenGroupDrawer,
}: any) => {
  interface ICreateGroup {
    groupName: string;
    tbType: string;
  }

  const [addGroup, { isLoading, isSuccess }] = useAddGroupMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ICreateGroup>();

  const handleCreateAccount: SubmitHandler<ICreateGroup> = async (
    data: ICreateGroup
  ) => {
    const objAccount = {
      groupName: data.groupName,
      tbType: data.tbType,
    };

    await addGroup(objAccount);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setOpenGroupDrawer(false);
      toast.success("Group Created Successfully");
    }
  }, [isSuccess, reset, setOpenGroupDrawer]);

  return (
    <div>
      <Drawer
        backdrop={backdropDrawer}
        open={openGroupDrawer}
        onClose={() => setOpenGroupDrawer(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Add Group</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <form onSubmit={handleSubmit(handleCreateAccount)}>
            <div className="flex flex-col items-center gap-3 mb-5 w-full">
              <div className="flex flex-col gap-3 w-full">
                <div>
                  <Whisper speaker={<Tooltip>Group Name</Tooltip>}>
                    <label htmlFor="title" className="text-sm font-medium">
                      Group Name
                      <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="groupName"
                  control={control}
                  rules={{ required: "Group Name is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        className="z-20 w-full"
                        {...field}
                        min={1}
                        size="lg"
                        type="text"
                        placeholder="Group Name"
                        style={{
                          width: "100%",
                        }}
                      />
                      {/* <Form.ErrorMessage
                        show={
                          (!!errors?.styleNo && !!errors?.styleNo?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {errors?.styleNo?.message}
                      </Form.ErrorMessage> */}
                    </div>
                  )}
                />{" "}
              </div>

              <div className="flex flex-col gap-3 w-full ">
                <div>
                  <Whisper speaker={<Tooltip>TB</Tooltip>}>
                    <label htmlFor="assetName" className="text-sm font-medium">
                      TB
                      <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="tbType"
                  control={control}
                  // defaultValue={""}
                  rules={{ required: "TB Type is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <InputPicker
                        size={"lg"}
                        data={["DEBIT", "CREDIT"].map((item: any) => ({
                          label: item,
                          value: item,
                        }))}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        style={{ width: "100%" }}
                      />
                      {/* <Form.ErrorMessage
                          show={
                            (!!errors?.styleNo && !!errors?.styleNo?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          {errors?.styleNo?.message}
                        </Form.ErrorMessage> */}
                    </div>
                  )}
                />{" "}
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <Button
                type="submit"
                loading={isLoading}
                size="lg"
                className={`!bg-primary !hover:bg-secondary  focus:text-white hover:text-white/80 !text-white  items-center   flex px-3 py-2 text-sm rounded-md `}
              >
                {(isLoading && "Creating") ||
                  (isSuccess && "Created") ||
                  "Create Group"}
              </Button>
            </div>
          </form>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default AddGroupDrawer;

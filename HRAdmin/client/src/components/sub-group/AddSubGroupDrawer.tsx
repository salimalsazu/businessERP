import { useAddSubGroupMutation } from "@/redux/api/features/subGroupApi";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Drawer, Input, InputPicker, Tooltip, Whisper } from "rsuite";
import { toast } from "sonner";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { useGetGroupQuery } from "@/redux/api/features/groupApi";

const AddSubGroupDrawer = ({
  backdropDrawerSubGroup,
  openSubGroupDrawer,
  setOpenSubGroupDrawer,
}: any) => {
  const { data: subGroupData, isLoading: subGroupLoading } = useGetGroupQuery(
    {}
  );

  interface ICreateSubGroup {
    subGroupName: string;
    subGroupDescription: string;
    groupId: string;
  }

  const [addSubGroup, { isLoading, isSuccess }] = useAddSubGroupMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ICreateSubGroup>();

  const handleCreateAccount: SubmitHandler<ICreateSubGroup> = async (
    data: ICreateSubGroup
  ) => {
    const objAccount = {
      subGroupName: data.subGroupName,
      subGroupDescription: data.subGroupDescription,
      groupId: data.groupId,
    };

    console.log("objAccount", objAccount);

    await addSubGroup(objAccount);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setOpenSubGroupDrawer(false);
      toast.success("Sub Group Created Successfully");
    }
  }, [isSuccess, reset, setOpenSubGroupDrawer]);

  return (
    <div>
      <Drawer
        backdrop={backdropDrawerSubGroup}
        open={openSubGroupDrawer}
        onClose={() => setOpenSubGroupDrawer(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Add Sub Group</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <form onSubmit={handleSubmit(handleCreateAccount)}>
            {/* 4th section */}
            <div className="flex flex-col items-center gap-3 mb-5 w-full">
              <div className="flex flex-col gap-3 w-full">
                <div>
                  <Whisper speaker={<Tooltip>Sub Group Name</Tooltip>}>
                    <label htmlFor="title" className="text-sm font-medium">
                      Sub Group Name
                      <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="subGroupName"
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

              <div className="flex flex-col gap-3 w-full">
                <div>
                  <Whisper speaker={<Tooltip>Description</Tooltip>}>
                    <label htmlFor="title" className="text-sm font-medium">
                      Description
                      <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="subGroupDescription"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        as="textarea"
                        rows={3}
                        className="z-20 w-full"
                        {...field}
                        min={1}
                        size="lg"
                        type="text"
                        placeholder="Description"
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
                  <Whisper speaker={<Tooltip>Group Name</Tooltip>}>
                    <label htmlFor="assetName" className="text-sm font-medium">
                      Group Name
                      <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="groupId"
                  control={control}
                  // defaultValue={""}
                  rules={{ required: "TB Type is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <InputPicker
                        size={"lg"}
                        data={subGroupData?.data?.data?.map((item: any) => ({
                          label: item.groupName,
                          value: item.groupId,
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
                  "Create Sub Group"}
              </Button>
            </div>
          </form>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default AddSubGroupDrawer;

"use client";

import { useAddAccountMutation } from "@/redux/api/features/accountApi";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Drawer, Input, InputPicker, Tooltip, Whisper } from "rsuite";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { useEffect } from "react";
import { toast } from "sonner";
import { useGetSubGroupQuery } from "@/redux/api/features/subGroupApi";

const AddLedgerSection = ({ openDrawer, setOpenDrawer }: any) => {
  const { data: subGroupData } = useGetSubGroupQuery({});

  interface ICreateLedger {
    accountName: string;
    subGroupId: string;
    closingBalance: number;
  }

  const [addAccount, { isLoading, isSuccess }] = useAddAccountMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ICreateLedger>();

  const handleCreateAccount: SubmitHandler<ICreateLedger> = async (
    data: ICreateLedger
  ) => {
    const objAccount = {
      accountName: data.accountName,
      subGroupId: data.subGroupId,
      closingBalance: Number(data.closingBalance),
    };

    await addAccount(objAccount);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setOpenDrawer(false);
      toast.success("Account Created Successfully");
    }
  }, [isSuccess, reset, setOpenDrawer]);

  return (
    <div>
      <Drawer
        backdrop={false}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Add Ledger or Account </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <form onSubmit={handleSubmit(handleCreateAccount)}>
            {/* 4th section */}
            <div className="flex flex-col items-center gap-3 mb-5 w-full">
              <div className="flex flex-col gap-3 w-full">
                <div>
                  <Whisper speaker={<Tooltip>Account Name</Tooltip>}>
                    <label htmlFor="title" className="text-sm font-medium">
                      Account Name
                      <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="accountName"
                  control={control}
                  rules={{ required: "Account Name is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        className="z-20 w-full"
                        {...field}
                        min={1}
                        size="lg"
                        type="text"
                        placeholder="Account Name"
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
                  <Whisper speaker={<Tooltip>Sub Group</Tooltip>}>
                    <label htmlFor="assetName" className="text-sm font-medium">
                      Sub Group
                      <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="subGroupId"
                  control={control}
                  // defaultValue={""}
                  rules={{ required: "Sub Group is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <InputPicker
                        size={"lg"}
                        data={subGroupData?.data?.data?.map((item: any) => ({
                          label: item.subGroupName,
                          value: item.subGroupId,
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

              <div className="flex flex-col gap-3 w-full">
                <div>
                  <Whisper speaker={<Tooltip>Closing Balance</Tooltip>}>
                    <label htmlFor="title" className="text-sm font-medium">
                      Closing Balance
                      <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="closingBalance"
                  control={control}
                  rules={{ required: "Closing Balance is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        className="z-20 w-full"
                        {...field}
                        min={0}
                        size="lg"
                        type="number"
                        placeholder="Closing Balance"
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
                  "Create Account"}
              </Button>
            </div>
          </form>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default AddLedgerSection;

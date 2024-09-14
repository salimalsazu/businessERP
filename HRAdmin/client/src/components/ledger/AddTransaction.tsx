"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  DatePicker,
  Input,
  InputPicker,
  Tooltip,
  Whisper,
} from "rsuite";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useAddAccountMutation,
  useGetAccountQuery,
} from "@/redux/api/features/accountApi";
import { useAddTransactionMutation } from "@/redux/api/features/transactionApi";

const AddTransactionSection = () => {
  const query: Record<string, any> = {};
  const [size, setSize] = useState<number>(1000);
  query["limit"] = size;

  const { data: allAccounts } = useGetAccountQuery({ ...query });

  const [addAccount] = useAddAccountMutation();

  //Function
  const handleAddAccount = async (data: any) => {
    // console.log("data", data);
    await addAccount(data);
  };

  interface ITransactionList {
    transactionDate: Date;
    transactionType: AmountType;
    transactionAmount: number;
    transactionDescription: string;
    debitAccountId: string;
    creditAccountId: string;
  }

  enum AmountType {
    "CASH",
    "CHEQUE",
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ITransactionList>();

  const [addTransaction, { isLoading, isSuccess, isError, data: messageData }] =
    useAddTransactionMutation();

  const handleCreateItemList: SubmitHandler<ITransactionList> = async (
    data: ITransactionList
  ) => {
    const objTransaction = {
      transactionDate: data.transactionDate,
      transactionType: data.transactionType,
      transactionAmount: Number(data.transactionAmount),
      transactionDescription: data.transactionDescription,
      debitAccountId: data.debitAccountId,
      creditAccountId: data.creditAccountId,
    };
    console.log("addTransaction", objTransaction);

    await addTransaction(objTransaction);
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      toast.success(messageData?.message);
    }
    if (isError && !isSuccess) {
      toast.error("Failed to add transaction");
    }
  });

  return (
    <div className="m-5">
      <div>
        <h1 className="text-lg font-semibold mb-5">Add Transaction:</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(handleCreateItemList)}>
          {/* 1st section */}
          <div className="flex justify-between gap-3 mb-5 w-[100%]">
            {/* Date */}{" "}
            <div className="flex flex-col gap-3 w-full lg:w-[30%] ">
              <div>
                <Whisper speaker={<Tooltip>Transaction Date</Tooltip>}>
                  <label htmlFor="purchaseDate" className="text-sm font-medium">
                    Transaction Date <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="transactionDate"
                control={control}
                rules={{ required: "Transaction Date is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <DatePicker
                      id="requisitionDate"
                      value={field.value ? new Date(field.value) : null}
                      onChange={(value: Date | null): void => {
                        if (value) {
                          const isoString = value.toISOString();
                          field.onChange(isoString);
                        } else {
                          field.onChange(null);
                        }
                      }}
                      style={{
                        width: "100%",
                      }}
                      size="lg"
                      placeholder=" Transaction Date"
                      editable={false}
                      placement="auto"
                    />
                    {/* <Form.ErrorMessage
                            show={!!errors?.buyerEtd && !!errors?.buyerEtd?.message}
                            placement="topEnd"
                          >
                            {errors?.buyerEtd?.message}
                          </Form.ErrorMessage> */}
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>Transaction Type</Tooltip>}>
                  <label htmlFor="assetName" className="text-sm font-medium">
                    Transaction Type
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="transactionType"
                control={control}
                // defaultValue={""}
                rules={{ required: "Transaction Type is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <InputPicker
                      size={"lg"}
                      data={["CASH", "CHEQUE"].map((item) => ({
                        label: item,
                        value: item,
                      }))}
                      onChange={(value: string | null) => field.onChange(value)}
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
          {/* 2nd section */}
          <div className=" flex gap-3 mb-5 w-full">
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>Debit Account</Tooltip>}>
                  <label htmlFor="assetName" className="text-sm font-medium">
                    Debit Account
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="debitAccountId"
                control={control}
                // defaultValue={""}
                rules={{ required: "Debit Account is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <InputPicker
                      //   creatable
                      size={"lg"}
                      data={allAccounts?.data?.data?.map((item: any) => ({
                        label: item.accountName,
                        value: item.accountId,
                      }))}
                      //   onCreate={(value, item) => {
                      //     handleAddAccount({ accountName: value });
                      //   }}
                      onChange={(value: string | null) => field.onChange(value)}
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
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>Credit Account</Tooltip>}>
                  <label htmlFor="assetName" className="text-sm font-medium">
                    Credit Account
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="creditAccountId"
                control={control}
                // defaultValue={""}
                rules={{ required: "Credit Account is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <InputPicker
                      //   creatable
                      size={"lg"}
                      data={allAccounts?.data?.data?.map((item: any) => ({
                        label: item.accountName,
                        value: item.accountId,
                      }))}
                      //   onCreate={(value, item) => {
                      //     handleAddAccount({ accountName: value });
                      //   }}
                      onChange={(value: string | null) => field.onChange(value)}
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
          {/* 3rd section */}
          <div className="flex mb-5 w-[100%]">
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
                name="transactionDescription"
                control={control}
                rules={{ required: "Description are required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      as="textarea"
                      rows={5}
                      className="z-20 w-full"
                      {...field}
                      min={1}
                      size="lg"
                      type="text"
                      placeholder="Details..."
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
          {/* 4th section */}
          <div className="flex justify-between gap-3 mb-5 w-[100%]">
            <div className="flex flex-col gap-3 w-full lg:w-[70%] ">
              <div>
                <Whisper speaker={<Tooltip>TransactionAmount Amount</Tooltip>}>
                  <label htmlFor="title" className="text-sm font-medium">
                    Transaction Amount
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="transactionAmount"
                control={control}
                rules={{ required: "Amount is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      className="z-20 w-full"
                      {...field}
                      min={1}
                      size="lg"
                      type="number"
                      placeholder="Amount"
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
                "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionSection;

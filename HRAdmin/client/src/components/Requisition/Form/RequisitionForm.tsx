"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  DatePicker,
  Input,
  InputPicker,
  SelectPicker,
  Tooltip,
  Whisper,
} from "rsuite";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { useAddRequisitionMutation } from "@/redux/api/features/requisitionApi";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  useAddAccountMutation,
  useGetAccountQuery,
} from "@/redux/api/features/accountApi";

const AddRequisitionForm = () => {
  const { data: allAccounts } = useGetAccountQuery({});


  const [addAccount] = useAddAccountMutation();

  const handleAddAccount = async (data: any) => {
    // console.log("data", data);
    await addAccount(data);
  };

  interface IRequisitionList {
    requisitionDate: Date;
    accountId: string;
    bankName: string;
    chequeNo: string;
    chequeDate: string;
    details: string;
    amount: number;
    amountType: string;
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IRequisitionList>();

  const [addRequisition, { isLoading, isSuccess, isError }] =
    useAddRequisitionMutation();

  const handleCreateItemList: SubmitHandler<IRequisitionList> = async (
    data: IRequisitionList
  ) => {
    const objRequisition = {
      requisitionDate: data.requisitionDate,
      accountId: data.accountId,
      bankName: data.bankName,
      chequeNo: data.chequeNo,
      chequeDate: data.chequeDate,
      details: data.details,
      amount: Number(data.amount),
      amountType: data.amountType,
    };

    await addRequisition({ data: objRequisition });
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      toast.success("Requisition added successfully");
    }
    if (isError && !isSuccess) {
      toast.error("Failed to add requisition");
    }
  });

  return (
    <div className="m-5">
      <div>
        <h1 className="text-lg font-semibold mb-5">Add Requisition:</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(handleCreateItemList)}>
          {/* 1st section */}
          <div className="flex justify-between gap-3 mb-5 w-[100%]">
            {/* Date */}{" "}
            <div className="flex flex-col gap-3 w-full lg:w-[30%] ">
              <div>
                <Whisper speaker={<Tooltip>Purchase Date</Tooltip>}>
                  <label htmlFor="purchaseDate" className="text-sm font-medium">
                    Purchase Date <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="requisitionDate"
                control={control}
                rules={{ required: "Purchase Date is required" }}
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
                      placeholder=" Requisition Date"
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
                <Whisper speaker={<Tooltip>Account Name</Tooltip>}>
                  <label htmlFor="assetName" className="text-sm font-medium">
                    Account Name
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="accountId"
                control={control}
                // defaultValue={""}
                rules={{ required: "Account is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <InputPicker
                      creatable
                      size={"lg"}
                      data={allAccounts?.data?.data?.map((item: any) => ({
                        label: item.accountName,
                        value: item.accountId,
                      }))}
                      onCreate={(value, item) => {
                        handleAddAccount({ accountName: value });
                      }}
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
            <div className="flex flex-col gap-3 w-full">
              <div>
                <Whisper speaker={<Tooltip>Bank Name</Tooltip>}>
                  <label htmlFor="bankName" className="text-sm font-medium">
                    Bank name
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="bankName"
                control={control}
                rules={{ required: "Bank Name required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      className="z-20 w-full"
                      {...field}
                      min={1}
                      size="lg"
                      id="bankName"
                      type="text"
                      placeholder="Bank Name"
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
              />
            </div>
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>Cheque No</Tooltip>}>
                  <label
                    htmlFor="stationaryItemId"
                    className="text-sm font-medium"
                  >
                    Cheque No
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="chequeNo"
                control={control}
                rules={{ required: "Cheque No required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      className="z-20"
                      {...field}
                      min={1}
                      size="lg"
                      id="chequeNo"
                      type="text"
                      placeholder="Cheque No"
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
                <Whisper speaker={<Tooltip>Cheque Date</Tooltip>}>
                  <label htmlFor="chequeDate" className="text-sm font-medium">
                    Cheque Date <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="chequeDate"
                control={control}
                rules={{ required: "Cheque Date is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <DatePicker
                      id="chequeDate"
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
                      placeholder=" Cheque Date"
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
          </div>
          {/* 3rd section */}
          <div className="flex mb-5 w-[100%]">
            <div className="flex flex-col gap-3 w-full">
              <div>
                <Whisper speaker={<Tooltip>Details</Tooltip>}>
                  <label htmlFor="title" className="text-sm font-medium">
                    Details
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="details"
                control={control}
                rules={{ required: "Details are required" }}
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
                <Whisper speaker={<Tooltip>Amount</Tooltip>}>
                  <label htmlFor="title" className="text-sm font-medium">
                    Amount
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="amount"
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

            <div className="flex flex-col gap-3 w-full lg:w-[30%] ">
              <div>
                <Whisper speaker={<Tooltip>Type</Tooltip>}>
                  <label htmlFor="title" className="text-sm font-medium">
                    Amount Type
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="amountType"
                control={control}
                rules={{ required: "Amount Type is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <SelectPicker
                      searchable={false}
                      className="z-20 w-full"
                      {...field}
                      data={["Cash", "Cheque"].map((item) => ({
                        label: item,
                        value: item,
                      }))}
                      size="lg"
                      placeholder="Amount Type"
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
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRequisitionForm;

"use client";

import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  InputPicker,
  Modal,
  Placeholder,
  SelectPicker,
  TagPicker,
  Toggle,
  Tooltip,
  Uploader,
  Whisper,
} from "rsuite";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { FileType } from "rsuite/esm/Uploader";
import { useCreateAssetItemListMutation } from "@/redux/api/features/assetItemApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AssignAssetModal = ({ handleClose, open }: any) => {
  const [assign, setAssign] = useState(true);

  const assignToggle = () => {
    setAssign(!assign);
  };

  interface IAssetList {
    purchaseDate: Date;
    assetImage?: FileType | undefined;
    assetName: string;
    assetModel: string;
    assetQuantity: number;
    assetLocation: string;
    assetCategory: string;
  }

  const [creatingAsset, { isLoading, isSuccess }] =
    useCreateAssetItemListMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAssetList>();

  const handleCreateStationaryList: SubmitHandler<IAssetList> = async (
    data: IAssetList
  ) => {
    const assetList = {
      purchaseDate: data.purchaseDate,
      assetName: data.assetName,
      assetModel: data.assetModel,
      assetQuantity: Number(data.assetQuantity),
      assetLocation: data.assetLocation,
      assetCategory: data.assetCategory,
    };

    // console.log(assetList);

    const orderData = JSON.stringify(assetList);
    const formData = new FormData();

    // console.log(data.assetImage?.blobFile, "imageeee");
    formData.append("file", data.assetImage?.blobFile as Blob);
    formData.append("data", orderData);

    await creatingAsset(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("asset created successfully");
    }
  }, [isSuccess, handleClose]);

  // useEffect(() => {
  //   if (!isError && !isLoading && isSuccess && !error && data) {
  //     toast.success(
  //       data?.message || "Successfully Created New Order.",
  //       toastMessageSuccess
  //     );
  //     navigate("/po/poLists");
  //   }
  //   if (isError && !isLoading && !isSuccess && error) {
  //     // @ts-ignore
  //     toast.error(error?.message || "Failed to create new Order.", {
  //       style: {
  //         border: "1px solid red",
  //         padding: "16px",
  //         color: "red",
  //       },
  //       iconTheme: {
  //         primary: "red",
  //         secondary: "#FFFAEE",
  //       },
  //     });
  //   }
  // }, []);

  // const item = ["Tissue Box", "A4 Paper"].map((item) => ({
  //   label: item,
  //   value: item,
  // }));

  return (
    <Modal
      overflow={false}
      backdrop="static"
      keyboard={false}
      open={open}
      onClose={handleClose}
    >
      <Modal.Header>
        <Modal.Title className="!font-bold">
          Assign or Servicing Asset
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="my-4">
          if Servicing <Toggle onChange={assignToggle} size="sm" />
        </div>
        <form onSubmit={handleSubmit(handleCreateStationaryList)}>
          {/* 1st section */}
          <div className="flex justify-between  gap-[24px] mb-5">
            {/* assign Date */}{" "}
            <div className="flex flex-col gap-3 w-full ">
              {assign && (
                <div className="flex flex-col gap-3 w-full ">
                  <div>
                    <Whisper speaker={<Tooltip>Assign Date</Tooltip>}>
                      <label
                        htmlFor="purchaseDate"
                        className="text-sm font-medium"
                      >
                        Assign Date <InfoOutlineIcon />
                      </label>
                    </Whisper>
                  </div>

                  <Controller
                    name="assignDate"
                    control={control}
                    rules={{ required: "Assign Date is required" }}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <DatePicker
                          id="assignDate"
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
                          placeholder=" Assign Date"
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
              )}
            </div>
          </div>

          <div className="flex justify-between  gap-[24px] mb-5">
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>Asset Id</Tooltip>}>
                  <label htmlFor="assetName" className="text-sm font-medium">
                    Asset Id
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="assetId"
                control={control}
                defaultValue={""}
                rules={{ required: "Asset Id is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <InputPicker
                      creatable
                      size={"lg"}
                      //   data={assetId}
                      onCreate={(value, item) => {
                        console.log(value, item);
                      }}
                      onChange={(value: string | null) => field.onChange(value)}
                      style={{ width: "100%" }}
                      placeholder="Asset Id"
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

          <div className="flex justify-between  gap-[24px] mb-5">
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>Employee Name</Tooltip>}>
                  <label htmlFor="assetName" className="text-sm font-medium">
                    Employee Name
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="employeeName"
                control={control}
                defaultValue={""}
                rules={{ required: "Employee Name required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <InputPicker
                      creatable
                      size={"lg"}
                      //   data={assetCategory}
                      onCreate={(value, item) => {
                        console.log(value, item);
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

            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>Request For</Tooltip>}>
                  <label htmlFor="assetName" className="text-sm font-medium">
                    Request For
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="requestFor"
                control={control}
                defaultValue={""}
                rules={{ required: "Request For required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <InputPicker
                      creatable
                      size={"lg"}
                      //   data={assetCategory}
                      onCreate={(value, item) => {
                        console.log(value, item);
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

          <div className="flex justify-between gap-[24px] mb-5">
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper
                  speaker={
                    <Tooltip>
                      <span className="text-[11px]">Note</span>
                    </Tooltip>
                  }
                >
                  <label htmlFor="note" className="text-sm font-medium">
                    Note <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="note"
                control={control}
                rules={{
                  required: "Note is required",
                }}
                render={({ field }: any) => (
                  <div className="rs-form-control-wrapper ">
                    <Input
                      as="textarea"
                      rows={3}
                      placeholder="Write your Query in Here..."
                      style={{ width: "100%" }}
                    />
                    {/* <Input
                      {...field}
                      inputMode="numeric"
                      min={1}
                      size="lg"
                      id="assetQuantity"
                      type="number"
                      placeholder="Asset Quantity"
                      style={{ width: "100%" }}
                    /> */}
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
              loading={isLoading}
              // size="lg"
              className={`!bg-primary !hover:bg-secondary  focus:text-white hover:text-white/80 !text-white  items-center   flex px-3 py-2 text-sm rounded-md `}
            >
              Save
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AssignAssetModal;

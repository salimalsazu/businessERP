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
  Tooltip,
  Uploader,
  Whisper,
} from "rsuite";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import AssetFileUploader from "./AssetFileUploader";
import { FileType } from "rsuite/esm/Uploader";
import { useCreateAssetItemListMutation } from "@/redux/api/features/assetItemApi";
import { useEffect } from "react";
import { toast } from "sonner";

const AddAssetModalSection = ({ handleClose, open }: any) => {
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

  const assetCategory = [
    "Eugenia",
    "Bryan",
    "Linda",
    "Nancy",
    "Lloyd",
    "Alice",
    "Julia",
    "Albert",
  ].map((item) => ({
    label: item,
    value: item,
  }));

  return (
    <Modal
      overflow={false}
      backdrop="static"
      keyboard={false}
      open={open}
      onClose={handleClose}
    >
      <Modal.Header>
        <Modal.Title className="!font-bold">Add Asset</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(handleCreateStationaryList)}>
          {/* 1st section */}
          <div className="flex justify-between  gap-[24px] mb-5">
            {/* Pucrchase Date */}{" "}
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>Purchase Date</Tooltip>}>
                  <label htmlFor="purchaseDate" className="text-sm font-medium">
                    Purchase Date <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="purchaseDate"
                control={control}
                rules={{ required: "Purchase Date is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <DatePicker
                      id="purchaseDate"
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
                      placeholder=" Purchase Date"
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
                <Whisper
                  speaker={
                    <Tooltip>
                      <span className="text-[11px]">Asset Name</span>
                    </Tooltip>
                  }
                >
                  <label htmlFor="assetName" className="text-sm font-medium">
                    Asset Name <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="assetName"
                control={control}
                rules={{
                  required: "Asset Name is required",
                }}
                render={({ field }: any) => (
                  <div className="rs-form-control-wrapper ">
                    <Input
                      {...field}
                      inputMode="text"
                      size="lg"
                      id="assetName"
                      placeholder="Asset Name"
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

          <div className="flex justify-between  gap-[24px] mb-5">
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper
                  speaker={
                    <Tooltip>
                      <span className="text-[11px]">Model Name</span>
                    </Tooltip>
                  }
                >
                  <label htmlFor="assetModel" className="text-sm font-medium">
                    Model Name <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="assetModel"
                control={control}
                rules={{
                  required: "Model Name is required",
                }}
                render={({ field }: any) => (
                  <div className="rs-form-control-wrapper ">
                    <Input
                      {...field}
                      inputMode="text"
                      size="lg"
                      id="assetModel"
                      placeholder="Model Name"
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

            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>Asset Category</Tooltip>}>
                  <label htmlFor="assetName" className="text-sm font-medium">
                    Asset Category
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="assetCategory"
                control={control}
                defaultValue={""}
                rules={{ required: "Asset Category required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <InputPicker
                      creatable
                      size={"lg"}
                      data={assetCategory}
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
                <Whisper speaker={<Tooltip>Asset Location</Tooltip>}>
                  <label
                    htmlFor="stationaryItemId"
                    className="text-sm font-medium"
                  >
                    Asset Location
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="assetLocation"
                control={control}
                defaultValue={""}
                rules={{ required: "Asset Location required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <InputPicker
                      creatable
                      size={"lg"}
                      data={assetCategory}
                      onCreate={(value, item) => {
                        console.log(value, item);
                      }}
                      onChange={(value: string | null) => field.onChange(value)}
                      style={{ width: "100%" }}
                      placeholder="Asset Location"
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
                <Whisper
                  speaker={
                    <Tooltip>
                      <span className="text-[11px]">
                        Quantity greater than 0
                      </span>
                    </Tooltip>
                  }
                >
                  <label
                    htmlFor="assetQuantity"
                    className="text-sm font-medium"
                  >
                    Asset Quantity <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="assetQuantity"
                control={control}
                rules={{
                  required: "Quantity is required",
                  min: {
                    value: 1,
                    message: "Quantity must be greater than 0",
                  },
                }}
                render={({ field }: any) => (
                  <div className="rs-form-control-wrapper ">
                    <InputNumber
                      {...field}
                      inputMode="numeric"
                      min={1}
                      size="lg"
                      id="assetQuantity"
                      type="number"
                      placeholder="Asset Quantity"
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

          <div className="flex flex-col gap-3 w-full ">
            <div className="w-full ">
              <div className="my-3">
                <Whisper
                  speaker={<Tooltip>Image must be less than 5 MB</Tooltip>}
                >
                  <label htmlFor="assetImage" className="text-sm font-medium">
                    Asset Image <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="assetImage"
                control={control}
                render={({ field }: any) => (
                  <div className="rs-form-control-wrapper ">
                    <AssetFileUploader field={field} />
                    {/* <Form.ErrorMessage
                      show={
                        (!!errors?.orderFile && !!errors?.orderFile?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      {errors?.orderFile?.message}
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

export default AddAssetModalSection;

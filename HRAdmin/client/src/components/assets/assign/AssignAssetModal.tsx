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
import { useGetAssetItemListQuery } from "@/redux/api/features/assetItemApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useGetAllUsersQuery } from "@/redux/api/features/userApi";
import { useCreateAssetAssignMutation } from "@/redux/api/features/assetAssignApi";

const AssignAssetModal = ({ handleClose, open }: any) => {
  //toggle for servicing and assign

  const [assign, setAssign] = useState(true);

  const assignToggle = () => {
    setAssign(!assign);
  };

  //fetching All User

  //@ts-ignore
  const { data: allUser } = useGetAllUsersQuery(null);

  const singleUser = allUser?.data?.data?.map((user: any) => ({
    label: `${user?.profile.firstName} ${user?.profile.lastName}`,
    value: user?.userId,
  }));

  //Fetching All Asset
  //@ts-ignore
  const { data: allAsset } = useGetAssetItemListQuery(null);

  const singleAsset = allAsset?.data?.map((asset: any) => ({
    label: `${asset?.assetName} ${asset?.assetId} (Id)`,
    value: asset?.assetListId,
  }));

  //Request For

  const requestForAsset = ["Assign", "Servicing"].map((requestF) => ({
    label: requestF,
    value: requestF,
  }));

  const [creatingAsset, { isLoading }] = useCreateAssetAssignMutation();

  interface IAssetAssign {
    assignDate: Date;
    assetListId: string;
    userId: string;
    requestFor: requestFor;
    note: string;
  }
  enum requestFor {
    Assign = "Assign",
    Servicing = "Servicing",
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAssetAssign>();

  const handleCreateAssetAssign: SubmitHandler<IAssetAssign> = async (
    data: IAssetAssign
  ) => {
    const assetAssign = {
      assignDate: data.assignDate,
      assetListId: data.assetListId,
      userId: data.userId,
      requestFor: data.requestFor,
      note: data.note,
    };

    console.log(assetAssign);

    await creatingAsset(assetAssign);
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success("asset created successfully");
  //   }
  // }, [isSuccess, handleClose]);

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
        <form onSubmit={handleSubmit(handleCreateAssetAssign)}>
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
                <Whisper speaker={<Tooltip>Asset Name</Tooltip>}>
                  <label htmlFor="assetListId" className="text-sm font-medium">
                    Asset Name
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="assetListId"
                control={control}
                defaultValue={""}
                rules={{ required: "Asset Id is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <InputPicker
                      creatable={false}
                      size={"lg"}
                      data={singleAsset}
                      // onCreate={(value, item) => {
                      //   console.log(value, item);
                      // }}
                      onChange={(value: string | null) => field.onChange(value)}
                      style={{ width: "100%" }}
                      placeholder="Asset Name"
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
                  <label htmlFor="userId" className="text-sm font-medium">
                    Employee Name
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="userId"
                control={control}
                defaultValue={""}
                rules={{ required: "Employee Name required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <InputPicker
                      creatable
                      size={"lg"}
                      data={singleUser}
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
                  <label htmlFor="requestFor" className="text-sm font-medium">
                    Request For
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="requestFor"
                control={control}
                rules={{ required: "Request For required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <InputPicker
                      creatable
                      size={"lg"}
                      data={requestForAsset}
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
                      onChange={(value: string | null) => field.onChange(value)}
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

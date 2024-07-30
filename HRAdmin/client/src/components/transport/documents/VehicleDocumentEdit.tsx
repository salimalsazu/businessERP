import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  DatePicker,
  Drawer,
  Input,
  InputPicker,
  Tooltip,
  Whisper,
} from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { FileUploader } from "@/helpers/fileUploader/fileUploader";
import { useGetVehicleQuery } from "@/redux/api/features/vehicleApi";
import moment from "moment";
import { useUpdateTransportDocMutation } from "@/redux/api/features/transportDocApi";

const VehicleDocumentEdit = ({ placement, open, setOpen, rowData }: any) => {
  console.log("rowData", rowData);

  const { data: vehicle } = useGetVehicleQuery({});

  const [updateTransportDoc] = useUpdateTransportDocMutation();

  interface ITransportDoc {
    docExpiryDate?: Date;
    docName?: string;
    docNumber?: string;
    documentType?: string;
    note?: string;
    vehicleId?: string;
    docFile?: FileType | undefined;
  }

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ITransportDoc>();

  const handleEditDoc: SubmitHandler<ITransportDoc> = async (
    data: ITransportDoc
  ) => {
    const transportData = {
      docExpiryDate: data?.docExpiryDate,
      docName: data?.docName,
      docNumber: data?.docNumber,
      note: data?.note,
      vehicleId: data?.vehicleId,
    };

    console.log("transportData", transportData);

    const transportDocData = JSON.stringify(transportData);
    const formData = new FormData();
    formData.append("file", data.docFile?.blobFile as Blob);
    formData.append("data", transportDocData);

    await updateTransportDoc({
      transportDocId: rowData?.transportDocId,
      payload: formData,
    });

    await reset();
  };

  return (
    <div>
      <Drawer placement={placement} open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Document Edit</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <form onSubmit={handleSubmit(handleEditDoc)}>
            {/* 1st section */}
            <div className="flex justify-between  gap-[24px] mb-5">
              {/* Date */}{" "}
              <div className="flex flex-col gap-3 w-full ">
                <div>
                  <Whisper speaker={<Tooltip>Expire Date</Tooltip>}>
                    <label
                      htmlFor="docExpiryDate"
                      className="text-sm font-medium"
                    >
                      Expire Date <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>

                <Controller
                  name="docExpiryDate"
                  control={control}
                  defaultValue={
                    rowData?.docExpiryDate &&
                    moment(rowData.docExpiryDate).toDate()
                  }
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <DatePicker
                        id="buyerEtd"
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
                        placeholder=" Expire Date"
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
              {/* Input Field */}
              <div className="flex flex-col gap-3 w-full ">
                <div>
                  <Whisper speaker={<Tooltip>Vehicle No</Tooltip>}>
                    <label htmlFor="vehicleId" className="text-sm font-medium">
                      Vehicle No <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="vehicleId"
                  control={control}
                  defaultValue={rowData?.vehicleId}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <InputPicker
                        name="vehicleId"
                        size="lg"
                        data={vehicle?.data.map((item: any) => ({
                          label: item?.vehicleName,
                          value: item?.vehicleId,
                        }))}
                        value={field.value}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        style={{
                          width: "100%",
                        }}
                        // renderMenu={(menu) =>
                        //   renderLoading(menu, isLoadingStyleNo)
                        // }
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
              {/* Input Field */}
              <div className="flex flex-col gap-3 w-full ">
                <div>
                  <Whisper speaker={<Tooltip>Document Name</Tooltip>}>
                    <label htmlFor="docName" className="text-sm font-medium">
                      Document Name <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="docName"
                  control={control}
                  defaultValue={rowData?.docName}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        size="lg"
                        value={field.value}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        style={{
                          width: "100%",
                        }}
                        // renderMenu={(menu) =>
                        //   renderLoading(menu, isLoadingStyleNo)
                        // }
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
              {/* Input Field */}
              <div className="flex flex-col gap-3 w-full ">
                <div>
                  <Whisper speaker={<Tooltip>Document Number</Tooltip>}>
                    <label htmlFor="docNumber" className="text-sm font-medium">
                      Document Number <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="docNumber"
                  control={control}
                  defaultValue={rowData?.docNumber}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        size="lg"
                        value={field.value}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        style={{
                          width: "100%",
                        }}
                        // renderMenu={(menu) =>
                        //   renderLoading(menu, isLoadingStyleNo)
                        // }
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

            <div className="mb-5 w-full">
              {/* Input Field */}
              <div className="flex flex-col gap-3 w-full ">
                <div>
                  <Whisper speaker={<Tooltip>Note</Tooltip>}>
                    <label htmlFor="note" className="text-sm font-medium">
                      Note <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="note"
                  control={control}
                  defaultValue={rowData?.note}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        as="textarea"
                        size="lg"
                        rows={3}
                        value={field.value}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        style={{
                          width: "100%",
                        }}
                        // renderMenu={(menu) =>
                        //   renderLoading(menu, isLoadingStyleNo)
                        // }
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
              {/* Input Field */}
              <div className=" w-full ">
                <div className="my-3">
                  <Whisper
                    speaker={<Tooltip>file must be less than 5 MB</Tooltip>}
                  >
                    <label htmlFor="docFile" className="text-sm font-medium">
                      PDF File <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="docFile"
                  control={control}
                  defaultValue={rowData?.docFile}
                  render={({ field }: any) => (
                    <div className="rs-form-control-wrapper ">
                      <FileUploader field={field} />
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
                className={`!bg-primary !hover:bg-secondary  focus:text-white hover:text-white/80 !text-white  items-center flex px-3 py-2 text-sm rounded-md gap-2`}
              >
                Edit
              </Button>
            </div>
          </form>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default VehicleDocumentEdit;

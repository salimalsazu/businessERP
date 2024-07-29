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
import { FileType } from "rsuite/esm/Uploader";
import { FileUploader } from "@/helpers/fileUploader/fileUploader";
import { useAddTransportDocMutation } from "@/redux/api/features/transportDocApi";

const AddVehicleDocumentsModal = ({ handleClose, open, vehicle }: any) => {
  const [creatingTransportDoc, { isLoading }] = useAddTransportDocMutation();

  interface ITransportDoc {
    docExpiryDate: Date;
    docName: string;
    docNumber: string;
    documentType: string;
    docStatus: docStatus;
    note: string;
    vehicleId: string;
    docFile: FileType | undefined;
  }

  enum docStatus {
    Valid = "Valid",
    Expired = "Expired",
  }

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ITransportDoc>();

  const handleCreateNewOrder: SubmitHandler<ITransportDoc> = async (
    data: ITransportDoc
  ) => {
    const transportData = {
      docExpiryDate: data.docExpiryDate,
      docName: data.docName,
      docNumber: data.docNumber,
      docStatus: docStatus.Valid,
      note: data.note,
      vehicleId: data.vehicleId,
    };

    const transportDocData = JSON.stringify(transportData);
    const formData = new FormData();
    formData.append("file", data.docFile?.blobFile as Blob);
    formData.append("data", transportDocData);

    await creatingTransportDoc(formData);

    await reset();
  };

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

  return (
    <Modal
      overflow={false}
      backdrop="static"
      keyboard={false}
      open={open}
      onClose={handleClose}
    >
      <Modal.Header>
        <Modal.Title>Add Documents</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(handleCreateNewOrder)}>
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
                rules={{ required: "Date is required" }}
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
                defaultValue={""}
                rules={{ required: "Vehicle No is required" }}
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
                      onChange={(value: string | null) => field.onChange(value)}
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
                defaultValue={""}
                rules={{ required: "Document Name is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      size="lg"
                      value={field.value}
                      onChange={(value: string | null) => field.onChange(value)}
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
                defaultValue={""}
                rules={{ required: "Document Name is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      size="lg"
                      value={field.value}
                      onChange={(value: string | null) => field.onChange(value)}
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
                defaultValue={""}
                rules={{ required: "Document Type is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      as="textarea"
                      size="lg"
                      rows={3}
                      value={field.value}
                      onChange={(value: string | null) => field.onChange(value)}
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
              loading={isLoading}
              size="lg"
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

export default AddVehicleDocumentsModal;

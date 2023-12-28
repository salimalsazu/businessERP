import {
  Button,
  DatePicker,
  InputNumber,
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

const AddVehicleDocumentsModal = ({ handleClose, open }: any) => {
  interface IAddExp {
    date: Date;
    totalCost: number;
    employee: string[] | null;
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAddExp>();

  const handleCreateNewOrder: SubmitHandler<IAddExp> = async (
    data: IAddExp
  ) => {
    const orderDataObj = {
      date: data.date,
      totalCost: data.totalCost,
      employee: data.employee,
    };
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

  const VehicleNo = ["AB-102", "CD-200"].map((item) => ({
    label: item,
    value: item,
  }));

  const VehicleDoc = ["Tax Token", "Fitness"].map((item) => ({
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
                  <label htmlFor="buyerEtd" className="text-sm font-medium">
                    Expire Date <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="date"
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
                  <label htmlFor="styleNo" className="text-sm font-medium">
                    Vehicle No <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="styleNo"
                control={control}
                defaultValue={""}
                rules={{ required: "Vehicle No is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <SelectPicker
                      size="lg"
                      data={VehicleNo}
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
                <Whisper speaker={<Tooltip>Document Type</Tooltip>}>
                  <label htmlFor="styleNo" className="text-sm font-medium">
                    Document Type <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="styleNo"
                control={control}
                defaultValue={""}
                rules={{ required: "Document Type is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <SelectPicker
                      size="lg"
                      data={VehicleDoc}
                      value={field.value}
                      onChange={(value: string | null) => field.onChange(value)}
                      style={{
                        width: "80%",
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
              <Uploader
                action="//jsonplaceholder.typicode.com/posts/"
                draggable
              >
                <div
                  style={{
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span>Click or Drag files to upload PDF File</span>
                </div>
              </Uploader>
            </div>
          </div>

          <div className="flex justify-end mt-5">
            <Button
              type="submit"
              // loading={isLoading}
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
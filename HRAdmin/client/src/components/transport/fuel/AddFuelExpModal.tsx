import {
  Button,
  DatePicker,
  InputNumber,
  InputPicker,
  Modal,
  Placeholder,
  SelectPicker,
  TagPicker,
  Tooltip,
  Whisper,
} from "rsuite";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import {
  useAddVehicleMutation,
  useGetVehicleQuery,
} from "@/redux/api/features/vehicleApi";
import { useCreateFuelListMutation } from "@/redux/api/features/fuelListApi";

const AddFuelExpModal = ({ handleClose, open, VehicleNo }: any) => {
  const [createFuelList, { isLoading }] = useCreateFuelListMutation();

  interface IFuelExp {
    purchaseDate: string;
    vehicleId: string;
    kmCurrent: number;
    fuelCost: number;
    fuelQuantity: number;
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFuelExp>();

  const handleCreateFuelList: SubmitHandler<IFuelExp> = async (
    data: IFuelExp
  ) => {
    const fuelData = {
      purchaseDate: data.purchaseDate,
      vehicleId: data.vehicleId,
      kmCurrent: Number(data.kmCurrent),
      fuelCost: Number(data.fuelCost),
      fuelQuantity: Number(data.fuelQuantity),
    };

    console.log("fuelData", fuelData);

    await createFuelList(fuelData);
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

  const [addVehicle] = useAddVehicleMutation();

  const handleAddVehicle = async (data: any) => {
    await addVehicle({ vehicleName: data });
  };

  ///Vehicle No Fetching for Form
  //@ts-ignore
  const { data: vehicle } = useGetVehicleQuery(null);

  return (
    <Modal backdrop="static" keyboard={false} open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Add Fuel Expenses</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(handleCreateFuelList)}>
          {/* 1st section */}
          <div className="flex justify-between  gap-[24px] mb-5">
            {/* Date */}{" "}
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>Date</Tooltip>}>
                  <label htmlFor="purchaseDate" className="text-sm font-medium">
                    Date <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="purchaseDate"
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
                      placeholder="Purchase Date"
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
                name="vehicleId"
                control={control}
                defaultValue={""}
                rules={{ required: "Vehicle No is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <InputPicker
                      name="vehicleId"
                      creatable={true}
                      onCreate={(value) => {
                        handleAddVehicle(value);
                      }}
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
                <Whisper
                  speaker={
                    <Tooltip>
                      <span className="text-[11px]">
                        Expenses greater than 0
                      </span>
                    </Tooltip>
                  }
                >
                  <label htmlFor="currentKM" className="text-sm font-medium">
                    Current KM <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="kmCurrent"
                control={control}
                rules={{
                  required: " Current KM is required",
                  min: {
                    value: 1,
                    message: "Current KM must be greater than 0",
                  },
                }}
                render={({ field }: any) => (
                  <div className="rs-form-control-wrapper ">
                    <InputNumber
                      {...field}
                      inputMode="numeric"
                      min={1}
                      size="lg"
                      id="totalPack"
                      type="number"
                      placeholder=" Current KM"
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

            {/* Input Field */}
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper
                  speaker={
                    <Tooltip>
                      <span className="text-[11px]">
                        Expenses greater than 0
                      </span>
                    </Tooltip>
                  }
                >
                  <label htmlFor="fuelCost" className="text-sm font-medium">
                    Fuel Cost <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="fuelCost"
                control={control}
                rules={{
                  required: "Fuel Cost is required",
                  min: {
                    value: 1,
                    message: "Fuel Cost must be greater than 0",
                  },
                }}
                render={({ field }: any) => (
                  <div className="rs-form-control-wrapper ">
                    <InputNumber
                      {...field}
                      inputMode="numeric"
                      min={1}
                      size="lg"
                      id="totalPack"
                      type="number"
                      placeholder="Fuel Cost"
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

            {/* Input Field */}
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper
                  speaker={
                    <Tooltip>
                      <span className="text-[11px]">
                        Expenses greater than 0
                      </span>
                    </Tooltip>
                  }
                >
                  <label htmlFor="totalPack" className="text-sm font-medium">
                    Ltr <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="fuelQuantity"
                control={control}
                rules={{
                  required: "Ltr is required",
                  min: {
                    value: 1,
                    message: "Ltr must be greater than 0",
                  },
                }}
                render={({ field }: any) => (
                  <div className="rs-form-control-wrapper ">
                    <InputNumber
                      {...field}
                      inputMode="numeric"
                      min={1}
                      size="lg"
                      id="totalPack"
                      type="number"
                      placeholder="Ltr"
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

export default AddFuelExpModal;

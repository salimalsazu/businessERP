import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  DatePicker,
  Drawer,
  InputNumber,
  InputPicker,
  Tooltip,
  Whisper,
} from "rsuite";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { useGetVehicleQuery } from "@/redux/api/features/vehicleApi";
import moment from "moment";
import { useUpdateFuelListMutation } from "@/redux/api/features/fuelListApi";

const FuelStatusEditDrawer = ({ placement, open, setOpen, rowData }: any) => {
  //@ts-ignore
  const { data: vehicle } = useGetVehicleQuery(null);

  const [updateFuelList, { isLoading }] = useUpdateFuelListMutation();

  interface IFuelExp {
    purchaseDate?: string;
    vehicleId?: string;
    kmCurrent?: number;
    fuelCost?: number;
    fuelQuantity?: number;
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFuelExp>();

  const handleUpdateFuelList: SubmitHandler<IFuelExp> = async (
    data: IFuelExp
  ) => {
    const fuelData = {
      purchaseDate: data.purchaseDate,
      vehicleId: data.vehicleId,
      kmCurrent: Number(data.kmCurrent) || undefined,
      fuelCost: Number(data.fuelCost) || undefined,
      fuelQuantity: Number(data.fuelQuantity) || undefined,
    };

    console.log("fuelData", fuelData);

    await updateFuelList({
      payload: fuelData,
      fuelListId: rowData?.fuelListId,
    });
  };

  return (
    <div>
      <Drawer placement={placement} open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Fuel Edit</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <form onSubmit={handleSubmit(handleUpdateFuelList)}>
            {/* 1st section */}
            <div className="flex justify-between  gap-[24px] mb-5">
              {/* Date */}{" "}
              <div className="flex flex-col gap-3 w-full ">
                <div>
                  <Whisper speaker={<Tooltip>Date</Tooltip>}>
                    <label
                      htmlFor="purchaseDate"
                      className="text-sm font-medium"
                    >
                      Date <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>

                <Controller
                  name="purchaseDate"
                  control={control}
                  defaultValue={
                    rowData?.purchaseDate &&
                    moment(rowData?.purchaseDate).toDate()
                  }
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
                  defaultValue={rowData?.vehicleId || ""}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <InputPicker
                        name="vehicleId"
                        creatable={true}
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
                  render={({ field }: any) => (
                    <div className="rs-form-control-wrapper ">
                      <InputNumber
                        {...field}
                        inputMode="numeric"
                        min={1}
                        size="lg"
                        id="totalPack"
                        defaultValue={rowData?.kmCurrent}
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
                  render={({ field }: any) => (
                    <div className="rs-form-control-wrapper ">
                      <InputNumber
                        {...field}
                        inputMode="numeric"
                        min={1}
                        size="lg"
                        id="totalPack"
                        defaultValue={rowData?.fuelCost}
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
                  render={({ field }: any) => (
                    <div className="rs-form-control-wrapper ">
                      <InputNumber
                        {...field}
                        inputMode="numeric"
                        min={1}
                        size="lg"
                        id="totalPack"
                        defaultValue={rowData?.fuelQuantity}
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
                Edit
              </Button>
            </div>
          </form>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default FuelStatusEditDrawer;

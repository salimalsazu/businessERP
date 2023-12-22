import {
  Button,
  DatePicker,
  InputNumber,
  Modal,
  Placeholder,
  TagPicker,
  Tooltip,
  Whisper,
} from "rsuite";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";

const AddExpensesModal = ({ handleClose, open }: any) => {
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

  const employeeName = [
    "Eugenia",
    "Bryan",
    "Linda",
    "Nancy",
    "Lloyd",
    "Alice",
    "Julia",
    "Albert",
  ].map((item) => ({ label: item, value: item }));

  return (
    <Modal backdrop="static" keyboard={false} open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Add Food Expenses</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(handleCreateNewOrder)}>
          {/* 1st section */}
          <div className="flex justify-between  gap-[24px] mb-5">
            {/* Date */}{" "}
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>Date</Tooltip>}>
                  <label htmlFor="buyerEtd" className="text-sm font-medium">
                    Date <InfoOutlineIcon />
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
                      placeholder="Expense Date"
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
            {/* Total Pack */}
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
                    Total Cost <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="totalCost"
                control={control}
                rules={{
                  required: "Total Cost is required",
                  min: {
                    value: 1,
                    message: "Total Cost must be greater than 0",
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
                      placeholder="Food expense"
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
            {/* Date */}{" "}
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>Employee Name</Tooltip>}>
                  <label htmlFor="buyerEtd" className="text-sm font-medium">
                    Employee Name <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="employee"
                control={control}
                rules={{ required: "You have to tag One Employee" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <TagPicker
                      data={employeeName}
                      defaultValue={["Eugenia"]}
                      // disabledItemValues={["Bryan", "Linda", "Nancy"]}
                      style={{
                        width: "100%",
                      }}
                      size="lg"
                      placeholder="Tag Employee"
                      menuStyle={{ width: 300 }}
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

          <div className="flex justify-end mt-5">
            <Button
              type="submit"
              // loading={isLoading}
              size="lg"
              className={`!bg-primary !hover:bg-secondary  focus:text-white hover:text-white/80 !text-white  items-center   flex px-3 py-2 text-sm rounded-md `}
            >
              Save Expense
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddExpensesModal;

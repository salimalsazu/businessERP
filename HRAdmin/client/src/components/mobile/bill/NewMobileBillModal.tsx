import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  ButtonToolbar,
  DatePicker,
  Form,
  IconButton,
  InputNumber,
  Modal,
  SelectPicker,
  TagPicker,
  Tooltip,
  Whisper,
} from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";

const NewMobileBillModal = ({ handleClose, open }: any) => {
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

  const data = [
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
        <Modal.Title>New Mobile Bill</Modal.Title>
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
          </div>

          <div className="my-3">
            <ButtonToolbar>
              <Button appearance="link">Add more Employee</Button>
              {/* <IconButton
                icon={<PlusIcon />}
                circle
                color="blue"
                appearance="primary"
              ></IconButton> */}
            </ButtonToolbar>
          </div>

          <div className="flex justify-between  gap-[24px] mb-5">
            {/* Employee Name */}{" "}
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>Employee Name</Tooltip>}>
                  <label htmlFor="employeeName" className="text-sm font-medium">
                    Employee Name
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="employeeName"
                control={control}
                defaultValue={""}
                rules={{ required: "Employee Name is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <SelectPicker
                      size="lg"
                      data={data}
                      // value={field.value}
                      onChange={(value: string | null) => field.onChange(value)}
                      style={{
                        width: "100%",
                      }}
                      placement="leftStart"
                      placeholder="Employee Name"
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
            {/* Mobile Bill */}
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
                    Mobile Bill <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="totalCost"
                control={control}
                rules={{
                  required: "Mobile Bill is required",
                  min: {
                    value: 1,
                    message: "Mobile bill must be greater than 0",
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
                      placeholder="Mobile Bill"
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
              // loading={isLoading}
              size="lg"
              className={`!bg-primary !hover:bg-secondary  focus:text-white hover:text-white/80 !text-white  items-center   flex px-3 py-2 text-sm rounded-md `}
            >
              Save Mobile Bill
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default NewMobileBillModal;

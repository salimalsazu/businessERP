"use client";

import {
  Controller,
  SubmitHandler,
  useForm,
  useFieldArray,
} from "react-hook-form";
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Modal,
  SelectPicker,
  Tooltip,
  Whisper,
} from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";

import { useGetAllUsersQuery } from "@/redux/api/features/userApi";
import { useAddMobileBillMutation } from "@/redux/api/features/mobileBillApi";

const NewMobileBillModal = ({ handleClose, open }: any) => {
  //Data send to server

  const [addMobileBill, { isLoading: isMobileBillLoading }] =
    useAddMobileBillMutation();

  //Form handling
  const { control, handleSubmit, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "employees",
  });

  const handleAddEmployee = () => {
    append({});
  };

  const handleRemoveEmployee = (index: number) => {
    remove(index);
  };

  const handleCreateNewMobileBill: SubmitHandler<any> = async (data) => {
    const { billDate, userId, billAmount } = data;

    data.employees = data.employees.map((employee: any) => ({
      ...employee,
      billAmount: Number(employee.billAmount),
      billDate: employee.billDate || billDate,
    }));

    const currentEmployees = data.employees || [];

    const newMobileBill = {
      billDate,
      userId,
      billAmount: Number(billAmount),
    };
    currentEmployees.push(newMobileBill);
    // console.log("data", currentEmployees);

    //data send to server throw redux
    await addMobileBill(currentEmployees);

    reset();
  };

  //@ts-ignore
  const { data: allUsers } = useGetAllUsersQuery(null);

  const usersData = allUsers?.data?.data?.map((user: any) => ({
    label: `${user.profile.firstName} ${user.profile.lastName}`,
    value: user.userId,
  }));

  return (
    <Modal
      backdrop="static"
      overflow={false}
      keyboard={false}
      open={open}
      onClose={handleClose}
      size={"md"}
    >
      <Modal.Header>
        <Modal.Title>New Mobile Bill</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(handleCreateNewMobileBill)}>
          {/* 1st section */}
          <div className="flex justify-between  gap-[24px] mb-5">
            {/* Date */}
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>Billing Date</Tooltip>}>
                  <label htmlFor="billDate" className="text-sm font-medium">
                    Date <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="billDate"
                control={control}
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <DatePicker
                      id="billDate"
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
                  </div>
                )}
              />
            </div>
          </div>
          <div className="flex justify-between  gap-[24px] mb-5">
            <div className="flex flex-col gap-3 w-full ">
              {/* Employee Name */}{" "}
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
                  rules={{ required: "Employee Name is required." }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        size="lg"
                        data={usersData}
                        style={{
                          width: "100%",
                        }}
                        onChange={(value: any) => {
                          field.onChange(value);
                        }}
                        placement="auto"
                        placeholder="Employee Name"
                      />
                    </div>
                  )}
                />{" "}
              </div>
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
                  <label htmlFor="billAmount" className="text-sm font-medium">
                    Mobile Bill <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="billAmount"
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
                      onChange={(value: any) => {
                        field.onChange(value);
                      }}
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

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex justify-center items-center gap-[24px] my-5"
            >
              {/* Employee Name */}{" "}
              <div className="flex flex-col gap-3 w-full ">
                <div>
                  <Whisper speaker={<Tooltip>Employee Name</Tooltip>}>
                    <label
                      htmlFor={`userId-${index}`}
                      className="text-sm font-medium"
                    >
                      Employee Name
                      <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name={`employees[${index}].userId` as `userId.${string}`}
                  control={control}
                  defaultValue={""}
                  rules={{ required: "Employee Name is required." }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        size="lg"
                        data={usersData}
                        style={{
                          width: "100%",
                        }}
                        onChange={(value: any) => {
                          field.onChange(value);
                        }}
                        placement="auto"
                        placeholder="Employee Name"
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
                    <label
                      htmlFor={`billAmount-${index}`}
                      className="text-sm font-medium"
                    >
                      Mobile Bill <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>

                <Controller
                  name={
                    `employees[${index}].billAmount` as `billAmount.${number}`
                  }
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
                        onChange={(value: any) => {
                          field.onChange(value);
                        }}
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
              <div className="mt-8">
                <TrashIcon onClick={() => handleRemoveEmployee(index)} />
              </div>
            </div>
          ))}

          <div className="my-3">
            <button
              className="text-blue-600"
              type="button"
              onClick={handleAddEmployee}
            >
              + Add More Employee
            </button>
          </div>

          <div className="flex justify-end mt-5">
            <Button
              type="submit"
              loading={isMobileBillLoading}
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

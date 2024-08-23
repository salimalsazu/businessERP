"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Drawer, Input, Tooltip, Whisper } from "rsuite";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { useEffect } from "react";
import { toast } from "sonner";
// import { useAddSalaryMutation } from "@/redux/api/features/salaryApi"; // Assume you have this mutation

const AddSalaryForm = ({ openDrawer, setOpenDrawer }: any) => {
  interface ICreateSalary {
    salaryMonth: string;
    salaryYear: string;
    userId: string;
    absentDeduction: number;
    advanceSalaryDeduction: number;
    mealAndMobileBillDeduction: number;
  }

//   const [addSalary, { isLoading, isSuccess }] = useAddSalaryMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ICreateSalary>();

  const handleCreateSalary: SubmitHandler<ICreateSalary> = async (
    data: ICreateSalary
  ) => {
    const salaryData = {
      salaryMonth: data.salaryMonth,
      salaryYear: data.salaryYear,
      userId: data.userId,
      absentDeduction: Number(data.absentDeduction),
      advanceSalaryDeduction: Number(data.advanceSalaryDeduction),
      mealAndMobileBillDeduction: Number(data.mealAndMobileBillDeduction),
    };
    console.log("addSalary", salaryData);

    // await addSalary(salaryData);
  };

//   useEffect(() => {
//     if (isSuccess) {
//       reset();
//       setOpenDrawer(false);
//       toast.success("Salary Created Successfully");
//     }
//   }, [isSuccess, reset, setOpenDrawer]);

  return (
    <div>
      <Drawer
        backdrop={false}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Add Salary</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <form onSubmit={handleSubmit(handleCreateSalary)}>
            <div className="flex flex-col items-center gap-3 mb-5 w-full">
              <div className="flex flex-col gap-3 w-full">
                <div>
                  <Whisper speaker={<Tooltip>Salary Month</Tooltip>}>
                    <label htmlFor="salaryMonth" className="text-sm font-medium">
                      Salary Month
                      <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="salaryMonth"
                  control={control}
                  rules={{ required: "Salary Month is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        className="z-20 w-full"
                        {...field}
                        size="lg"
                        type="text"
                        placeholder="Salary Month"
                        style={{ width: "100%" }}
                      />
                    </div>
                  )}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <div>
                  <Whisper speaker={<Tooltip>Salary Year</Tooltip>}>
                    <label htmlFor="salaryYear" className="text-sm font-medium">
                      Salary Year
                      <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="salaryYear"
                  control={control}
                  rules={{ required: "Salary Year is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        className="z-20 w-full"
                        {...field}
                        size="lg"
                        type="text"
                        placeholder="Salary Year"
                        style={{ width: "100%" }}
                      />
                    </div>
                  )}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <div>
                  <Whisper speaker={<Tooltip>User ID</Tooltip>}>
                    <label htmlFor="userId" className="text-sm font-medium">
                      User ID
                      <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="userId"
                  control={control}
                  rules={{ required: "User ID is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        className="z-20 w-full"
                        {...field}
                        size="lg"
                        type="text"
                        placeholder="User ID"
                        style={{ width: "100%" }}
                      />
                    </div>
                  )}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <div>
                  <Whisper speaker={<Tooltip>Absent Deduction</Tooltip>}>
                    <label
                      htmlFor="absentDeduction"
                      className="text-sm font-medium"
                    >
                      Absent Deduction
                      <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="absentDeduction"
                  control={control}
                  rules={{ required: "Absent Deduction is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        className="z-20 w-full"
                        {...field}
                        size="lg"
                        type="number"
                        placeholder="Absent Deduction"
                        min={0}
                        style={{ width: "100%" }}
                      />
                    </div>
                  )}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <div>
                  <Whisper speaker={<Tooltip>Advance Salary Deduction</Tooltip>}>
                    <label
                      htmlFor="advanceSalaryDeduction"
                      className="text-sm font-medium"
                    >
                      Advance Salary Deduction
                      <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="advanceSalaryDeduction"
                  control={control}
                  rules={{ required: "Advance Salary Deduction is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        className="z-20 w-full"
                        {...field}
                        size="lg"
                        type="number"
                        placeholder="Advance Salary Deduction"
                        min={0}
                        style={{ width: "100%" }}
                      />
                    </div>
                  )}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <div>
                  <Whisper
                    speaker={<Tooltip>Meal and Mobile Bill Deduction</Tooltip>}
                  >
                    <label
                      htmlFor="mealAndMobileBillDeduction"
                      className="text-sm font-medium"
                    >
                      Meal and Mobile Bill Deduction
                      <InfoOutlineIcon />
                    </label>
                  </Whisper>
                </div>
                <Controller
                  name="mealAndMobileBillDeduction"
                  control={control}
                  rules={{
                    required: "Meal and Mobile Bill Deduction is required",
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        className="z-20 w-full"
                        {...field}
                        size="lg"
                        type="number"
                        placeholder="Meal and Mobile Bill Deduction"
                        min={0}
                        style={{ width: "100%" }}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end mt-5">
              {/* <Button
                type="submit"
                loading={isLoading}
                size="lg"
                className={`!bg-primary !hover:bg-secondary  focus:text-white hover:text-white/80 !text-white  items-center flex px-3 py-2 text-sm rounded-md`}
              >
                {(isLoading && "Creating") ||
                  (isSuccess && "Created") ||
                  "Create Salary"}
              </Button> */}
            </div>
          </form>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default AddSalaryForm;

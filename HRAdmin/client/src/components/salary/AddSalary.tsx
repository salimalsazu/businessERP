"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Drawer, Input, SelectPicker, Tooltip, Whisper } from "rsuite";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import { useEffect } from "react";
import { toast } from "sonner";
import { useGetAllUsersQuery } from "@/redux/api/features/userApi";
import { Label } from "recharts";
import { useAddSalaryMutation } from "@/redux/api/features/salaryApi";
import { getHeight } from "rsuite/esm/DOMHelper";
// import { useAddSalaryMutation } from "@/redux/api/features/salaryApi"; // Assume you have this mutation

const AddSalaryForm = ({ openDrawer, setOpenDrawer }: any) => {
  //@ts-ignore
  const { data: employeeData } = useGetAllUsersQuery("");

  const [addSalary, { isLoading, isSuccess, data }] = useAddSalaryMutation();

  interface ICreateSalary {
    salaryMonth: string;
    salaryYear: string;
    userId: string;
    absentDeduction: number;
    advanceSalaryDeduction: number;
    mealAndMobileBillDeduction: number;
  }

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
    await addSalary({ data: salaryData });
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setOpenDrawer(false);
      toast.success(data?.message);
    }
  }, [data?.message, isSuccess, reset, setOpenDrawer]);

  return (
    <div style={{ height: "100vh" }}>
      <Drawer
        backdrop={false}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Add Salary</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body style={{ overflow: "visible" }}>
          <form onSubmit={handleSubmit(handleCreateSalary)}>
            <div className="flex flex-col items-center gap-3 mb-5 w-full">
              <div className="flex flex-col gap-3 w-full h-full">
                <div>
                  <Whisper speaker={<Tooltip>Salary Month</Tooltip>}>
                    <label
                      htmlFor="salaryMonth"
                      className="text-sm font-medium"
                    >
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
                      <SelectPicker
                        {...field}
                        data={[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((month) => ({
                          label: month,
                          value: month,
                        }))}
                        placeholder="Select Salary Month"
                        style={{ width: "100%" }}
                        size="lg"
                        // searchable={false} // Optional: Disable search if not needed
                        block
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
                      <SelectPicker
                        {...field}
                        data={[
                          "2024",
                          "2025",
                          "2026",
                          "2027",
                          "2028",
                          "2029",
                          "2030",
                          "2031",
                          "2032",
                          "2033",
                          "2034",
                          "2035",
                          "2036",
                          "2037",
                          "2038",
                          "2039",
                          "2040",
                        ].map((year) => ({
                          label: year,
                          value: year,
                        }))}
                        placeholder="Select Salary Year"
                        style={{ width: "100%" }}
                        size="lg"
                        // searchable={false} // Optional: Disable search if not needed
                        block
                      />
                    </div>
                  )}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
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
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        className="z-20 w-full"
                        {...field}
                        size="lg"
                        data={employeeData.data?.data?.map((user: any) => ({
                          label: `${user?.profile?.firstName} ${user?.profile?.lastName}`,
                          value: user?.userId,
                        }))}
                        placeholder="Employee name"
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
                  <Whisper
                    speaker={<Tooltip>Advance Salary Deduction</Tooltip>}
                  >
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
              <Button
                type="submit"
                loading={isLoading}
                size="lg"
                className={`!bg-primary !hover:bg-secondary  focus:text-white hover:text-white/80 !text-white  items-center flex px-3 py-2 text-sm rounded-md`}
              >
                {(isLoading && "Creating") ||
                  (isSuccess && "Created") ||
                  "Create Salary"}
              </Button>
            </div>
          </form>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default AddSalaryForm;

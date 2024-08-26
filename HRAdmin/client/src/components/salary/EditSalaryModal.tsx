"use client";

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
import { useCreateAssetItemListMutation } from "@/redux/api/features/assetItemApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { salaryMonthValue, salaryYearValue } from "./SalaryUtils";
import { useUpdateSalaryMutation } from "@/redux/api/features/salaryApi";
import { useGetAllUsersQuery } from "@/redux/api/features/userApi";
import { isError } from "util";

const EditSalaryModal = ({ handleClose, open, editData }: any) => {
  //@ts-ignore
  const { data: employeeData } = useGetAllUsersQuery("");

  interface ISalaryList {
    salaryMonth: string;
    salaryYear: string;
    userId: string;
    absentDeduction: number;
    advanceSalaryDeduction: number;
    mealAndMobileBillDeduction: number;
  }

  const [editSalary, { isLoading, isSuccess, isError, data }] =
    useUpdateSalaryMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISalaryList>();

  const handleEditSalary: SubmitHandler<ISalaryList> = async (
    data: ISalaryList
  ) => {
    const salaryUpdate = {
      salaryMonth: data.salaryMonth,
      salaryYear: data.salaryYear,
      userId: data.userId,
      absentDeduction: Number(data.absentDeduction),
      advanceSalaryDeduction: Number(data.advanceSalaryDeduction),
      mealAndMobileBillDeduction: Number(data.mealAndMobileBillDeduction),
    };

    console.log("salaryUpdate", salaryUpdate);

    await editSalary({
      salaryId: editData?.salaryId,
      payload: salaryUpdate,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
    if (!isSuccess && isError && data) {
      toast.error(data?.message);
    }
  }, [isSuccess, handleClose, isError, data]);

  return (
    <Modal
      overflow={false}
      backdrop="static"
      keyboard={false}
      open={open}
      onClose={handleClose}
    >
      <Modal.Header>
        <Modal.Title className="!font-bold">Add Asset</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(handleEditSalary)}>
          <div className="flex flex-col items-center gap-3 mb-5 w-full">
            <div className="flex flex-col gap-3 w-full h-full">
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
                defaultValue={editData?.salaryMonth}
                rules={{ required: "Salary Month is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <SelectPicker
                      {...field}
                      data={salaryMonthValue.map((month) => ({
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
                defaultValue={editData?.salaryYear}
                rules={{ required: "Salary Year is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <SelectPicker
                      {...field}
                      data={salaryYearValue.map((year) => ({
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
                defaultValue={editData?.userId}
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
                defaultValue={editData?.absentDeduction}
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
                defaultValue={editData?.advanceSalaryDeduction}
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
                defaultValue={editData?.mealAndMobileBillDeduction}
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
              {(isLoading && "Updating") ||
                (isSuccess && "Updated") ||
                "Update Salary"}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditSalaryModal;

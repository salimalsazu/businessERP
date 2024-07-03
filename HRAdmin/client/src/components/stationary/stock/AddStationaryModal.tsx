"use client";

import {
  Button,
  DatePicker,
  InputNumber,
  Modal,
  Tooltip,
  Uploader,
  Whisper,
} from "rsuite";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InfoOutlineIcon from "@rsuite/icons/InfoOutline";
import CreatableSelect from "react-select/creatable";

import {
  useCreateStationaryItemMutation,
  useGetStationaryItemQuery,
} from "@/redux/api/features/stationaryItemApi";
import { useCreateStationaryItemListMutation } from "@/redux/api/features/stationaryItemListApi";

const AddStationaryModal = ({ handleClose, open }: any) => {
  interface IStationaryList {
    purchaseDate: Date;
    purchaseQuantity: number;
    stationaryItemId: string;
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IStationaryList>();

  const [stationaryItemList] = useCreateStationaryItemListMutation();

  const handleCreateItemList: SubmitHandler<IStationaryList> = async (
    data: IStationaryList
  ) => {
    const stationaryList = {
      purchaseDate: data.purchaseDate,
      purchaseQuantity: Number(data.purchaseQuantity),
      stationaryItemId: data.stationaryItemId,
    };

    // console.log(stationaryList)
    await stationaryItemList(stationaryList);
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

  // const item = ["Tissue Box", "A4 Paper"].map((item) => ({
  //   label: item,
  //   value: item,
  // }));

  // Stationary Item Data Fetching

  //@ts-ignore
  const { data } = useGetStationaryItemQuery(null);

  // Sttaionary Item Data Posting
  const [createItem] = useCreateStationaryItemMutation();

  const handleCreateItem = async (name: string) => {
    await createItem({ itemName: name });
  };

  return (
    <Modal
      overflow={false}
      backdrop="static"
      keyboard={false}
      open={open}
      onClose={handleClose}
    >
      <Modal.Header>
        <Modal.Title>Add Printing & Stationary</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(handleCreateItemList)}>
          {/* 1st section */}
          <div className="flex justify-between  gap-[24px] mb-5">
            {/* Date */}{" "}
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>Purchase Date</Tooltip>}>
                  <label htmlFor="purchaseDate" className="text-sm font-medium">
                    Purchase Date <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="purchaseDate"
                control={control}
                rules={{ required: "Purchase Date is required" }}
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
                      placeholder=" Purchase Date"
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
            <div className="flex flex-col gap-3 w-full ">
              <div>
                <Whisper speaker={<Tooltip>Item Name</Tooltip>}>
                  <label
                    htmlFor="stationaryItemId"
                    className="text-sm font-medium"
                  >
                    Item Name
                    <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>
              <Controller
                name="stationaryItemId"
                control={control}
                defaultValue={""}
                rules={{ required: "Item Name required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <CreatableSelect
                      className="z-20"
                      isClearable
                      onChange={(selectedOption) => {
                        //@ts-ignore
                        field.onChange(selectedOption?.value ?? null);
                      }}
                      onCreateOption={handleCreateItem}
                      // isSearchable={true}
                      options={data?.data?.map((item: any) => ({
                        label: item.itemName,
                        value: item.stationaryItemId,
                      }))}
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
                    htmlFor="purchaseQuantity"
                    className="text-sm font-medium"
                  >
                    Quantity <InfoOutlineIcon />
                  </label>
                </Whisper>
              </div>

              <Controller
                name="purchaseQuantity"
                control={control}
                rules={{
                  required: "Quantity is required",
                  min: {
                    value: 1,
                    message: "Quantity must be greater than 0",
                  },
                }}
                render={({ field }: any) => (
                  <div className="rs-form-control-wrapper ">
                    <InputNumber
                      {...field}
                      inputMode="numeric"
                      min={1}
                      size="lg"
                      id="purchaseQuantity"
                      type="number"
                      placeholder="Purchase Item Quantity"
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
            <button
              type="submit"
              // loading={isLoading}
              // size="lg"
              className={`!bg-primary !hover:bg-secondary  focus:text-white hover:text-white/80 !text-white  items-center   flex px-3 py-2 text-sm rounded-md `}
            >
              Save
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddStationaryModal;

{
  /* Input Field */
}
//  <div className="flex flex-col gap-3 w-full ">
//  <div>
//    <Whisper speaker={<Tooltip>Item Name</Tooltip>}>
//      <label htmlFor="styleNo" className="text-sm font-medium">
//        Item Name
//        <InfoOutlineIcon />
//      </label>
//    </Whisper>
//  </div>
//  <Controller
//    name="styleNo"
//    control={control}
//    defaultValue={""}
//    rules={{ required: "Item Name required" }}
//    render={({ field }) => (
//      <div className="rs-form-control-wrapper">
//        <SelectPicker
//          size="lg"
//          data={item}
//          value={field.value}
//          onChange={(value: string | null) => field.onChange(value)}
//          style={{
//            width: "100%",
//          }}
//          // renderMenu={(menu) =>
//          //   renderLoading(menu, isLoadingStyleNo)
//          // }
//        />
//        {/* <Form.ErrorMessage
//              show={
//                (!!errors?.styleNo && !!errors?.styleNo?.message) ||
//                false
//              }
//              placement="topEnd"
//            >
//              {errors?.styleNo?.message}
//            </Form.ErrorMessage> */}
//      </div>
//    )}
//  />{" "}
// </div>

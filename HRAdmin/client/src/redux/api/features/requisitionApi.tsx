import { baseApi } from "@/redux/api/baseApi";
// import { tagTypes } from "@/redux/tag-types";
const REQUISITION_API = "/requisition";

export const mobileBill = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRequisition: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${REQUISITION_API}`,
        method: "GET",
        params: arg,
      }),
      // providesTags: [tagTypes.requisition],
    }),
    // create Item
    addRequisition: builder.mutation({
      query: ({ data }) => ({
        url: `${REQUISITION_API}`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: [tagTypes.requisition],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        console.log("arg", JSON.stringify(arg.data));

        console.log("dispatch", dispatch);

        console.log("queryFulfilled", queryFulfilled);

        const addRequisition = dispatch(
          baseApi.util.updateQueryData(
            //@ts-ignore
            "getRequisition",
            arg.data,
            (draft: any) => [...draft, arg.data]
          )
        );

        console.log("addRequisition", addRequisition);

        try {
          await queryFulfilled;
          console.log("queryFulfilled2", queryFulfilled);
        } catch (error) {
          console.log("error", error);
          addRequisition.undo();
        }
      },
    }),

    updateRequisition: builder.mutation({
      query: ({ requisitionId, payload }) => ({
        url: `${REQUISITION_API}/${requisitionId}`,
        method: "PATCH",
        data: payload,
      }),
      // invalidatesTags: [tagTypes.requisition],
    }),
  }),
});

export const {
  useAddRequisitionMutation,
  useGetRequisitionQuery,
  useUpdateRequisitionMutation,
} = mobileBill;

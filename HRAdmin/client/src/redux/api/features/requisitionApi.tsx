import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const REQUISITION_API = "/requisition";

const mobileBill = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    addRequisition: builder.mutation({
      query: (data) => ({
        url: `${REQUISITION_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.requisition],
    }),
    getRequisition: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${REQUISITION_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.requisition],
    }),

    updateRequisition: builder.mutation({
      query: ({ requisitionId, payload }) => ({
        url: `${REQUISITION_API}/${requisitionId}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [tagTypes.requisition],
    }),
  }),
});

export const {
  useAddRequisitionMutation,
  useGetRequisitionQuery,
  useUpdateRequisitionMutation,
} = mobileBill;

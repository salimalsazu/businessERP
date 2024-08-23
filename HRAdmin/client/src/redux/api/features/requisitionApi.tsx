import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { set } from "react-hook-form";
const REQUISITION_API = "/requisition";

export const mobileBill = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRequisition: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${REQUISITION_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.requisition],
    }),
    // create Item
    addRequisition: builder.mutation({
      query: ({ data }) => ({
        url: `${REQUISITION_API}`,
        method: "POST",
        data: data,
      }),
      // invalidatesTags: [tagTypes.requisition],
      async onQueryStarted(arg, { dispatch }) {
        setTimeout(() => {
          dispatch(baseApi.util.invalidateTags([tagTypes.requisition]));
        }, 2000);
      },
    }),

    updateRequisition: builder.mutation({
      query: ({ requisitionId, payload }) => ({
        url: `${REQUISITION_API}/${requisitionId}`,
        method: "PATCH",
        data: payload,
      }),
      // invalidatesTags: [tagTypes.requisition],
      async onQueryStarted(arg, { dispatch }) {
        setTimeout(() => {
          dispatch(baseApi.util.invalidateTags([tagTypes.requisition]));
        }, 2000);
      },
    }),
  }),
});

export const {
  useAddRequisitionMutation,
  useGetRequisitionQuery,
  useUpdateRequisitionMutation,
} = mobileBill;

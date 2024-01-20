import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const MOBILE_BILL_API = "/mobileBill";

const mobileBill = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    addMobileBill: builder.mutation({
      query: (data) => ({
        url: `${MOBILE_BILL_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.mobileBill],
    }),

    getMobileBill: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${MOBILE_BILL_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.mobileBill],
    }),
  }),
});

export const { useAddMobileBillMutation, useGetMobileBillQuery } = mobileBill;

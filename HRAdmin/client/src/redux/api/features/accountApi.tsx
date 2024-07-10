import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const ACCOUNT_API = "/account";

const accountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    addAccount: builder.mutation({
      query: (data) => ({
        url: `${ACCOUNT_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.account],
    }),
    getAccount: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${ACCOUNT_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.account],
    }),
  }),
});

export const { useAddAccountMutation, useGetAccountQuery } = accountApi;

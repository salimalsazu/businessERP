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
    getAccountByName: builder.query({
      query: (arg: { accountName: string; [key: string]: any } | null) => {
        if (!arg || !arg.accountName) return { url: "/account", method: "GET" }; // Default URL if no arguments provided

        const { accountName, ...params } = arg;

        return {
          url: `/account/${accountName}`,
          method: "GET",
          params, // Optional parameters added to the request
        };
      },
      providesTags: [tagTypes.account],
    }),
  }),
});

export const {
  useAddAccountMutation,
  useGetAccountQuery,
  useGetAccountByNameQuery,
} = accountApi;

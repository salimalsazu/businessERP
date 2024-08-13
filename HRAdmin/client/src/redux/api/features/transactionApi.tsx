import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const TRANSACTION_API = "/transaction";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTransaction: builder.mutation({
      query: (data) => ({
        url: `${TRANSACTION_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.transaction, tagTypes.account],
    }),
    getTransaction: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${TRANSACTION_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.account, tagTypes.transaction],
    }),
    getTransactionById: builder.query({
      query: ({ transactionId }) => ({
        url: `${TRANSACTION_API}/${transactionId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.account, tagTypes.transaction],
    }),
  }),
});

export const {
  useAddTransactionMutation,
  useGetTransactionQuery,
  useGetTransactionByIdQuery,
} = transactionApi;

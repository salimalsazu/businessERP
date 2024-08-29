import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const GROUP_API = "/group";

const groupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    addGroup: builder.mutation({
      query: (data) => ({
        url: `${GROUP_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.account, tagTypes.subGroup, tagTypes.group],
    }),
    getGroup: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${GROUP_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.account, tagTypes.subGroup, tagTypes.group],
    }),
    getTrailBalance: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${GROUP_API}/trialBalance`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.account, tagTypes.subGroup, tagTypes.group],
    }),
  }),
});

export const { useAddGroupMutation, useGetGroupQuery, useGetTrailBalanceQuery } = groupApi;

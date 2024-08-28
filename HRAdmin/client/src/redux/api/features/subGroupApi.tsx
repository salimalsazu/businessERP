import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const SUB_GROUP_API = "/subGroup";

const subGroupAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    addSubGroup: builder.mutation({
      query: (data) => ({
        url: `${SUB_GROUP_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.account, tagTypes.subGroup, tagTypes.group],
    }),
    getSubGroup: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${SUB_GROUP_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.account, tagTypes.subGroup, tagTypes.group],
    }),
  }),
});

export const { useAddSubGroupMutation, useGetSubGroupQuery } = subGroupAPI;

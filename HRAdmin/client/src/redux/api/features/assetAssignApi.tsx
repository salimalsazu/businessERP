import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const ASSET_ASSIGN_API = "/assetAssign";

const assetAssign = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    createAssetAssign: builder.mutation({
      query: (data) => ({
        url: `${ASSET_ASSIGN_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.assign],
    }),

    getAssetAssign: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${ASSET_ASSIGN_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.assign],
    }),
  }),
});

export const { useCreateAssetAssignMutation, useGetAssetAssignQuery } =
  assetAssign;

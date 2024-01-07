import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const ASSET_ITEM_LIST_API = "/assetList";

const assetItemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    createAssetItemList: builder.mutation({
      query: (data) => ({
        url: `${ASSET_ITEM_LIST_API}`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data", /// For Image and Data must be use this
      }),
      invalidatesTags: [tagTypes.asset],
    }),

    getAssetItemList: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${ASSET_ITEM_LIST_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.asset],
    }),
  }),
});

export const { useCreateAssetItemListMutation, useGetAssetItemListQuery } =
  assetItemApi;

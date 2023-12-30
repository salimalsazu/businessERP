import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const STATIONARY_ITEM_API = "/item";

const stationaryItemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStationaryItem: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${STATIONARY_ITEM_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.item],
    }),

    // create Item
    createStationaryItem: builder.mutation({
      query: (data) => ({
        url: `${STATIONARY_ITEM_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.item],
    }),
    // update Faq
    // updateService: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `${FOOD_API}/${id}`,
    //     method: "PATCH",
    //     data: data,
    //   }),
    //   invalidatesTags: [tagTypes.service],
    // }),
    // // update Faq
    // getSingleService: builder.query({
    //   query: (id) => ({
    //     url: `${FOOD_API}/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.service],
    // }),

    // // delete Blog
    // deleteService: builder.mutation({
    //   query: (id) => ({
    //     url: `/${FOOD_API}/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.service],
    // }),
  }),
});

export const { useGetStationaryItemQuery, useCreateStationaryItemMutation } =
  stationaryItemApi;

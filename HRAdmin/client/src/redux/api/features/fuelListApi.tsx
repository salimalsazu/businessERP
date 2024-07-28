import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const FUEL_LIST_API = "/fuelList";

const fuelList = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Fuel
    createFuelList: builder.mutation({
      query: (data) => ({
        url: `${FUEL_LIST_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.fuel],
    }),

    //Get Fuel List
    getFuelList: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${FUEL_LIST_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.fuel],
    }),

    updateFuelList: builder.mutation({
      query: ({ payload, fuelListId }) => ({
        url: `${FUEL_LIST_API}/${fuelListId}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [tagTypes.fuel],
    }),
  }),
});

export const {
  useCreateFuelListMutation,
  useGetFuelListQuery,
  useUpdateFuelListMutation,
} = fuelList;

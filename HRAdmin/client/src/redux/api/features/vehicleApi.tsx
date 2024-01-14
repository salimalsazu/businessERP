import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const VEHICLE_API = "/vehicle";

const vehicleList = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Fuel
    addVehicle: builder.mutation({
      query: (data) => ({
        url: `${VEHICLE_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.fuel, tagTypes.vehicle],
    }),

    //Get Fuel List
    getVehicle: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${VEHICLE_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.fuel, tagTypes.vehicle],
    }),
  }),
});

export const { useGetVehicleQuery, useAddVehicleMutation } = vehicleList;

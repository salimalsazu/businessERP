import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const FOOD_API = "/foods";

const foodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getService: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${FOOD_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.user],
    }),

    // create Faq
    createService: builder.mutation({
      query: (data) => ({
        url: `${FOOD_API}/create-service`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    // update Faq
    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `${FOOD_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    // update Faq
    getSingleService: builder.query({
      query: (id) => ({
        url: `${FOOD_API}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    // delete Blog
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/${FOOD_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetSingleServiceQuery,
} = foodApi;

import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const SERVICE_API = "/services";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getService: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${SERVICE_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.service],
    }),

    // create Faq
    createService: builder.mutation({
      query: (data) => ({
        url: `${SERVICE_API}/create-service`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.service],
    }),
    // update Faq
    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `${SERVICE_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.service],
    }),
    // update Faq
    getSingleService: builder.query({
      query: (id) => ({
        url: `${SERVICE_API}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),

    // delete Blog
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/${SERVICE_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],
    }),
  }),
});

export const {
  useGetServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetSingleServiceQuery,
} = serviceApi;

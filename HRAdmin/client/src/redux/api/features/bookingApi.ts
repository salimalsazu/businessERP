import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const BOOKING_API = "/appointment-booking";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooking: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${BOOKING_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.booking],
    }),
    getMyBooking: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${BOOKING_API}/my-booking`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.booking],
    }),

    // create Faq
    createBooking: builder.mutation({
      query: (data) => ({
        url: `${BOOKING_API}/add-booking`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    // update Faq
    updateBooking: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BOOKING_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    // delete Blog
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/${BOOKING_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useGetBookingQuery,
  useGetMyBookingQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;

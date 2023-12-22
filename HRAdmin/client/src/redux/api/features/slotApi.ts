import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const SLOT_API = "/slots";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSlot: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${SLOT_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.slot],
    }),

    // create Faq
    createSlot: builder.mutation({
      query: (data) => ({
        url: `${SLOT_API}/create-slot`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.slot],
    }),
    // update Faq
    updateSlot: builder.mutation({
      query: ({ id, data }) => ({
        url: `${SLOT_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.slot],
    }),

    // delete Blog
    deleteSlot: builder.mutation({
      query: (id) => ({
        url: `/${SLOT_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.slot],
    }),
  }),
});

export const {
  useGetSlotQuery,
  useCreateSlotMutation,
  useUpdateSlotMutation,
  useDeleteSlotMutation,
} = slotApi;

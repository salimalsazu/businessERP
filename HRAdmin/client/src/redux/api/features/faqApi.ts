import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const FAQ_API = "/faqs";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query({
      query: () => ({
        url: `${FAQ_API}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq],
    }),

    // create Faq
    createFaq: builder.mutation({
      query: (data) => ({
        url: `/faqs/create-faq`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    // update Faq
    updateFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faqs/update/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    // delete Faq
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faqs/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const {
  useGetFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;

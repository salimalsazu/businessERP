import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const FEEDBACK_API = "/feedbacks";

const feedBackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedBacks: builder.query({
      query: () => ({
        url: `${FEEDBACK_API}`,
        method: "GET",
      }),
      providesTags: [tagTypes.feedback],
    }),

    // create Faq
    createFeedBack: builder.mutation({
      query: (data) => ({
        url: `${FEEDBACK_API}/add-feedback`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
    // update Faq
    updateFeedback: builder.mutation({
      query: ({ id, data }) => ({
        url: `${FEEDBACK_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),

    // delete Blog
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `/${FEEDBACK_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
  }),
});

export const {
  useGetFeedBacksQuery,
  useCreateFeedBackMutation,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedBackApi;

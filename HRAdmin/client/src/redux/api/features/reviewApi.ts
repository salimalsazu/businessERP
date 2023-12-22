import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const REVIEWS_API = "/review-ratings";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => ({
        url: `${REVIEWS_API}/`,
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),
    getMyReviews: builder.query({
      query: () => ({
        url: `${REVIEWS_API}/my-reviews`,
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),

    // create Review
    createReview: builder.mutation({
      query: (data) => ({
        url: `${REVIEWS_API}/add-review`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.review, tagTypes.service],
    }),
    // update Review
    updateReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `${REVIEWS_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.review],
    }),

    // delete Review
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/${REVIEWS_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetMyReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = blogApi;

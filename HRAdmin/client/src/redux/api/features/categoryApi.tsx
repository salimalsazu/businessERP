import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const CATEGORY_API = "/categories";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: `${CATEGORY_API}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_API}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    // update Category
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `${CATEGORY_API}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    // delete Category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/${CATEGORY_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = blogApi;

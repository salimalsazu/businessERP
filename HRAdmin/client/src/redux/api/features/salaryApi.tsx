import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const SALARY_API = "/salary";

export const salaryList = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalary: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${SALARY_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.salary],
    }),
    // create Item
    addSalary: builder.mutation({
      query: ({ data }) => ({
        url: `${SALARY_API}`,
        method: "POST",
        data: data,
      }),
      // invalidatesTags: [tagTypes.requisition],
      async onQueryStarted(arg, { dispatch }) {
        setTimeout(() => {
          dispatch(baseApi.util.invalidateTags([tagTypes.salary]));
        }, 2000);
      },
    }),

    updateSalary: builder.mutation({
      query: ({ salaryId, payload }) => ({
        url: `${SALARY_API}/${salaryId}`,
        method: "PATCH",
        data: payload,
      }),
      // invalidatesTags: [tagTypes.requisition],
      async onQueryStarted(arg, { dispatch }) {
        setTimeout(() => {
          dispatch(baseApi.util.invalidateTags([tagTypes.salary]));
        }, 2000);
      },
    }),
  }),
});

export const {
  useGetSalaryQuery,
  useAddSalaryMutation,
  useUpdateSalaryMutation,
} = salaryList;

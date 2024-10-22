import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const DASHBOARD_API = "/dashboard";

export const dashboardAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCount: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${DASHBOARD_API}/count`,
        method: "GET",
        params: arg,
      }),
      providesTags: [
        tagTypes.dashboard,
        tagTypes.account,
        tagTypes.requisition,
        tagTypes.transaction,
      ],
    }),

    getDailyTransactionCount: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${DASHBOARD_API}/daily-transaction`,
        method: "GET",
        params: arg,
      }),
      providesTags: [
        tagTypes.dashboard,
        tagTypes.transaction,
        tagTypes.account,
        tagTypes.group,
      ],
    }),
  }),
});

export const { useGetAllCountQuery, useGetDailyTransactionCountQuery } =
  dashboardAPI;

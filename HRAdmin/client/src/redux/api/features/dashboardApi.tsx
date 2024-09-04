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
  }),
});

export const { useGetAllCountQuery } = dashboardAPI;

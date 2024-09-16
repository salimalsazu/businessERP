import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const LOG_API = "/logs";

const logApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLogs: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${LOG_API}/successes`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.log],
    }),
  }),
});

export const { useGetLogsQuery } = logApi;

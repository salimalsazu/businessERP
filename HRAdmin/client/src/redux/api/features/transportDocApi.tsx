import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
const TRANSPORT_DOC_API = "/transportDoc";

const transportDoc = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create Item
    addTransportDoc: builder.mutation({
      query: (data) => ({
        url: `${TRANSPORT_DOC_API}`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data", /// For Image and Data must be use this
      }),
      invalidatesTags: [tagTypes.doc],
    }),

    getTransportDoc: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${TRANSPORT_DOC_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.doc],
    }),

    updateTransportDoc: builder.mutation({
      query: ({ transportDocId, payload }) => ({
        url: `${TRANSPORT_DOC_API}/${transportDocId}`,
        method: "PATCH",
        data: payload,
        contentType: "multipart/form-data", /// For Image and Data must be use this
      }),
      invalidatesTags: [tagTypes.doc],
    }),
  }),
});

export const {
  useAddTransportDocMutation,
  useGetTransportDocQuery,
  useUpdateTransportDocMutation,
} = transportDoc;

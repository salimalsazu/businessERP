import { baseApi } from "./api/baseApi";
// import { cartSlice } from "./features/slice/cart/cartSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
};

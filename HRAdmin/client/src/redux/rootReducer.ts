import { baseApi } from "./api/baseApi";
import { employeeFiledSlice } from "./slice/addEmployeeFieldSlice";
// import { cartSlice } from "./features/slice/cart/cartSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  field: employeeFiledSlice.reducer,
};

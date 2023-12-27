import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  employeeField: [],
};
export const employeeFiledSlice = createSlice({
  name: "field",
  initialState,
  reducers: {
    addToField: (state: any, action: any) => {
      state.employeeField = [...state.employeeField, action.payload];
    },
    // removeFromField: (state: any, action: any) => {
    //   const deleteField = state.employeeField.filter((f: any) => {
    //     return f.fieldId !== action.payload.fieldId;
    //   });
    //   return {
    //     ...state,
    //     employeeField: deleteField,
    //   };
    // }

    removeFromField: (state, action) => {
      state.employeeField = state.employeeField.filter(
        (emp: any) => emp.fieldId != action.payload
      );
    },
  },
});

export const { addToField, removeFromField } = employeeFiledSlice.actions;

export default employeeFiledSlice.reducer;

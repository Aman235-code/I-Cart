import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "Products",
  initialState: {
    products: [],
  },
  reducers: {
    // actions
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;

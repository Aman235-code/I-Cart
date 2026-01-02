import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "Products",
  initialState: {
    products: [],
    cart: [],
    addresses: [],
    selectedAdress: null,
  },
  reducers: {
    // actions
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addAddress: (state, action) => {
      if (!state.addresses) state.addresses = [];
      state.addresses.push(action.payload);
    },
    setSelectedAddress: (state, action) => {
      state.selectedAdress = action.payload;
    },
    deleteAddresses: (state, action) => {
      state.addresses = state.addresses.filter(
        (_, index) => index !== action.payload
      );
      if (state.selectedAdress === action.payload) {
        state.selectedAdress = null;
      }
    },
  },
});

export const {
  setProducts,
  setCart,
  addAddress,
  setSelectedAddress,
  deleteAddresses,
} = productSlice.actions;
export default productSlice.reducer;

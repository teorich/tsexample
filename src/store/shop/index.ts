import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: any = {
  currentShop: null,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    registerShop: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.currentShop = action.payload;
    },
    removeShop: (state, action) => {
      state.currentShop = null;
    },
    clearShop: state => {
      state.currentShop = null;
    },
  },
});
export const {registerShop, removeShop, clearShop} = shopSlice.actions;
export default shopSlice.reducer;

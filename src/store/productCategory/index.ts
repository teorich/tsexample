import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface category {
  id?: string;
  name?: string;
  parent_key?: string;
  description?: string;
}

interface Istate {
  categories: Array<category>;
}

const initialState: Istate = {
  categories: [],
};

const productCategorySlice = createSlice({
  name: 'productCategory',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.categories = [...state.categories, action.payload];
      console.log(state);
    },
    removeCategory: (state, action) => {
      console.log(state);
    },
    clearCategory: state => {
      state.categories = [];
    },
  },
});
export const {addCategory, removeCategory, clearCategory} =
  productCategorySlice.actions;
export default productCategorySlice.reducer;

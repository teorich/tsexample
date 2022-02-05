import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: any = {
  currentAgency: null,
};

const agencySlice = createSlice({
  name: 'agency',
  initialState,
  reducers: {
    registerAgency: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.currentAgency = action.payload;
      console.log(state);
    },
    removeAgency: (state, action) => {
      state.currentAgency = null;
    },
    clearAgency: state => {
      state.currentAgency = null;
    },
  },
});
export const {registerAgency, removeAgency, clearAgency} = agencySlice.actions;
export default agencySlice.reducer;

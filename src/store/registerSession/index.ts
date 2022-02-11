import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: any = {
  currentRegisterSession: null,
};

const registerSessionSlice = createSlice({
  name: 'agency',
  initialState,
  reducers: {
    setRegisterSession: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.currentRegisterSession = action.payload;
    },
    removeRegisterSession: (state, action) => {
      state.currentRegisterSession = null;
    },
    clearRegisterSession: state => {
      state.currentRegisterSession = null;
    },
  },
});
export const {setRegisterSession, clearRegisterSession, removeRegisterSession} =
  registerSessionSlice.actions;
export default registerSessionSlice.reducer;

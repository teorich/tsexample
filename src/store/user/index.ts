import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: any = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.currentUser = action.payload;
      console.log(state);
    },
    removeUser: (state, action) => {
      state.currentUser = null;
    },
    clearUser: state => {
      state.currentUser = null;
    },
  },
});
export const {registerUser, removeUser, clearUser} = userSlice.actions;
export default userSlice.reducer;

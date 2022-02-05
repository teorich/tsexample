import {combineReducers} from '@reduxjs/toolkit';
import productCategorySlice from './productCategory';
import userSlice from './user';
import shopSlice from './shop';
import agencySlice from './agency';

const rootReducer = combineReducers({
  category: productCategorySlice,
  user: userSlice,
  shop: shopSlice,
  agency: agencySlice,
});

export default rootReducer;

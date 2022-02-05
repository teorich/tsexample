import React from 'react';

import {combineComponents} from './CombineComponents';
import {UsersProvider} from '../../providers/UserProvider';
import {ProductsProvider} from '../../providers/ProductProvider';
import {ShopsProvider} from '../../providers/ShopProvider';
import {AgencyProvider} from '../../providers/AgencyProvider';
import {RegisterSessionProvider} from '../../providers/RegisterSession.provider';
import {OrderProvider} from '../../providers/OrderProvider';
import {TopBarMenuProvider} from '../../providers/TopBarMenuProvider';

const providers = [
  UsersProvider,
  ProductsProvider,
  ShopsProvider,
  AgencyProvider,
  RegisterSessionProvider,
  OrderProvider,
  TopBarMenuProvider,
];
export const AppContextProvider = combineComponents(...providers);

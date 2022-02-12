import Realm, {AppConfiguration, ConfigurationWithSync} from 'realm';
// import {BookSchema} from '../schemas';

import User from './src/models/User.model';
import Products from './src/models/Product.model';
import Shop from './src/models/Shop.model';
import Agency from './src/models/Agency.model';

import {appId, baseUrl} from './realm.json';
import RegisterSessions from './src/models/RegisterSession.model';
import Order from './src/models/Order.model';

if (!appId) {
  throw 'Missing Realm App ID. Set appId in realm.json';
}
if (!baseUrl) {
  throw 'Missing Realm base URL. Set baseUrl in realm.json';
}

const appConfiguration: AppConfiguration = {
  id: appId,
  baseUrl,
};

export const realmApp = new Realm.App(appConfiguration);

// can implement inBuilt JWT, Google, Facebook, Apple Authentication Flow.
// const credentials = Realm.Credentials.anonymous(); // LoggingIn as Anonymous User.

const getRealmSchemas = [
  User.schema,
  User.AddressModel,
  User.GeoPointModel,
  User.PersonModel,
  User.PhoneNumberModel,
  User.UserShopModel,
  Products.schema,
  Products.ProductAttributeModel,
  Products.ProductPriceModel,
  Products.ImageModel,
  Shop.ProductCategoryModel,
  Shop.schema,
  Agency.schema,
  Agency.StationModel,
  RegisterSessions.schema,
  RegisterSessions.NoteModel,
  Order.BankCardModel,
  Order.OrderDetailModel,
  Order.PaymentInstrumentModel,
  Order.RegisterModel,
  Order.TransactionModel,
  Order.schema,
]; // add multiple schemas, comma seperated.

export default getRealmSchemas;

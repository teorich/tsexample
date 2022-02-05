import Realm from 'realm';
// import User from './User.model';

class Shop extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  _partition!: string;
  name!: string;
  url!: string;
  registration_number!: string;
  business!: Array<any>;
  product_categories!: Array<any>;
  payment_accounts!: Array<any>;
  agencies!: Array<any>;
  patners!: Array<any>;
  subscription_plan!: Array<any>;
  products!: Array<any>;
  employees!: Realm.List<Realm.BSON.ObjectId>;
  registers!: Array<any>;
  trial_start_at!: Date;
  last_paid_at!: Date;
  created_at!: Date;
  updated_at!: Date;

  static generate(data: any): any {
    return {
      _id: new Realm.BSON.ObjectId(),
      ...data,
      created_at: new Date(),
    };
  }

  static ProductCategoryModel: Realm.ObjectSchema = {
    name: 'productCategories',
    embedded: true, // default: false
    properties: {
      id: 'objectId?',
      name: 'string?',
      parent_key: 'string?',
      description: 'string?',
    },
  };

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  public static schema: Realm.ObjectSchema = {
    name: 'Shop',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      url: 'string',
      registration_number: 'string?',
      business: 'string[]',
      employees: 'objectId[]',
      product_categories: 'productCategories[]',
      address: 'Address',
      registers: 'Register[]',
      payment_accounts: 'string[]',
      agencies: 'Agency[]',
      patners: 'string[]',
      subscription_plan: 'string[]',
      trial_start_at: 'date?',
      last_paid_at: 'date?',
      frozen_at: 'date?',
      products: 'Products[]',
      created_at: 'date?',
      updated_at: 'date?',
    },
  };
}

export default Shop;

import Realm from 'realm';
// import User from './User.model';

class Agency extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  _partition!: string;
  name!: string;
  state!: string;
  type!: string;
  is_active!: string;
  open_at!: Date;
  description!: string;
  phone_number!: Array<any>;
  address!: string;
  banner!: string;
  employees!: Array<any>;
  registers!: Array<any>;
  register_sessions!: Array<any>;
  product_categories!: Array<any>;
  customers!: Array<any>;
  paymentAccount!: Array<any>;
  stations!: Array<any>;
  agents!: Array<any>;
  created_at!: Date;
  updated_at!: Date;

  static generate(data: any): any {
    return {
      _id: new Realm.BSON.ObjectId(),
      ...data,
      created_at: new Date(),
    };
  }

  public static StationModel: Realm.ObjectSchema = {
    name: 'Station',
    embedded: true, // default: false
    properties: {
      _id: 'objectId',
      name: 'string',
      code: 'string',
      capacity: 'int',
      metadata: 'mixed?',
      shape: 'string',
      stage: 'string',
      created_at: 'date',
      updated_at: 'date',
      x: 'double',
      y: 'double',
    },
  };

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  public static schema: Realm.ObjectSchema = {
    name: 'Agency',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string?',
      state: 'string?',
      type: 'string?',
      is_active: 'bool?',
      open_at: 'date?',
      close_at: 'date?',
      phone_number: 'PhoneNumber[]',
      description: 'string?',
      banner: 'string?',
      address: 'Address',
      employees: {
        type: 'linkingObjects',
        objectType: 'User',
        property: 'agencies',
      },
      register_sessions: 'RegisterSessions[]',
      registers: 'Register[]',
      product_categories: 'productCategories[]',
      customers: 'Person[]',
      paymentAccount: 'string[]',
      created_at: 'date',
      update_at: 'date?',
      stations: 'Station[]',
      agents: 'Person[]',
      shopId: {
        type: 'linkingObjects',
        objectType: 'Shop',
        property: 'agencies',
      },
    },
  };
}

export default Agency;

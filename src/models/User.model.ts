// import {IUser} from 'interfaces/user.interface';
import Realm from 'realm';

class User extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  email!: string;
  _partition!: string;
  person!: any;
  shop!: any;
  user_id!: any;
  phone_number!: any;
  isVerified!: Boolean;
  taxe_payer_number!: string;
  created_at!: Date;
  updated_at!: Date;

  static generate(data: any) {
    return {
      _id: new Realm.BSON.ObjectId(),
      ...data,
      person: this.generatePerson(data.person),
      created_at: new Date(),
    };
  }

  static generatePerson(data: any) {
    return {
      user_id: new Realm.BSON.ObjectId(),
      ...data,
    };
  }

  static PersonModel: Realm.ObjectSchema = {
    name: 'Person',
    embedded: true, // default: false
    properties: {
      user_id: 'objectId?',
      first_name: 'string?',
      middle_name: 'string?',
      last_name: 'string?',
      birth_date: 'date?',
      address: 'Address?',
      phone_number: 'PhoneNumber?',
    },
  };

  static PhoneNumberModel: Realm.ObjectSchema = {
    name: 'PhoneNumber',
    embedded: true, // default: false
    properties: {
      number: 'string?',
      mno: 'string?',
      is_momo: 'bool?',
      is_verified: 'bool?',
    },
  };

  public static AddressModel: Realm.ObjectSchema = {
    name: 'Address',
    embedded: true, // default: false
    properties: {
      country: 'string?',
      town: 'string?',
      three_words: 'string?',
      near_by: 'string?',
      position: 'GeoPoint?',
    },
  };

  public static GeoPointModel: Realm.ObjectSchema = {
    name: 'GeoPoint',
    embedded: true, // default: false
    properties: {
      lat: 'float?',
      long: 'float?',
    },
  };

  static UserShopModel: Realm.ObjectSchema = {
    name: 'UserShops',
    embedded: true, // default: false
    properties: {
      shop_id: 'objectId?',
      role: 'string?',
      status: 'string?',
    },
  };

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema: Realm.ObjectSchema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      email: 'string?',
      register_sessions: 'RegisterSessions[]',
      agencies: 'Agency[]',
      person: {type: 'object', objectType: 'Person'},
      shop: 'UserShops[]',
      user_id: 'string',
      phone_number: 'PhoneNumber?',
      isVerified: 'bool?',
      taxe_payer_number: 'string?',
      created_at: 'date?',
      updated_at: 'date?',
    },
  };
}

export default User;

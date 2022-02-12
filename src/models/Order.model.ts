import Realm from 'realm';
// import User from './User.model';

class Order extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  _partition!: string;
  recipient!: string;
  register!: string;
  order_number!: string;
  status!: string;
  customer!: string;
  details!: Array<string>;
  transaction!: any;
  type!: string;
  profit!: number;
  amount!: number;
  taxe!: number;
  created_at!: Date;
  updated_at!: Date;

  static generate(data: any): any {
    return {
      _id: new Realm.BSON.ObjectId(),
      ...data,
      created_at: new Date(),
    };
  }

  public static OrderDetailModel: Realm.ObjectSchema = {
    name: 'OrderDetail',
    embedded: true, // default: false
    properties: {
      type: 'string?',
      amount: 'double?',
      discount: 'double?',
      profit: 'double?',
      metadata: 'mixed?',
      quantity: 'double?',
    },
  };

  public static RegisterModel: Realm.ObjectSchema = {
    name: 'Register',
    embedded: true, // default: false
    properties: {
      name: 'string?',
      key: 'objectId?',
    },
  };

  public static PaymentInstrumentModel: Realm.ObjectSchema = {
    name: 'PaymentInstrument',
    embedded: true, // default: false
    properties: {
      type: 'string',
      phone_number: 'PhoneNumber',
      is_default: 'bool',
      bank_card: 'BankCard',
    },
  };

  public static BankCardModel: Realm.ObjectSchema = {
    name: 'BankCard',
    embedded: true, // default: false
    properties: {
      number: 'string',
      expired_at: 'date',
      code: 'string',
    },
  };

  public static TransactionModel: Realm.ObjectSchema = {
    name: 'Transaction',
    embedded: true, // default: false
    properties: {
      _id: 'objectId',
      type: 'string',
      status: 'string',
      payment_instrument: 'PaymentInstrument',
      metadata: 'mixed?',
      created_at: 'date',
      updated_at: 'date',
      note: 'string',
      end_at: 'date',
    },
  };

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  public static schema: Realm.ObjectSchema = {
    name: 'Order',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      recipient: 'string',
      register: 'Register',
      order_number: 'string',
      status: 'string',
      customer: 'Person?',
      details: 'OrderDetail[]',
      transaction: 'Transaction?',
      type: 'string',
      profit: 'double',
      amount: 'double',
      taxe: 'double',
      station: 'Station?',
      metadata: 'mixed?',
      created_at: 'date',
      update_at: 'date?',
    },
  };
}

export default Order;

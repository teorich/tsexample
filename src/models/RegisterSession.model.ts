import Realm from 'realm';
// import User from './User.model';

class RegisterSessions extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  _partition!: string;
  name!: string;

  created_at!: Date;
  updated_at!: Date;

  static generate(data: any): any {
    return {
      _id: new Realm.BSON.ObjectId(),
      ...data,
      created_at: new Date(),
    };
  }

  public static NoteModel: Realm.ObjectSchema = {
    name: 'Note',
    embedded: true, // default: false
    properties: {
      title: 'string',
      description: 'string',
      status: 'string',
    },
  };

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  public static schema: Realm.ObjectSchema = {
    name: 'RegisterSessions',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      register: 'Register',
      status: 'string',
      opening_cash: 'double',
      closing_cash: 'double?',
      notes: 'Note[]',
      created_at: 'date',
      updated_at: 'date?',
      started_at: 'date',
      closed_at: 'date?',
      transaction: 'string[]',
      agenciesId: {
        type: 'linkingObjects',
        objectType: 'Agency',
        property: 'register_sessions',
      },
      usersId: {
        type: 'linkingObjects',
        objectType: 'User',
        property: 'register_sessions',
      },
    },
  };
}

export default RegisterSessions;

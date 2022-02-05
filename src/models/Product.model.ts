import Realm from 'realm';
// import User from './User.model';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
class Products extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  _partition!: string;
  name!: string;
  description!: string;
  sku!: string;
  tags!: Array<any>;
  shopId!: string;
  asserts!: Array<any>;
  variants!: Array<any>;
  attributes!: Array<any>;
  product_categories!: Array<any>;
  prices!: Array<any>;
  is_inventory_tracked!: Boolean;
  is_life!: Boolean;
  created_at!: Date;
  updated_at!: Date;

  static generate(data: any): any {
    return {
      _id: new Realm.BSON.ObjectId(),
      ...data,
      created_at: new Date(),
    };
  }

  public static ProductAttributeModel: Realm.ObjectSchema = {
    name: 'ProductAttribute',
    embedded: true, // default: false
    properties: {
      type: 'string?',
      name: 'string?',
    },
  };

  public static ProductPriceModel: Realm.ObjectSchema = {
    name: 'ProductPrice',
    embedded: true, // default: false
    properties: {
      unit: 'string?',
      portion: 'string?',
      purchased_price: 'double?',
      is_active: 'bool?',
      min_price: 'double?',
      desired_price: 'double?',
    },
  };

  public static ImageModel: Realm.ObjectSchema = {
    name: 'Image',
    embedded: true, // default: false
    properties: {
      shop_id: 'objectId?',
      role: 'string?',
      status: 'string?',
    },
  };

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  public static schema: Realm.ObjectSchema = {
    name: 'Products',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string?',
      tags: 'string[]',
      status: 'string[]',
      asserts: 'Image[]',
      description: 'string?',
      variants: 'string[]',
      sku: 'string?',
      is_inventory_tracked: 'bool?',
      attributes: 'ProductAttribute[]',
      prices: 'ProductPrice[]',
      product_categories: 'productCategories[]',
      is_life: 'bool?',
      agenciesId: {
        type: 'linkingObjects',
        objectType: 'Shop',
        property: 'products',
      },
      shopId: {
        type: 'linkingObjects',
        objectType: 'Shop',
        property: 'products',
      },
      created_at: 'date?',
      updated_at: 'date?',
    },
  };
}

export default Products;

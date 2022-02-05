import {IPerson} from './person.interface';

export interface IUser {
  person: IPerson;
  agencies?: any;
  shops?: any;
  email?: string;
  phone_number?: any;
  tax_payer_number?: string;
  security_questions?: any;
  confirmations?: any;
}

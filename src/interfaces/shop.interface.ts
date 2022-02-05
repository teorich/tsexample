export interface IShop {
  name?: string;
  url?: string;
  business: any;
  registration_number?: string;
  address: any;
  registers: any;
  employees?: any;
  payment_accounts?: any;
  agencies?: any;
  product_categories?: any;
  subscription_plan?: any;
  partners?: any;
  last_paid_at?: Date;
  frozen_at?: Date;
  trial_start_at?: Date;
}

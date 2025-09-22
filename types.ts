
export enum ChargeType {
  SOLAR = 'طاقة شمسية',
  DIESEL = 'مولد ديزل',
}

export interface Transaction {
  id: string;
  chargeType: ChargeType;
  amountDue: number;
  amountPaid: number;
  notes: string;
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  transactions: Transaction[];
}

export interface Prices {
  solar: number;
  diesel: number;
}

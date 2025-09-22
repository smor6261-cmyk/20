
import React, { useMemo } from 'react';
import { Customer, ChargeType } from '../types';

interface CustomerTableProps {
  customers: Customer[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {

  const customerData = useMemo(() => {
    return customers.map(customer => {
      const totalSolarDue = customer.transactions
        .filter(t => t.chargeType === ChargeType.SOLAR)
        .reduce((sum, t) => sum + t.amountDue, 0);
      
      const totalDieselDue = customer.transactions
        .filter(t => t.chargeType === ChargeType.DIESEL)
        .reduce((sum, t) => sum + t.amountDue, 0);

      const totalPaid = customer.transactions.reduce((sum, t) => sum + t.amountPaid, 0);
      const totalDue = totalSolarDue + totalDieselDue;
      const remaining = totalDue - totalPaid;

      return {
        ...customer,
        totalSolarDue,
        totalDieselDue,
        totalDue,
        totalPaid,
        remaining,
      };
    }).sort((a, b) => a.name.localeCompare(b.name, 'ar'));
  }, [customers]);
  
  if (customerData.length === 0) {
    return <p className="text-center text-slate-500 py-8">لا يوجد بيانات لعرضها. يرجى إضافة عملية جديدة.</p>;
  }


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">اسم الزبون</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">مستحق الطاقة الشمسية</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">مستحق مولد الديزل</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">إجمالي المستحق</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">المدفوع</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">المتبقي</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {customerData.map((customer, index) => (
            <tr key={customer.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-teal-50 transition-colors`}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{customer.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{customer.totalSolarDue.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{customer.totalDieselDue.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-800">{customer.totalDue.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{customer.totalPaid.toFixed(2)}</td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${customer.remaining > 0 ? 'text-red-600' : 'text-slate-600'}`}>
                {customer.remaining.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;

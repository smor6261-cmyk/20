
import React, { useMemo } from 'react';
import { Customer, ChargeType } from '../types';

interface SummaryProps {
  customers: Customer[];
}

const Summary: React.FC<SummaryProps> = ({ customers }) => {
  const totals = useMemo(() => {
    let totalSolarDue = 0;
    let totalDieselDue = 0;
    let totalPaid = 0;

    customers.forEach(customer => {
      customer.transactions.forEach(t => {
        if (t.chargeType === ChargeType.SOLAR) {
          totalSolarDue += t.amountDue;
        } else {
          totalDieselDue += t.amountDue;
        }
        totalPaid += t.amountPaid;
      });
    });
    
    const grandTotalDue = totalSolarDue + totalDieselDue;
    const grandTotalRemaining = grandTotalDue - totalPaid;

    return {
      totalSolarDue,
      totalDieselDue,
      grandTotalDue,
      totalPaid,
      grandTotalRemaining,
    };
  }, [customers]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-center">
      <div className="bg-slate-100 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-slate-500">إجمالي مستحقات الطاقة الشمسية</h4>
        <p className="text-2xl font-bold text-slate-800">{totals.totalSolarDue.toFixed(2)}</p>
      </div>
      <div className="bg-slate-100 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-slate-500">إجمالي مستحقات مولد الديزل</h4>
        <p className="text-2xl font-bold text-slate-800">{totals.totalDieselDue.toFixed(2)}</p>
      </div>
       <div className="bg-blue-100 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-600">إجمالي كل المستحقات</h4>
        <p className="text-2xl font-bold text-blue-800">{totals.grandTotalDue.toFixed(2)}</p>
      </div>
      <div className="bg-green-100 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-green-600">إجمالي المبالغ المدفوعة</h4>
        <p className="text-2xl font-bold text-green-800">{totals.totalPaid.toFixed(2)}</p>
      </div>
      <div className="bg-red-100 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-red-600">إجمالي المبالغ المتبقية</h4>
        <p className="text-2xl font-bold text-red-800">{totals.grandTotalRemaining.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Summary;

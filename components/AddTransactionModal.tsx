
import React, { useState } from 'react';
import { ChargeType } from '../types';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (data: {
    customerName: string;
    chargeType: ChargeType;
    amountPaid: number;
    notes: string;
  }) => void;
  customerNames: string[];
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onAddTransaction, customerNames }) => {
  const [customerName, setCustomerName] = useState('');
  const [chargeType, setChargeType] = useState<ChargeType>(ChargeType.DIESEL);
  const [amountPaid, setAmountPaid] = useState(0);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
        alert('يرجى إدخال اسم الزبون.');
        return;
    }
    onAddTransaction({ customerName: customerName.trim(), chargeType, amountPaid, notes });
    // Reset form
    setCustomerName('');
    setChargeType(ChargeType.DIESEL);
    setAmountPaid(0);
    setNotes('');
  };

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md m-4 transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">إضافة عملية جديدة</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-slate-700 mb-1">اسم الزبون</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              list="customer-list"
              className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              required
            />
            <datalist id="customer-list">
              {customerNames.map(name => <option key={name} value={name} />)}
            </datalist>
             <p className="text-xs text-slate-500 mt-1">يمكنك الاختيار من القائمة أو كتابة اسم زبون جديد.</p>
          </div>
          
          <div>
              <span className="block text-sm font-medium text-slate-700 mb-2">نوع التعبئة</span>
              <div className="flex gap-4">
                  <label className="flex items-center gap-2 p-3 border border-slate-300 rounded-md flex-1 has-[:checked]:bg-teal-50 has-[:checked]:border-teal-500 transition cursor-pointer">
                      <input type="radio" name="chargeType" value={ChargeType.DIESEL} checked={chargeType === ChargeType.DIESEL} onChange={() => setChargeType(ChargeType.DIESEL)} className="form-radio text-teal-600 focus:ring-teal-500" />
                      {ChargeType.DIESEL}
                  </label>
                  <label className="flex items-center gap-2 p-3 border border-slate-300 rounded-md flex-1 has-[:checked]:bg-teal-50 has-[:checked]:border-teal-500 transition cursor-pointer">
                      <input type="radio" name="chargeType" value={ChargeType.SOLAR} checked={chargeType === ChargeType.SOLAR} onChange={() => setChargeType(ChargeType.SOLAR)} className="form-radio text-teal-600 focus:ring-teal-500" />
                      {ChargeType.SOLAR}
                  </label>
              </div>
          </div>

          <div>
            <label htmlFor="amountPaid" className="block text-sm font-medium text-slate-700 mb-1">المبلغ المدفوع</label>
            <input
              type="number"
              id="amountPaid"
              value={amountPaid}
              onChange={(e) => setAmountPaid(Number(e.target.value))}
              className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              min="0"
            />
          </div>
          
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1">ملاحظات (اختياري)</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-5 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 transition">إلغاء</button>
            <button type="submit" className="py-2 px-5 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition shadow">إضافة العملية</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;

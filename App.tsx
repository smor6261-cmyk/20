
import React, { useState, useMemo, useCallback } from 'react';
import { Customer, Prices, Transaction, ChargeType } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomerTable from './components/CustomerTable';
import Summary from './components/Summary';
import PriceEditor from './components/PriceEditor';
import AddTransactionModal from './components/AddTransactionModal';
import { PlusIcon } from './components/icons';

// Initial mock data
const initialCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'عبدالله الأحمد',
    transactions: [
      { id: 'txn-1', chargeType: ChargeType.DIESEL, amountDue: 50, amountPaid: 50, notes: 'فاتورة شهر يناير', date: new Date().toISOString() },
      { id: 'txn-2', chargeType: ChargeType.SOLAR, amountDue: 30, amountPaid: 20, notes: 'شحن إضافي', date: new Date().toISOString() },
    ],
  },
  {
    id: 'cust-2',
    name: 'فاطمة الزهراء',
    transactions: [
      { id: 'txn-3', chargeType: ChargeType.DIESEL, amountDue: 50, amountPaid: 0, notes: 'فاتورة فبراير', date: new Date().toISOString() },
    ],
  },
    {
    id: 'cust-3',
    name: 'محمد الصالح',
    transactions: [
      { id: 'txn-4', chargeType: ChargeType.SOLAR, amountDue: 30, amountPaid: 30, notes: '', date: new Date().toISOString() },
    ],
  },
];


const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [prices, setPrices] = useState<Prices>({ solar: 30, diesel: 50 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customerNames = useMemo(() => customers.map(c => c.name), [customers]);

  const handleUpdatePrices = useCallback((newPrices: Prices) => {
    setPrices(newPrices);
  }, []);

  const handleAddTransaction = useCallback((data: { customerName: string; chargeType: ChargeType; amountPaid: number; notes: string; }) => {
    setCustomers(prevCustomers => {
      const existingCustomer = prevCustomers.find(c => c.name === data.customerName);
      
      const newTransaction: Transaction = {
        id: `txn-${Date.now()}`,
        chargeType: data.chargeType,
        amountDue: data.chargeType === ChargeType.SOLAR ? prices.solar : prices.diesel,
        amountPaid: data.amountPaid,
        notes: data.notes,
        date: new Date().toISOString(),
      };

      if (existingCustomer) {
        return prevCustomers.map(c => 
          c.id === existingCustomer.id 
            ? { ...c, transactions: [...c.transactions, newTransaction] }
            : c
        );
      } else {
        const newCustomer: Customer = {
          id: `cust-${Date.now()}`,
          name: data.customerName,
          transactions: [newTransaction],
        };
        return [...prevCustomers, newCustomer];
      }
    });
    setIsModalOpen(false);
  }, [prices.solar, prices.diesel]);


  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-md border border-slate-200">
                  <PriceEditor prices={prices} onUpdatePrices={handleUpdatePrices} />
              </div>
              <div className="md:col-span-2 flex justify-start md:justify-end">
                  <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-2 bg-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-teal-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75"
                  >
                      <PlusIcon />
                      إضافة عملية جديدة
                  </button>
              </div>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-700 mb-4 border-b pb-3">كشف حسابات الزبائن</h2>
            <CustomerTable customers={customers} />
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
             <h2 className="text-2xl font-bold text-slate-700 mb-4 border-b pb-3">الإجمالي العام</h2>
            <Summary customers={customers} />
          </div>
        </div>
      </main>
      <Footer />
      {isModalOpen && (
        <AddTransactionModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddTransaction={handleAddTransaction}
          customerNames={customerNames}
        />
      )}
    </div>
  );
};

export default App;

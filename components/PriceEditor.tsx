
import React, { useState, useEffect } from 'react';
import { Prices } from '../types';

interface PriceEditorProps {
  prices: Prices;
  onUpdatePrices: (newPrices: Prices) => void;
}

const PriceEditor: React.FC<PriceEditorProps> = ({ prices, onUpdatePrices }) => {
  const [currentPrices, setCurrentPrices] = useState<Prices>(prices);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setCurrentPrices(prices);
  }, [prices]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentPrices(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleSave = () => {
    onUpdatePrices(currentPrices);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setCurrentPrices(prices);
    setIsEditing(false);
  };


  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-700">أسعار التعبئة الحالية</h3>
      <div className="space-y-3">
        <div>
          <label htmlFor="diesel" className="block text-sm font-medium text-slate-600 mb-1">
            سعر تعبئة مولد الديزل
          </label>
          <input
            type="number"
            id="diesel"
            name="diesel"
            value={currentPrices.diesel}
            onChange={handlePriceChange}
            disabled={!isEditing}
            className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
        </div>
        <div>
          <label htmlFor="solar" className="block text-sm font-medium text-slate-600 mb-1">
            سعر تعبئة الطاقة الشمسية
          </label>
          <input
            type="number"
            id="solar"
            name="solar"
            value={currentPrices.solar}
            onChange={handlePriceChange}
            disabled={!isEditing}
            className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition">
              حفظ
            </button>
            <button onClick={handleCancel} className="flex-1 bg-slate-500 text-white py-2 px-4 rounded-md hover:bg-slate-600 transition">
              إلغاء
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="w-full bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-md hover:bg-slate-300 transition">
            تعديل الأسعار
          </button>
        )}
      </div>
    </div>
  );
};

export default PriceEditor;

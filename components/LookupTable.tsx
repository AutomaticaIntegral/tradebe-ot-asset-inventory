import React, { useState } from 'react';
import { LookupItem } from '../types';

interface LookupTableProps {
  title: string;
  items: LookupItem[];
  onAdd: (value: string) => void;
  onDelete: (id: string) => void;
}

const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>;

const LookupTable: React.FC<LookupTableProps> = ({ title, items, onAdd, onDelete }) => {
  const [newItemValue, setNewItemValue] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemValue.trim()) {
      onAdd(newItemValue.trim());
      setNewItemValue('');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 flex flex-col">
      <h3 className="text-lg font-bold text-white p-4 border-b border-gray-700">{title}</h3>
      <div className="p-4 space-y-4 flex-grow">
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            type="text"
            value={newItemValue}
            onChange={(e) => setNewItemValue(e.target.value)}
            placeholder={`Nuevo ${title}...`}
            className="flex-grow bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          />
          <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Agregar</button>
        </form>
        <div className="max-h-64 overflow-y-auto pr-2">
            <ul className="space-y-2">
              {items.map(item => (
                <li key={item.id} className="flex justify-between items-center bg-gray-700/50 p-2 rounded-md">
                  <span className="text-gray-300">{item.value}</span>
                  <button onClick={() => onDelete(item.id)} className="text-red-400 hover:text-red-300">
                    <DeleteIcon />
                  </button>
                </li>
              ))}
              {items.length === 0 && (
                <p className="text-center text-gray-500 py-4">Sin elementos aún.</p>
              )}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default LookupTable;
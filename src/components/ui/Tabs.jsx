import React from 'react';

export const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-2 mb-4">
      <button
        onClick={() => onTabChange(8)}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          activeTab === 8
            ? 'bg-[#0088cc] text-white shadow-lg'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        8% APY
      </button>
      <button
        onClick={() => onTabChange(10)}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          activeTab === 10
            ? 'bg-[#0088cc] text-white shadow-lg'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        10% APY
      </button>
    </div>
  );
}; 
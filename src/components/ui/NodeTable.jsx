import React, { useState } from "react";
import { Tabs } from './Tabs';

export const NodeTable = ({ xdcPrice,activeTab }) => {
  const nodeNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

  const [totalXDC, setTotalXDC]=useState(0)
  const calculateRewards = (nodes, apy, XDC_PER_NODE=10_000_000) => {
    const totalXdc = nodes * XDC_PER_NODE;
    const yearlyRewardsXdc = totalXdc * (apy / 100);
    const monthlyRewardsXdc = yearlyRewardsXdc / 12;

    return {
      totalXdc,
      yearlyRewardsXdc,
      monthlyRewardsXdc,
      yearlyRewardsUsd: yearlyRewardsXdc * xdcPrice,
      monthlyRewardsUsd: monthlyRewardsXdc * xdcPrice,
    };
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value * xdcPrice);
  };

  const tableHeaders = {
    8: ['#', 'Total XDC', 'Yearly (XDC)', 'Yearly (USD)', 'Monthly (XDC)', 'Monthly (USD)'],
    10: ['#', 'Total XDC', 'Yearly (XDC)', 'Yearly (USD)', 'Monthly (XDC)', 'Monthly (USD)'],
  };

  const rewards = calculateRewards(1, activeTab, totalXDC);

  return (
    <div className="w-full max-w-6xl">
      <div className="overflow-x-auto rounded-lg border border-gray-700 bg-gray-800 shadow-xl">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              {tableHeaders[activeTab].map((header, index) => (
                <th
                  key={index}
                  className={`px-6 py-4 text-left text-sm font-semibold text-gray-200 ${
                    index === 0 ? 'sticky left-0 bg-gray-700 z-10' : ''
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            <tr className="hover:bg-gray-700/50 transition-colors duration-200">
              <td className="sticky left-0 bg-gray-800 z-10"></td>
              <td className="px-6 py-4 text-sm text-gray-200">
                <input
                  type="text"
                  value={totalXDC.toLocaleString()}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '');
                    if (!isNaN(value) || value === '') {
                      setTotalXDC(Number(value) || 0);
                    }
                  }}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter total XDC"
                />
              </td>
              <td className="px-6 py-4 text-sm text-gray-200">
                {rewards.yearlyRewardsXdc.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-200">
                {formatCurrency(rewards.yearlyRewardsXdc)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-200">
                {rewards.monthlyRewardsXdc.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-200">
                {formatCurrency(rewards.monthlyRewardsXdc)}
              </td>
            </tr>
            {nodeNumbers.map((nodes) => {
              const rewards = calculateRewards(nodes, activeTab);
              return (
                <tr
                  key={nodes}
                  className="hover:bg-gray-700/50 transition-colors duration-200"
                >
                  <td className="sticky left-0 bg-gray-800 z-10 px-6 py-4 text-sm text-gray-200">
                    {nodes}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-200">
                    {rewards.totalXdc.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-200">
                    {rewards.yearlyRewardsXdc.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-200">
                    {formatCurrency(rewards.yearlyRewardsXdc)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-200">
                    {rewards.monthlyRewardsXdc.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-200">
                    {formatCurrency(rewards.monthlyRewardsXdc)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

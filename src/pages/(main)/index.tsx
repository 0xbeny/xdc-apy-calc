import React, { useEffect, useState } from "react";
import { NodeTable } from "../../components/ui/NodeTable";
import { Tabs } from "../../components/ui/Tabs";
import { Navbar } from "../../components/ui/Navbar";

export const Component = () => {
  const [numNodes, setNumNodes] = useState(0);
  const [xdcPrice, setXdcPrice] = useState(0);
  const [activeTab, setActiveTab] = useState(8);
  const [isLoading, setIsLoading] = useState(true);

  const XDC_PER_NODE = 10_000_000;
  const totalXdc8 = numNodes * XDC_PER_NODE * 0.08;
  const totalXdc10 = numNodes * XDC_PER_NODE * 0.1;
  const annualUsd8 = totalXdc8 * xdcPrice;
  const monthlyUsd8 = annualUsd8 / 12;
  const annualUsd10 = totalXdc10 * xdcPrice;
  const monthlyUsd10 = annualUsd10 / 12;

  useEffect(() => {
    const fetchXdcPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=xdce-crowd-sale&vs_currencies=usd'
        );
        const data = await response.json();
        setXdcPrice(data['xdce-crowd-sale'].usd);
      } catch (error) {
        console.error('Error fetching XDC price:', error);
        setXdcPrice(0.061); // Fallback price
      } finally {
        setIsLoading(false);
      }
    };

    fetchXdcPrice();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col">
          <div className="flex gap-1 mb-4">
            <div>
              <label className="block mb-1 font-medium text-gray-200">XDC Price (USD)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <img 
                    src="https://xinfin.org/assets/images/ecosystem-dapps/xdctradenetwork-icon_light.svg" 
                    alt="XDC Logo" 
                    className="h-5 w-5 bg-white rounded"
                  />
                </div>
                <input
                  type="number"
                  className="border border-gray-700 rounded p-2 pl-10 w-48 bg-gray-800 text-white"
                  value={xdcPrice}
                  onChange={(e) => setXdcPrice(Number(e.target.value))}
                />
              </div>
              {!isLoading && (
                <div className="text-gray-400 text-sm">
                  <a 
                    href="https://www.coingecko.com/en/coins/xdc-network" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    From CoinGecko
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-6xl">
            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
            <NodeTable xdcPrice={xdcPrice} activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

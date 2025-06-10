import React, { useEffect, useState } from "react";

import { NodeTable} from "../../components/ui/NodeTable"
import { Tabs } from "../../components/ui/Tabs"

export const Component = () => {
  const [numNodes, setNumNodes] = useState(0);
  const [xdcPrice, setXdcPrice] = useState(0);
  const [activeTab, setActiveTab] = useState(8);

  const XDC_PER_NODE = 10_000_000;
  const totalXdc8 = numNodes * XDC_PER_NODE * 0.08;
  const totalXdc10 = numNodes * XDC_PER_NODE * 0.1;
  const annualUsd8 = totalXdc8 * xdcPrice;
  const monthlyUsd8 = annualUsd8 / 12;
  const annualUsd10 = totalXdc10 * xdcPrice;
  const monthlyUsd10 = annualUsd10 / 12;

  const [isLoading, setIsLoading] = useState(true);

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
    <div className="min-h-screen bg-black-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">XDC Master Node APY Calculator</h1>

      <div className="flex gap-1 mb-4">
        {/* <div>
          <label className="block mb-1 font-medium">Number of Master Nodes</label>
          <input
            type="number"
            className="border rounded p-2 w-48"
            value={numNodes}
            onChange={(e) => setNumNodes(Number(e.target.value))}
          />
        </div> */}
        <div>
          <label className="block mb-1 font-medium">XDC Price (USD)</label>
          <input
            type="number"
            className="border rounded p-2 w-48"
            value={xdcPrice}
            onChange={(e) => setXdcPrice(Number(e.target.value))}
          />
       
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
     <NodeTable xdcPrice={xdcPrice}activeTab={activeTab} />
     </div>
    </div>
  );
}

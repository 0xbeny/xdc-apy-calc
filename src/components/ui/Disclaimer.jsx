import React from 'react';

export const Disclaimer = () => {
  return (
    <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <p className="text-sm text-gray-400 text-center">
        ⚠️ Disclaimer: These calculations are estimates and for informational purposes only. 
        XDC Network does not guarantee fixed APY rates. Actual returns may vary based on network conditions, 
        validator performance, and other factors.
      </p>
    </div>
  );
}; 
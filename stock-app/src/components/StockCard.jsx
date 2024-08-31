import React from "react";

const StockCard = ({ companyName, ticker, price }) => {
  return (
    <div className="text-center font-arial  p-4">
      <h2 className="text-xl font-bold">{companyName}</h2>
      <p className="text-gray-500">{ticker}</p>
      <p className="text-lg">${price}</p>
    </div>
  );
};

export default StockCard;

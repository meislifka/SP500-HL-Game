import React from "react";
import Picker from "./Picker.jsx"

const StockCard = ({ companyName, ticker, price, isRightSide }) => {

  return (
    <div className="text-center font-arial m-4 p-4 border-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold">{companyName}</h2>
      <p className="text-gray-500">{ticker}</p>
      {isRightSide ? null : <p className="text-lg">${price}</p>}

      {isRightSide && <Picker />} 


    </div>
  );
};

export default StockCard;
import React from "react";
import pic1 from "../assets/images/apple.png";

const StockCard = ({ companyName, ticker, logo }) => {
  return (
    <div className="text-center font-arial m-4 p-4 border-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold">{companyName}</h2>
      <img className="mx-auto" src={pic1} width="50" height="50" alt={`${companyName} logo`} />
      <p className="text-gray-500">{ticker}</p>
    </div>
  );
};

export default StockCard;

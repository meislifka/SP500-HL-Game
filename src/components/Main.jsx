import React from "react";
import StockCard from './StockCard.jsx';
import Picker from "./Picker.jsx";


const Main = () => {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 m-6 border-solid border-8 border-[#dcad13] rounded-md p-4">
      <StockCard companyName="Apple Inc." ticker="AAPL" price="150.00" />
      <Picker />
      <StockCard companyName="Apple Inc." ticker="AAPL" price="150.00" />
    </div>
    </>
  )
};

export default Main;
import {React, useState} from "react";
import StockCard from './StockCard.jsx';
import Picker from "./Picker.jsx";
import InstructionsOverlay from "./InstructionsOverlay.jsx"
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

const Main = () => {
  const [open, setOpen] = useState(false);

  const handleToggleInfo = () => {
    setOpen(true);
  };

  return (
    <>
      <IconButton aria-label="delete" onClick={handleToggleInfo}>
        <InfoIcon  />
      </IconButton>

      
      {open && <InstructionsOverlay open={open} setOpen={setOpen} />}

<div className="grid grid-cols-1 md:grid-cols-3 m-6 border-solid border-8 border-[#dcad13] rounded-md p-4">
          <StockCard companyName="Apple Inc." ticker="AAPL" price="150.00" />
          <Picker />
          <StockCard companyName="Apple Inc." ticker="AAPL" price="150.00" />
        </div>
    </>
  );
};

export default Main;

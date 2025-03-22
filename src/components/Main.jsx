import { React, useState } from "react";
import StockCard from './StockCard.jsx';
import InstructionsOverlay from "./InstructionsOverlay.jsx"
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import Tooltip from '@mui/material/Tooltip';

const Main = () => {
  const [open, setOpen] = useState(false);
  const [overlayType, setOverlayType] = useState();

  // Update the handleToggleInfo function to accept overlayType
  const handleToggleInfo = (type) => {
    setOpen(true);
    setOverlayType(type);
  };

  const lSide = ["Apple Inc", "AAPL", "microsoft"];
  const rSide = ["Microsoft Corp", "MSFT", "apple"];

  return (
    <>
      <Tooltip title="Info">
        <IconButton aria-label="info" onClick={() => handleToggleInfo("info")}>
          <InfoIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Stats">
        <IconButton aria-label="stats" onClick={() => handleToggleInfo("stat")}>
          <SignalCellularAltIcon />
        </IconButton>
      </Tooltip>

      {open && <InstructionsOverlay open={open} setOpen={setOpen} overlayType={overlayType} />}

      <div className="grid grid-cols-1 md:grid-cols-2 m-6 border-solid border-8 border-[#dcad13] rounded-md p-4">
        <StockCard companyName={lSide[0]} ticker={lSide[1]}/>
        <StockCard companyName={rSide[0]} ticker={rSide[1]}/>
      </div>
    </>
  );
};

export default Main;

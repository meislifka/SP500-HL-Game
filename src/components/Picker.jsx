import React from "react";
import IconButton from '@mui/material/IconButton';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import ShowChartIcon from '@mui/icons-material/ShowChart';
const Picker = ({ props }) => {
  return (
    <div className="text-center font-arial  p-4 border-2">
      <Tooltip title="Higher">
       <IconButton >
        <ShowChartIcon sx={{ fontSize: 80, color:"green" }} />
      </IconButton>
      </Tooltip>
      <div></div>
      <Tooltip title="Lower">
      <IconButton>
        <ShowChartIcon sx={{ fontSize: 80, color:"red",  transform: "scaleX(-1)" }} />
      </IconButton>
      </Tooltip>
    </div>
  );
};

export default Picker;
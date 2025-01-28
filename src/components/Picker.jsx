import React from "react";
import IconButton from '@mui/material/IconButton';
import ArrowUpIcon from '@mui/icons-material/ArrowDropUpSharp';
import ArrowDownIcon from '@mui/icons-material/ArrowDropDownSharp';
const Picker = ({ props }) => {
  return (
    <div className="text-center font-arial  p-4 border-2">
       <IconButton >
        <ArrowUpIcon sx={{ fontSize: 80, color:"green" }} />
      </IconButton>
      <IconButton>
        <ArrowDownIcon sx={{ fontSize: 80, color:"red" }} />
      </IconButton>
    </div>
  );
};

export default Picker;
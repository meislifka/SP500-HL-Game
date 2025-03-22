import React from "react";
import IconButton from '@mui/material/IconButton';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import ForwardIcon from '@mui/icons-material/Forward';
const Picker = ({ props }) => {
  return (
    <div className="text-center ">
      <Tooltip title="Higher">
       <IconButton >
       <ForwardIcon className="text-green-500 w-20 h-20 rotate-[270deg]" />      </IconButton>
      </Tooltip>

      <Tooltip title="Higher">
      <IconButton>
      <ForwardIcon className="text-red-500 w-20 h-20 rotate-90 " />      </IconButton>
      </Tooltip>

    </div>
  );
};

export default Picker;
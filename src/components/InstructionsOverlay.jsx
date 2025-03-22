import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const InstructionsOverlay = ({ open, setOpen, overlayType }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const renderContent = () => {
    if (overlayType === "info") {
      return (
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Goal: Guess if the stock on the left is higher or lower than the stock on the right using the buttons
        
        <div>
          You are given a stock on the left and your job is to determine if it's price is greater or less than the price of the stock on the right.

        </div>
        </DialogContentText>
      </DialogContent>
      );
    } else if (overlayType === "stat") {
      return (
        <DialogContent>
          <div>
            Max Streak
            Games played
          </div>
        </DialogContent>
      );
    } else {
      return null;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{overlayType === "info" ? "Information" : "Player Stats"}</DialogTitle>
      {renderContent()}
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InstructionsOverlay;

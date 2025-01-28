import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const InstructionsOverlay = ({ open, setOpen }) => {
  const handleClose = () => {
    console.log("CLOSED");
    setOpen(false); // Callback to parent to set `open` to false
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      
      <DialogTitle id="alert-dialog-title">
        {"How To Play"}
        <DialogActions>
        <Button onClick={handleClose}>
          <CloseIcon />
        </Button>
      </DialogActions>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Goal: Guess if the stock on the left is higher or lower than the stock on the right using the buttons
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default InstructionsOverlay;

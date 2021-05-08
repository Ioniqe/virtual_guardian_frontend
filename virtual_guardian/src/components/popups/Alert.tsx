import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSignUpStyles } from '../../styles/SignUp';

interface AlertDialogProps{
  open: boolean,
  setOpen: (open: boolean) => void,
  dialogTitle: string,
  dialogContentText: string,
  negativeMessage: string,
  positiveMessage: string,
  setAction: () => void,
}

export default function AlertDialog({ open, setOpen, dialogTitle, dialogContentText, negativeMessage, positiveMessage, setAction }: AlertDialogProps) {
  const classes = useSignUpStyles();

  const handleClose = () => {
    setOpen(false);
  };

  let handleAction = () => {
    setAction();
    setOpen(false);
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.textField}>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className={classes.textField}>
            { dialogContentText }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            { negativeMessage }
          </Button>
          <Button onClick={handleAction} color="primary" autoFocus>
            { positiveMessage }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
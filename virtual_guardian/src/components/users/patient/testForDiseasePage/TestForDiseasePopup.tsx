import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import InfoIcon from '@material-ui/icons/Info';
import { Icon } from '@material-ui/core';
import { useStylesPatientTestForDisease } from '../../../../styles/PatientStyle';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface TestForDiseasePopupProps {
  open: boolean,
  setOpen: (open: boolean) => void,

}

export default function TestForDiseasePopup({ open, setOpen }: TestForDiseasePopupProps) {

  let style = useStylesPatientTestForDisease();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    < >
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className={style.popupStyle}
      >
        <DialogTitle id="alert-dialog-slide-title">
          <Icon
            component={InfoIcon}
            className={style.dialogTitleStyle}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" className={style.dialogContentTextStyle}>
            You can use this test to determine if something might be wrong,
            however keep in mind that the test is not 100% accurate.
            We recommend talking to your doctor if you feel like something is wrong.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary' style={{ marginRight: '12vw' }}>
            I understand
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
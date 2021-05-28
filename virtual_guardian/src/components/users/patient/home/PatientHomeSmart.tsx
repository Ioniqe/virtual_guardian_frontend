import { CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { sendEmergency } from "../../../../actions/PatientAction";
import { User } from "../../../../model/models";
import PatientHomeDumb from "./PatientHomeDumb";

interface PatientHomeSmartProps {
  loggedUser: User,

  sendEmergencyEvent: (patientId: string) => void,
  patientReducer: {
    loading: boolean,
    error: string,
    sendEmergencySuccessful: boolean,
  },
}

function PatientHomeSmart({ loggedUser, sendEmergencyEvent, patientReducer }: PatientHomeSmartProps) {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  let handleEmergencyEvent = (): void => {
    sendEmergencyEvent(loggedUser.id);
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  useEffect(() => {
    if (patientReducer.loading) {
      setLoading(true);
    } else if (patientReducer.error) {
      setMessage(patientReducer.error);
      setLoading(false);
      setOpenError(true);
      setOpenSuccess(false);
    } else if (patientReducer.sendEmergencySuccessful) {
      setLoading(false);
      setOpenError(false);
      setMessage('Your doctor and caregiver have been notified of the emergency!');
      setOpenSuccess(true);
    }
  }, [patientReducer.loading, patientReducer.error, patientReducer.sendEmergencySuccessful]);

  return (
    <>
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success"> {message} </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"> {message} </Alert>
      </Snackbar>

      <PatientHomeDumb
        loggedUser={loggedUser}
        handleEmergencyEvent={handleEmergencyEvent}
      />

      {loading && <CircularProgress style={{color: 'white'}}/>}
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    patientReducer: state.patient, //from rootReducer
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    sendEmergencyEvent: (patientId: string) => dispatch(sendEmergency(patientId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientHomeSmart);

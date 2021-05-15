import { CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deletePatients, getPatientsList, savePatient, updatePatient } from "../../../../actions/PatientAction";
import { User } from "../../../../model/models";
import PatientsPageDumb from "./PatientsPageDumb";

interface PatientsPageProps {
  loggedUser: User,

  getAllPatientsList: (doctorId: string) => void,
  deleteSelectedPatients: (patientsToBeDeleted: string[]) => void,
  saveNewPatient: (newPatient: User, doctorId: string) => void,
  saveEditedPatient: (editedPatient: User) => void,
  patientReducer: {
    loading: boolean,
    patientsSuccess: User[],
    error: string,
    deleteSuccessful: boolean,
    saveSuccessful: boolean,
    updateSuccessful: boolean,
  },
}

//TODO see patient's diseases
//TODO assign caregiver
//TODO edit patient

function PatientsPageSmart({ loggedUser, patientReducer, getAllPatientsList, deleteSelectedPatients, saveNewPatient, saveEditedPatient }: PatientsPageProps) {

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [patientList, setPatientList] = useState<User[]>([]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  useEffect(() => {
    getAllPatientsList(loggedUser.id);
  }, [getAllPatientsList, loggedUser.id]);

  useEffect(() => {
    if (patientReducer.loading) {
      setLoading(true);
    }
    else if (patientReducer.error !== '') {
      setMessage(patientReducer.error);
      setLoading(false);
      setOpenError(true);
    }
    else if (patientReducer.patientsSuccess) {
      setLoading(false);
      setPatientList(patientReducer.patientsSuccess);
    }
  }, [patientReducer.error, patientReducer.loading, patientReducer.patientsSuccess]);

  useEffect(() => {
    if (patientReducer.deleteSuccessful) {
      getAllPatientsList(loggedUser.id);
      setMessage('Deleted successfully!');
      setOpenSuccess(true);
    }
  }, [patientReducer.deleteSuccessful, getAllPatientsList, loggedUser.id]);

  useEffect(() => {
    if (patientReducer.saveSuccessful) {
      getAllPatientsList(loggedUser.id);
      setMessage('Saved successfully!');
      setOpenSuccess(true);
    }
  }, [patientReducer.saveSuccessful, getAllPatientsList, loggedUser.id]);

  useEffect(() => {
    if (patientReducer.updateSuccessful) {
      getAllPatientsList(loggedUser.id);
      setMessage('Updated successfully!');
      setOpenSuccess(true);
    }
  }, [patientReducer.updateSuccessful, getAllPatientsList, loggedUser.id]);

  return (
    <>
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success"> { message } </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"> {message} </Alert>
      </Snackbar>

      <PatientsPageDumb
        patientList={patientList}
        deleteSelected={deleteSelectedPatients}
        savePatient={saveNewPatient}
        doctorId={loggedUser.id}
        saveEditedPatient={ saveEditedPatient }
      />

      {loading && <CircularProgress />}
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
    getAllPatientsList: (doctorId: string) => dispatch(getPatientsList(doctorId)),
    deleteSelectedPatients: (patientsToBeDeleted: string[]) => dispatch(deletePatients(patientsToBeDeleted)),
    saveNewPatient: (newPatient: User, doctorId: string) => dispatch(savePatient(newPatient, doctorId)),
    saveEditedPatient: (editedPatient: User) => dispatch(updatePatient(editedPatient)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientsPageSmart);

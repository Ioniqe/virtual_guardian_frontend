import { CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deletePatients, getPatientsList, updatePatient } from "../../../../actions/PatientAction";
import { User } from "../../../../model/models";
import PatientListDumb from "./PatientListDumb";

interface PatientListProps {
  loggedUser: User,

  getAllPatientsList: (doctorId: string) => void,
  deleteSelectedPatients: (patientsToBeDeleted: string[]) => void,
  saveEditedPatient: (editedPatient: User) => void,
  patientReducer: {
    loading: boolean,
    patientsSuccess: User[],
    error: string,
    deleteSuccessful: boolean,
    updateSuccessful: boolean,
  },
}

function PatientListSmart({ loggedUser, patientReducer, getAllPatientsList, deleteSelectedPatients, saveEditedPatient }: PatientListProps) {
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
    if (patientReducer.updateSuccessful) {
      getAllPatientsList(loggedUser.id);
      setMessage('Updated successfully!');
      setOpenSuccess(true);
      setOpenError(false)
    }
  }, [patientReducer.updateSuccessful, getAllPatientsList, loggedUser.id]);

  return (
    <>
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success"> {message} </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"> {message} </Alert>
      </Snackbar>

      <PatientListDumb
        patientList={patientList}
        deleteSelected={deleteSelectedPatients}
        saveEditedPatient={saveEditedPatient}
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
    getAllPatientsList: (caregiverId: string) => dispatch(getPatientsList(caregiverId)),
    deleteSelectedPatients: (patientsToBeDeleted: string[]) => dispatch(deletePatients(patientsToBeDeleted)),
    saveEditedPatient: (editedPatient: User) => dispatch(updatePatient(editedPatient)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientListSmart);
